import ElementConditions from "./evaluation/elementConditions";
import WebElement from "./webElement";
import { getIndexedSelector } from "../utils";

export default class WebElements {
  public selector: string;

  public constructor(selector: string) {
    this.selector = selector;
  }

  public toArray(): WebElement[] {
    return $$(this.selector).map((elem, index) =>
      new WebElement(getIndexedSelector(elem.selector, index)));
  }

  public getElementMatchingAttribute(attribute: string, value: string): WebElement {
    const element = this.toArray().find(e => e.getAttribute(attribute) === value);

    if (!element) {
      throw new Error(`WebElement matching the attribute "${attribute}" as "${value}" not found on ${this.selector}`);
    }
    return element;
  }

  public getElementMatchingText(text: string): WebElement {
    const element = this.toArray().find(e => e.getText() === text);

    if (!element) {
      throw new Error(`WebElement matching the text "${text}" not found on ${this.selector}`);
    }
    return element;
  }

  public getTextArray(): string[] {
    return this.toArray().map(e => e.getText());
  }

  public checkTextEqualsArray(expected: string[], reverse?: boolean): void {
    new ElementConditions(new WebElement(this.selector).existing$().selector)
      .textEqualsArray(expected, reverse)
      .runStrict()
      .getElement();
  }

  public checkTextContainsArray(expected: string[], reverse?: boolean): void {
    new ElementConditions(new WebElement(this.selector).existing$().selector)
      .textContainsArray(expected, reverse)
      .runStrict()
      .getElement();
  }
}
