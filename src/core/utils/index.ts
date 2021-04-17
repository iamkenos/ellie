import { Capabilities } from "@wdio/types";

import * as fs from "fs-extra";
import * as path from "path";
import { DataTable } from "@cucumber/cucumber";
import jsonpath, { PathComponent } from "jsonpath";
import { merge } from "lodash";
import { DateTime } from "luxon";
import { diff } from "deep-diff";
import { sync } from "syncrequest";
import { URL } from "url";
import { ImageCompareResult } from "webdriver-image-comparison";
import allure from "@wdio/allure-reporter";

import logger from "../../logger";
import { ImageCompareContext, MimeType } from "../enums";
import { IConfig } from "../../cli/interfaces";
import {
  IComponentMeta,
  IHttpRequest,
  IHttpResponse,
  IImageCompare,
  IImageSave,
  IJSONDiffOptions,
  IPageMeta,
  UnionToIntersection
} from "../interfaces";
import { inspect, readFileSync } from "../../cli/utils";
import { DEFAULT } from "../../cli/config";

export const RETRY = { wrapperOptions: { retry: (browser.config as any).stepRetries } };

const GHERKIN_TOKENS = {
  /**
   * ```
   * This group gives you a date string relative to the current date
   * Syntax: $DATE{format(optional)¦offset¦offset on};(optional)any
   * Samples:
   *  Given: current day is Jan 02, 2021
   *  - $DATE{dd¦2¦days};          ------> 04
   *  - $DATE{dd-M-yyyy¦-2¦years}; ------> 02-1-2019
   *  - $DATE{dd-M-yyyy}; foobar   ------> 02-1-2021 foobar
   * ```
   **/
  date: /(?<date>\$DATE\{(?<date_format>[^¦]+)(?<date_offset>¦(?<date_offset_val>-?\d+)¦(?<date_offset_on>.+))?};(?<date_misc>.+)?)/
};

export function mergeMeta
<T extends IPageMeta | IComponentMeta, U, V, W, X, Y, Z>(m1: T, m2: U, m3?: V, m4?: W, m5?: X, m6?: Y, m7?: Z):
T & U & V & W & X {
  return merge({}, m1, m2, m3, m4, m5, m6, m7);
}

export function getDataTableRows(table: DataTable, column?: number): string[];

export function getDataTableRows(table: DataTable, column: "all"): string[][];

export function getDataTableRows(table: DataTable, column?: number | "all") {
  column = column || 1;
  if (isNaN(column as any)) {
    return table.rows() as string[][];
  } else {
    const rows = column > Object.keys(table.raw()[0]).length
      ? [] // return empty if column number asked is non-existing
      : table.raw().map(i => i[(column as number) - 1]).slice(1) as string[]; // slice removes headers
    return rows;
  }
}

export function getMetaObject<T extends IPageMeta | IComponentMeta>(meta: T, locale?: string):
UnionToIntersection<T[keyof T]> & T[keyof T] {
  const loc = locale || (browser.config as any).locale;
  const object = merge({}, meta[DEFAULT.locale], meta[loc]);
  if (!meta[loc]) logger.info(`Locale '${loc}' not found in page'`);

  return object as UnionToIntersection<T[keyof T]> & T[keyof T];
}

export function getMetaProperty(metaKey: string, ...propTree: string[]): any {
  const metaArr: string[] = (browser.config as any).meta;
  const metaArrStr = `\n${metaArr.map((i: string) => `    ${i}`).join(",\n")}`;
  const meta = metaArr.find((pg: string) => path.basename(pg).split(".")[0].toLowerCase() === metaKey.toLowerCase());
  if (!meta) { throw new Error(`\n  Unable to resolve "${metaKey}" from any of the available meta files: ${metaArrStr}`); }

  const metaModule = require(meta).default;
  const locale = (browser.config as any).locale;
  const propFromLocale = (locale: string): any => {
    const localeTree = [locale, ...propTree];
    const localeTreeStr = localeTree.join(".");
    logger.debug("Searching for '%s' in meta '%s'...", localeTreeStr, meta);

    const prop = localeTree.reduce((i, j): object => (i && i[j] ? i[j] : null), metaModule);
    if (!prop) { throw new Error(`\n  Unable to find '${localeTreeStr}' in meta '${meta}'\n  Meta Files: ${metaArrStr}`); }

    return prop;
  };

  try {
    return propFromLocale(locale);
  } catch (e) {
    if (locale !== DEFAULT.locale) {
      return propFromLocale(DEFAULT.locale);
    } else {
      throw e;
    }
  }
}

