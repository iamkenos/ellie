import * as fs from "fs-extra";
import * as path from "path";
import { diff, PreFilterFunction } from "deep-diff";
import allure from "@wdio/allure-reporter";

import * as logger from "../../logger";
import { ImageCompareContext } from "../enums";
import { IImageCompare, IImageCompareResult, IImageSave } from "../interfaces";
import { inspect, readFileSync } from "../../cli/utils";

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
  const lang = locale || (browser as any).config.locale;
  const object = meta[lang];

  if (!object) {
    throw new Error(`
  Locale '${lang}' not found in page'
  Page: ${inspect(meta)}`);
  }
  return object;
}

export function getPageProperty(page: string, ...propTree: string[]): string {
  const pagemeta = (global as any).pagemeta;
  const localeTree = [(browser as any).config.locale, ...propTree];
  const nestedProp = [page.charAt(0).toLowerCase() + page.slice(1), ...localeTree];
  const value = nestedProp.reduce((i, j): object => (i && i[j] ? i[j] : null), pagemeta);
  const propStr = localeTree.join(".");

  logger.trace("Searching for '%s' in page '%s'...", propStr, page);

  if (!value) {
    throw new Error(`
  Property '${propStr}' not found in page '${page}'
  Pages: \n${(browser as any).config.pages.map((i: string) => `    ${i}`).join(",\n")}`);
  }
  return value;
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

export function getJSONDiff(type: string, filename: string, comparable: any, prefilter?: PreFilterFunction): string {
  const comparableOptions = (browser as any).config.comparableOptions[type];
  const actFile = path.join(comparableOptions.actualDir, filename) + ".json";
  const expFile = path.join(comparableOptions.baselineDir, filename) + ".json";
  const difFile = path.join(comparableOptions.diffDir, filename) + ".json";

  fs.outputFileSync(actFile, JSON.stringify(comparable, null, 2));
  allure.addAttachment("Actual:", readFileSync(actFile));

  if (!comparableOptions.skipCompare) {
    if (!fs.existsSync(expFile)) { return `Baseline JSON file "${expFile}" not found`; }
    allure.addAttachment("Expected:", readFileSync(expFile));

    const differences = diff(JSON.parse(readFileSync(expFile)), JSON.parse(readFileSync(actFile)), prefilter);
    if (differences) {
      const diff = JSON.stringify(differences, null, 2);
      fs.outputFileSync(difFile, diff);
      allure.addAttachment("Differences:", readFileSync(difFile));
      return diff;
    }
  }
  return undefined;
}

export function getImageFile(context: ImageCompareContext, filename: string, elem?: WebdriverIO.Element): IImageSave {
  switch (context) {
    case ImageCompareContext.VIEWPORT: {
      return (browser as any).saveScreen(filename);
    }
    case ImageCompareContext.ELEMENT: {
      return (browser as any).saveElement(elem, filename);
    }
    case ImageCompareContext.PAGE: {
      return (browser as any).saveFullPageScreen(filename);
    }
  }
}

export function getImageDiff(filename: string, compare: IImageCompare): string {
  let result: IImageCompareResult = {};

  const imageName = (filename: string): string =>
    `${browser.capabilities.browserName}_v${parseInt(browser.capabilities.version, 10)}/${filename}`;

  const attachImage = (title: string, file: string): void =>
    allure.addAttachment(title, Buffer.from(fs.readFileSync(file) as any, "base64"), "image/png");

  const saved = getImageFile(compare.context, imageName(filename), compare.element);

  const comparableOptions = (browser as any).config.comparableOptions.visualRegression;
  const actFile = path.join(comparableOptions.actualDir, saved.fileName);
  const expFile = path.join(comparableOptions.baselineDir, saved.fileName);
  const difFile = path.join(comparableOptions.diffDir, saved.fileName);

  compare.options = {
    ...compare.options,
    ...{
      ignoreAntialiasing: true,
      returnAllCompareData: true
    }
  };

  attachImage("Actual:", actFile);

  if (!comparableOptions.skipCompare) {
    if (!fs.existsSync(expFile)) { return `Baseline image "${expFile}" not found`; }
    attachImage("Expected:", expFile);

    switch (compare.context) {
      case ImageCompareContext.VIEWPORT: {
        result = (browser as any).checkScreen(imageName(filename), compare.options);
        break;
      }
      case ImageCompareContext.ELEMENT: {
        result = (browser as any).checkElement(compare.element, imageName(filename), compare.options);
        break;
      }
      case ImageCompareContext.PAGE: {
        result = (browser as any).checkFullPageScreen(imageName(filename), compare.options);
        break;
      }
    }

    if (result.misMatchPercentage) {
      attachImage("Differences:", difFile);
      return `Image mismatch by ${result.misMatchPercentage}%`;
    }
  }
  return undefined;
}
