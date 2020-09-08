import * as fs from "fs-extra";
import * as path from "path";
import * as jsonpath from "jsonpath";
import { merge } from "lodash";
import { diff } from "deep-diff";
import { sync } from "syncrequest";
import { URL } from "url";
import { ImageCompareResult } from "webdriver-image-comparison";
import allure from "@wdio/allure-reporter";

import logger from "../../logger";
import { ImageCompareContext } from "../enums";
import { IConfig } from "../../cli/interfaces";
import { IHttpRequest, IHttpResponse, IImageCompare, IImageSave, IJSONDiffOptions, IPageMeta } from "../interfaces";
import { inspect, readFileSync } from "../../cli/utils";
import { DEFAULT } from "../../cli/config";

export function getAbsoluteXPathScript(): string {
  return `function absoluteXPath(element) {
    const parent = null;
    const comps = [];
    let xpath = '';
    let comp;

    function getPos(element) {
      let position = 1;
      let curNode;

      if (element.nodeType === Node.ATTRIBUTE_NODE) {
        return null;
      }

      for (curNode = element.previousSibling; curNode; curNode = curNode.previousSibling) {
        curNode.nodeName === element.nodeName && ++position;
      }

      return position;
    }

    if (element instanceof Document) {
      return '/';
    }

    for (; element && !(element instanceof Document);
      element = element.nodeType === Node.ATTRIBUTE_NODE ? element.ownerElement : element.parentNode) {
      comp = comps[comps.length] = {};

      switch (element.nodeType) {
        case Node.TEXT_NODE: comp.name = 'text()';
          break;
        case Node.ATTRIBUTE_NODE:
          comp.name = '@' + element.nodeName;
          break;
        case Node.PROCESSING_INSTRUCTION_NODE: comp.name = 'processing-instruction()';
          break;
        case Node.COMMENT_NODE:
          comp.name = 'comment()';
          break;
        case Node.ELEMENT_NODE:comp.name = element.nodeName;
          break;
      }

      comp.position = getPos(element);
    }

    for (let i = comps.length - 1; i >= 0; i--) {
      comp = comps[i]; xpath += '/' + comp.name.toLowerCase(); if (comp.position !== null) {
        xpath += '[' + comp.position + ']';
      }
    }
    return xpath;
  } return absoluteXPath(arguments[0]);
  `;
}

export function getIndexedSelector(selector: string, index: number): string {
  return `(${selector})[${index + 1}]`;
}

export function getPageObject<T extends IPageMeta>(meta: T, locale?: string): T {
  const loc = locale || (browser.config as any).locale;
  const object = ({ default: merge({}, meta[DEFAULT.locale], meta[loc]) }) as T;
  if (!meta[loc]) logger.warn(`Locale '${loc}' not found in page'`);

  return object;
}

export function getPageProperty(page: string, ...propTree: string[]): any {
  const pages: string[] = (browser.config as any).pages;
  const pagesStr = `\n${pages.map((i: string) => `    ${i}`).join(",\n")}`;
  const pageMeta = pages.find((pg: string) => path.basename(pg).split(".")[0].toLowerCase() === page.toLowerCase());
  if (!pageMeta) { throw new Error(`\n  Unable to resolve "${page}" from any of the available pages: ${pagesStr}`); }

  const pageObject = require(pageMeta).default;
  const pageLocale = (browser.config as any).locale;
  const propFromLocale = (locale: string): any => {
    const localeTree = [locale, ...propTree];
    const localeTreeStr = localeTree.join(".");
    logger.debug("Searching for '%s' in page '%s'...", localeTreeStr, pageMeta);

    const prop = localeTree.reduce((i, j): object => (i && i[j] ? i[j] : null), pageObject);
    if (!prop) { throw new Error(`\n  Unable to find '${localeTreeStr}' in page '${pageMeta}'\n  Pages: ${pagesStr}`); }

    return prop;
  };

  try {
    return propFromLocale(pageLocale);
  } catch (e) {
    if (pageLocale !== DEFAULT.locale) {
      return propFromLocale(DEFAULT.locale);
    } else {
      throw e;
    }
  }
}

export function getPageUrl(key: string): string {
  return getPageProperty(key, "url");
}

export function getPageTitle(key: string): string {
  return getPageProperty(key, "title");
}

export function getPageElement(page: string, key: string): string {
  return page ? getPageProperty(page, "locators", key) : key;
}

