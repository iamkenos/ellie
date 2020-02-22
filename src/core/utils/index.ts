import * as fs from "fs-extra";
import * as path from "path";
import { merge } from "lodash";
import { diff, PreFilterFunction } from "deep-diff";
import { sync } from "syncrequest";
import { URL } from "url";
import allure from "@wdio/allure-reporter";

import logger from "../../logger";
import { ImageCompareContext } from "../enums";
import { IConfig } from "../../cli/interfaces";
import { IHttpRequest, IHttpResponse, IImageCompare, IImageCompareResult, IImageSave } from "../interfaces";
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

export function getPageObject(meta: any, locale: string): any {
  const loc = locale || (browser as any).config.locale;
  const object = merge({}, meta[DEFAULT.locale], meta[loc]);
  if (!meta[loc]) logger.warn(`Locale '${loc}' not found in page'`);

  return object;
}

export function getPageProperty(page: string, ...propTree: string[]): any {
  const pages: string[] = (browser as any).config.pages;
  const pagesStr = `\n${pages.map((i: string) => `    ${i}`).join(",\n")}`;
  const pageMeta = pages.find((pg: string) => path.basename(pg).split(".")[0].toLowerCase() === page.toLowerCase());
  if (!pageMeta) { throw new Error(`\n  Unable to resolve "${page}" from any of the available pages: ${pagesStr}`); }

  const pageObject = require(pageMeta).default;
  const pageLocale = (browser as any).config.locale;
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

export function getPageElement(key: string): string {
  const rex = new RegExp(/(([-_A-Z\d]+)=>)?(.+)/i);
  const matches = key.match(rex);
  const page = matches[2];
  const element = matches[3];

  return page ? getPageProperty(page, "locators", element) : key;
}

export function getJSONDiff(type: keyof IConfig["comparable"], filename: string, toCompare: any, prefilter?: PreFilterFunction): string {
  const comparable = (browser as any).config.comparable[type];
  const actFile = path.join(comparable.actualDir, filename) + ".json";
  const expFile = path.join(comparable.baselineDir, filename) + ".json";
  const difFile = path.join(comparable.diffDir, filename) + ".json";

  fs.outputFileSync(actFile, JSON.stringify(toCompare, null, 2));

  if (!~~comparable.skipCompare) {
    if (!fs.existsSync(expFile)) { return `Baseline JSON file "${expFile}" not found`; }

    allure.addAttachment("Actual:", readFileSync(actFile));
    allure.addAttachment("Expected:", readFileSync(expFile));

    const differences = diff(JSON.parse(readFileSync(expFile)), JSON.parse(readFileSync(actFile)), prefilter);
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
      return { parsedName: file, ...(browser as any).saveScreen(file) };
    }
    case ImageCompareContext.ELEMENT: {
      return { parsedName: file, ...(browser as any).saveElement(elem, file) };
    }
    case ImageCompareContext.PAGE: {
      return { parsedName: file, ...(browser as any).saveFullPageScreen(file) };
    }
  }
}

export function getImageDiff(filename: string, compare: IImageCompare): string {
  let result: IImageCompareResult = {};

  const saved = getImageFile(compare.context, filename, compare.element);
  const comparable = (browser as any).config.comparable.imageCompare;
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
        result = (browser as any).checkScreen(saved.parsedName, compare.options);
        break;
      }
      case ImageCompareContext.ELEMENT: {
        result = (browser as any).checkElement(compare.element, saved.parsedName, compare.options);
        break;
      }
      case ImageCompareContext.PAGE: {
        result = (browser as any).checkFullPageScreen(saved.parsedName, compare.options);
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
  request.options.url = new URL((request.options.url as string), (browser as any).config.baseUrl).href;

  const rs = sync({ ...request.options });
  if (rs.error) {
    throw new Error(`Error encountered when sending the request: ${inspect(rs.error)}`);
  }

  allure.addAttachment("Request: ", JSON.stringify(rs.response.request, null, 2));
  return rs;
}