export function getMetaUrl(meta: string): string {
  const currMeta = meta || (browser.config as any).currentMeta;
  return getMetaProperty(currMeta, "url");
}

export function getMetaTitle(meta: string): string {
  const currMeta = meta || (browser.config as any).currentMeta;
  return getMetaProperty(currMeta, "title");
}

export function getMetaElement(meta: string, key: string): string {
  const currMeta = meta || (browser.config as any).currentMeta;
  const currElem = key || (browser.config as any).currentMetaChild;
  const stitch = (m: string, l: string, e: string) => {
    const delimiter = /-->>/;
    const matches = e.split(delimiter).filter(Boolean); // additional `filter` to remove empty values
    if (matches && matches.length > 1) {
      return matches.map(e => getMetaProperty(m, l, e)).join("");
    } else {
      return getMetaProperty(m, l, e);
    }
  };

  return currMeta ? stitch(currMeta, "locators", currElem) : currElem;
}

export function getJSONDiff(type: keyof IConfig["comparable"], filename: string, toCompare: any, options?: IJSONDiffOptions): string {
  let result = "";
  const comparable = (browser.config as any).comparable[type];
  const actFile = path.join(comparable.actualDir, filename) + ".json";
  const expFile = path.join(comparable.baselineDir, filename) + ".json";
  const difFile = path.join(comparable.diffDir, filename) + ".json";

  const getMatchingJSONPaths = (expr: string[], object: object) => {
    // Get all the matching stringified json paths from an object given a list of json paths
    // see https://www.npmjs.com/package/jsonpath
    return expr
    // 2D array of element paths from comparable
    // that matches the path expressions provided
      .map(i => jsonpath.paths(object, i))
    // Flatten the 2D array
      .reduce((j, k) => j.concat(k))
    // Stringify the each json path array
    // e.g. ['$', 'store', 'book', 0, 'author'] to "$.store.book[0].author"
      .map((h: PathComponent[]) => jsonpath.stringify(h));
  };

  const getDiff = (options?: IJSONDiffOptions) => {
    const expected = JSON.parse(readFileSync(expFile));
    const actual = JSON.parse(readFileSync(actFile));

    if (!options) return diff(expected, actual);

    const { regex } = options;
    if (regex) {
      const paths = getMatchingJSONPaths(regex.paths, actual);
      return diff(expected, actual, (filterPath, key) => {
        const filter = jsonpath.stringify(["$"].concat(filterPath.concat(key)));
        const index = paths.indexOf(filter);
        let result = false;
        // if filter is inside the paths array, get the expression on the same index
        // and check that it matches the actual value; else let diff do it's thing
        if (index >= 0) {
          const pathValue = JSON.stringify(jsonpath.query(actual, filter)[0]);
          const matchExpr = regex.expressions[index];
          const matches = pathValue.match(matchExpr) || [];
          result = matches.length > 0;
        }
        return result;
      });
    }

    if (options.prefilter) return diff(expected, actual, options.prefilter);
  };

  fs.outputFileSync(actFile, JSON.stringify(toCompare, null, 2));

  if (!comparable.skipCompare) {
    if (!fs.existsSync(expFile)) { return `Baseline JSON file "${expFile}" not found`; }

    allure.addAttachment(`Actual: ${actFile}`, readFileSync(actFile), MimeType.TEXT_PLAIN);
    allure.addAttachment(`Expected: ${expFile}`, readFileSync(expFile), MimeType.TEXT_PLAIN);

    const differences = getDiff(options);
    if (differences) {
      result = JSON.stringify(differences, null, 2);
      fs.outputFileSync(difFile, diff);
      allure.addAttachment(`Differences: ${difFile}`, readFileSync(difFile), MimeType.TEXT_PLAIN);
    }
  } else {
    logger.warn("Skipping comparison for ", actFile);
    allure.addAttachment(`Actual: ${actFile}`, readFileSync(actFile), MimeType.TEXT_PLAIN);
  }
  return result;
}