export function getJSONDiff(type: keyof IConfig["comparable"], filename: string, toCompare: any, options?: IJSONDiffOptions): string {
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
      .map((h: string[]) => jsonpath.stringify(h));
  };

  const getDiff = (options?: IJSONDiffOptions) => {
    const expected = JSON.parse(readFileSync(expFile));
    const actual = JSON.parse(readFileSync(actFile));

    if (!options) return diff(expected, actual);

    if (options.regex) {
      const paths = getMatchingJSONPaths(options.regex.paths, actual);
      return diff(expected, actual, (filterPath, key) => {
        const filter = jsonpath.stringify(["$"].concat(filterPath.concat(key)));
        const index = paths.indexOf(filter);
        let result = false;
        // if filter is inside the paths array, get the expression on the same index
        // and check that it matches the actual value; else let diff do it's thing
        if (index >= 0) {
          const pathValue = JSON.stringify(jsonpath.query(actual, filter)[0]);
          const matchExpr = options.regex.expressions[index];
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

    allure.addAttachment("Actual:", readFileSync(actFile));
    allure.addAttachment("Expected:", readFileSync(expFile));

    const differences = getDiff(options);
    if (differences) {
      const diff = JSON.stringify(differences, null, 2);
      fs.outputFileSync(difFile, diff);
      allure.addAttachment("Differences:", readFileSync(difFile));
      return diff;
    }
  }

  return "";
}

export function getImageFile(context: ImageCompareContext, filename: string, elem?: WebdriverIO.Element): IImageSave {
  const platform = (browser.capabilities.platformName || browser.capabilities.platform).slice(0, 3).toLowerCase();
  const brName = browser.capabilities.browserName.toLowerCase();
  const brVersion = browser.capabilities.version || browser.capabilities.browserVersion;
  const dvName = (browser.capabilities as any).deviceModel || browser.capabilities.deviceName;

  // Assumes the browser is used in a device if browser version is undefined
  const subDirectory = `${brName}_${brVersion ? `v${parseInt(brVersion, 10)}` : `${dvName.toLowerCase()}`}`;
  const file = path.join(platform, subDirectory, filename);

  switch (context) {
    case ImageCompareContext.VIEWPORT: {
      return { parsedName: file, ...browser.saveScreen(file) };
    }
    case ImageCompareContext.ELEMENT: {
      return { parsedName: file, ...browser.saveElement(elem, file) };
    }
    case ImageCompareContext.PAGE: {
      return { parsedName: file, ...browser.saveFullPageScreen(file) };
    }
  }
}

export function getImageDiff(filename: string, compare: IImageCompare): string {
  let result: number | ImageCompareResult | any;

  const saved = getImageFile(compare.context, filename, compare.element);
  const comparable = (browser.config as any).comparable.imageCompare;
  const actFile = path.join(comparable.actualDir, saved.fileName);
  const expFile = path.join(comparable.baselineDir, saved.fileName);
  const difFile = path.join(comparable.diffDir, saved.fileName);
  const attachImage = (title: string, file: string): void =>
    allure.addAttachment(title, Buffer.from(fs.readFileSync(file) as any, "base64"), "image/png");

  // Always ignore anti-aliasing and return all compare data
  compare.options = {
    ...compare.options,
    ...{
      ignoreAntialiasing: true,
      returnAllCompareData: true
    }
  };

  if (!~~comparable.skipCompare) {
    if (!fs.existsSync(expFile)) { return `Baseline image "${expFile}" not found`; }

    switch (compare.context) {
      case ImageCompareContext.VIEWPORT: {
        result = browser.checkScreen(saved.parsedName, compare.options);
        break;
      }
      case ImageCompareContext.ELEMENT: {
        result = browser.checkElement(compare.element, saved.parsedName, compare.options);
        break;
      }
      case ImageCompareContext.PAGE: {
        result = browser.checkFullPageScreen(saved.parsedName, compare.options);
        break;
      }
    }

    attachImage("Actual:", actFile);
    attachImage("Expected:", expFile);

    if (result.misMatchPercentage) {
      attachImage("Differences:", difFile);
      return `Image mismatch by ${result.misMatchPercentage}%`;
    }
  }

  return "";
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

  allure.addAttachment("Request: ", JSON.stringify(rs.response.request, null, 2));
  return rs;
}
