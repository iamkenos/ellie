import * as fs from "fs-extra";
import * as path from "path";
import { diff, PreFilterFunction } from "deep-diff";
import allure from "@wdio/allure-reporter";

import * as logger from "../../logger";
import { readFileSync } from "../../cli/utils";

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

export function compareJSON(type: string, filename: string, comparable: any, prefilter?: PreFilterFunction): boolean {
  const comparableOptions = (browser as any).config.comparableOptions[type];
  const actFile = path.join(comparableOptions.actualDir, filename) + ".json";
  const expFile = path.join(comparableOptions.baselineDir, filename) + ".json";
  const difFile = path.join(comparableOptions.diffDir, filename) + ".json";

  fs.outputFileSync(actFile, JSON.stringify(comparable, null, 2));
  allure.addAttachment("Actual:", readFileSync(actFile));

  if (!comparableOptions.skipCompare) {
    if (!fs.existsSync(expFile)) { throw new Error(`Baseline JSON file "${expFile}" not found`); }
    allure.addAttachment("Expected:", readFileSync(expFile));

    const differences = diff(JSON.parse(readFileSync(expFile)), comparable, prefilter);
    if (differences) {
      fs.outputFileSync(difFile, JSON.stringify(differences, null, 2));
      allure.addAttachment("Differences:", readFileSync(difFile));
      return false;
    }
  }
  return true;
}
