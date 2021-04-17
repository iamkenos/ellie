import logger from "../../logger";
import WebElement from "./webElement";
import ElementConditions from "./evaluation/elementConditions";
import SelectorBuilder from "./selectorBuilder";

export default class WebElements {
  public selector: string;

  public constructor(selector: string) {
    this.selector = selector;
  }

  public toArray(): WebElement[] {
    logger.info(`Selector: ${this.selector}`);
    return $$(this.selector).map((elem, index) =>
      new WebElement(new SelectorBuilder(elem.selector as string).build(index + 1)));
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

  public getElementContainingAttribute(key: string, value: string): WebElement {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Value: ${value}`);
    const element = this.toArray().find(elem => elem.getAttribute(key).includes(value));

    if (!element) {
      throw new Error(`WebElement containing the attribute "${key}" as "${value}" not found on ${this.selector}`);
    }
    return element;
  }

  public getElementContainingText(text: string): WebElement {
    logger.info(`Selector: ${this.selector} | Text: ${text}`);
    const element = this.toArray().find(elem => elem.getText().includes(text));

    if (!element) {
      throw new Error(`WebElement containing the text "${text}" not found on ${this.selector}`);
    }
    return element;
  }

  public getTextArray(): string[] {
    return this.toArray().map(elem => elem.getText());
  }

  public isTextEqualsArray(expected: string[], preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(new WebElement(this.selector).existing$().selector)
      .textEqualsArray(expected, preferred)
      .run()
      .isSuccess();
  }

  public isTextContainingArray(expected: string[], preferred: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(new WebElement(this.selector).existing$().selector)
      .textContainsArray(expected, preferred)
      .run()
      .isSuccess();
  }

  public checkTextEqualsArray(expected: string[], preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(new WebElement(this.selector).existing$().selector)
      .textEqualsArray(expected, preferred)
      .runStrict();
  }

  public checkTextContainsArray(expected: string[], preferred: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(new WebElement(this.selector).existing$().selector)
      .textContainsArray(expected, preferred)
      .runStrict();
  }
}
