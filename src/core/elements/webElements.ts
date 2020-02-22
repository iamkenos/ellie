import logger from "../../logger";
import WebElement from "./webElement";
import { getIndexedSelector } from "../utils";

export default class WebElements {
  public selector: string;

  public constructor(selector: string) {
    this.selector = selector;
  }

  public toArray(): WebElement[] {
    logger.info(`Selector: ${this.selector}`);
    return $$(this.selector).map((elem, index) =>
      new WebElement(getIndexedSelector(elem.selector, index)));
  }

  public getElementMatchingAttribute(key: string, value: string): WebElement {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Value: ${value}`);
    const element = this.toArray().find(elem => elem.getAttribute(key) === value);

    if (!element) {
      throw new Error(`WebElement matching the attribute "${key}" as "${value}" not found on ${this.selector}`);
    }
    return element;
  }

  public getElementMatchingText(text: string): WebElement {
    logger.info(`Selector: ${this.selector} | Text: ${text}`);
    const element = this.toArray().find(elem => elem.getText() === text);

    if (!element) {
      throw new Error(`WebElement matching the text "${text}" not found on ${this.selector}`);
    }
    return element;
  }

  public getTextArray(): string[] {
    return this.toArray().map(elem => elem.getText());
  }
}