export function getImageFile(context: ImageCompareContext, filename: string, elem?: WebdriverIO.Element): IImageSave {
  const undef = "undefined";
  const caps = browser.capabilities as Capabilities.DesiredCapabilities;
  const comparable = (browser.config as IConfig).comparable.imageCompare;
  const platform = comparable.overridePlatform
    ? (browser.config as IConfig).locale
    : (caps.platformName || caps.platform || undef).slice(0, 3).toLowerCase();
  const brName = (caps.browserName || undef).toLowerCase();
  const brVersion = caps.version || caps.browserVersion;
  const dvName = (caps.deviceName || undef).toLowerCase();

  // Assumes the browser is used in a device if browser version is undefined
  const subDirectory = comparable.overrideVersion
    ? brName
    : `${brName}_${brVersion ? `v${parseInt(brVersion, 10)}` : `${dvName}`}`;
  const file = path.join(platform, subDirectory, filename);

  switch (context) {
    case ImageCompareContext.VIEWPORT: {
      return { parsedName: file, ...browser.saveScreen(file) };
    }
    case ImageCompareContext.ELEMENT: {
      if (!elem) throw new Error("Element cannot be undefined");
      return { parsedName: file, ...browser.saveElement(elem, file) };
    }
    case ImageCompareContext.PAGE: {
      return { parsedName: file, ...browser.saveFullPageScreen(file) };
    }
  }
}

export function getImageDiff(filename: string, compare: IImageCompare): string {
  let result: number | ImageCompareResult | any;

  const config = browser.config as IConfig;
  const saved = getImageFile(compare.context, filename, compare.element);
  const comparable = config.comparable.imageCompare;
  const actFile = path.join(comparable.actualDir!, saved.fileName);
  const expFile = path.join(comparable.baselineDir!, saved.fileName);
  const difFile = path.join(comparable.diffDir!, saved.fileName);
  const attachImage = (title: string, file: string): void =>
    allure.addAttachment(title, Buffer.from(fs.readFileSync(file) as any, "base64"), "image/png");

  // Always ignore anti-aliasing and return all compare data
  compare.options = {
    ...config.comparable.imageCompare.options,
    ...compare.options,
    ...{
      ignoreAntialiasing: true,
      returnAllCompareData: true
    }
  };

  if (!comparable.skipCompare) {
    // if (!fs.existsSync(expFile)) { return `Baseline image file "${expFile}" not found`; }

    switch (compare.context) {
      case ImageCompareContext.VIEWPORT: {
        result = browser.checkScreen(saved.parsedName, compare.options);
        break;
      }
      case ImageCompareContext.ELEMENT: {
        if (!compare.element) throw new Error("Element cannot be undefined");
        result = browser.checkElement(compare.element, saved.parsedName, compare.options);
        break;
      }
      case ImageCompareContext.PAGE: {
        result = browser.checkFullPageScreen(saved.parsedName, compare.options);
        break;
      }
    }

    attachImage(`Actual: ${actFile}`, actFile);
    attachImage(`Expected: ${expFile}`, expFile);

    const { misMatchPercentage } = result;
    const saveAboveTolerance = compare.options.saveAboveTolerance || 0;
    if (misMatchPercentage && misMatchPercentage > saveAboveTolerance) {
      attachImage(`Differences: ${difFile}`, difFile);
      return `Image mismatch by ${result.misMatchPercentage}%`;
    }

    return "";
  } else {
    logger.warn("Skipping comparison for ", actFile);
    browser.pause(2000);
    getImageFile(compare.context, filename, compare.element);
    attachImage(`Actual: ${actFile}`, actFile);
    return "";
  }
}

export function isJSON(str: string): boolean {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    return result instanceof Object || result instanceof Array;
  } catch (e) {
    return false;
  }
}

export function sendSyncRequest(request: IHttpRequest): IHttpResponse {
  request.options.url = new URL((request.options.url as string), browser.config.baseUrl).href;

  const rs = sync({ ...request.options });
  if (rs.error) {
    throw new Error(`Error encountered when sending the request: ${inspect(rs.error)}`);
  }

  allure.addAttachment("Request: ", JSON.stringify(rs.response.request, null, 2), MimeType.TEXT_PLAIN);
  return rs;
}

/**
 * Intended to churn out dynamic data, like dates.
 * @param token see GHERKIN_TOKENS
 * @returns the transformed data if it matches any tokens or the same string if it doesnt
 */
export function transformToken(token: string) {
  const rex = new RegExp(GHERKIN_TOKENS.date.source);
  const matches = rex.exec(token);
  if (matches && matches.groups) {
    const { groups } = matches;
    if (groups.date) {
      const offset: any = {};
      offset[groups.date_offset_on || "days"] = groups.date_offset_val || 0;
      return `${DateTime.local().plus(offset).toFormat(groups.date_format)}${groups.date_misc || ""}`;
    }
  }
  return token;
}
