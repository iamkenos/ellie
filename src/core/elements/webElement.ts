import logger from "../../logger";
import ElementConditions from "./evaluation/elementConditions";
import { IImageCompareOptions } from "../interfaces";
import { getAbsoluteXPathScript, getIndexedSelector } from "../utils";

export default class WebElement {
  public selector: string;

  public constructor(selector: string) {
    this.selector = selector;
  }

  public existing$(): WebdriverIO.Element {
    return new ElementConditions(this.selector, logger.getCaller())
      .existing()
      .runStrict()
      .getElement();
  }

  public raw$(): WebdriverIO.Element {
    return $(this.selector);
  }

  public raw$$(): WebdriverIO.Element[] {
    return $$(this.selector);
  }

  public child$(xpath: string): WebElement {
    const parent = this.existing$();
    const parentSelector = browser.execute(getAbsoluteXPathScript(), parent);
    const childSelector = parentSelector + xpath;
    return new WebElement(childSelector);
  }

  public child$$(xpath: string): WebElement[] {
    const parentSelector = this.child$(xpath).selector;
    return $$(parentSelector).map((elem, index) => new WebElement(getIndexedSelector(elem.selector, index)));
  }

  public addValue(value: string | number | boolean | object | any[]): void {
    logger.info(`Selector: ${this.selector} | Value: ${value}`);
    this.existing$().addValue(value);
  }

  public clearValue(): void {
    logger.info(`Selector: ${this.selector}`);
    this.existing$().clearValue();
  }

  public click(): void {
    logger.info(`Selector: ${this.selector}`);
    this.existing$().click();
  }

  public doubleClick(): void {
    logger.info(`Selector: ${this.selector}`);
    this.existing$().doubleClick();
  }

  public moveAndClick(): void {
    logger.info(`Selector: ${this.selector}`);
    const elem = this.existing$();
    elem.moveTo();
    elem.click();
  }

  public moveAndDoubleClick(): void {
    logger.info(`Selector: ${this.selector}`);
    const elem = this.existing$();
    elem.moveTo();
    elem.doubleClick();
  }

  public dragAndDrop(target: string, duration?: number): void {
    logger.info(`Selector: ${this.selector}`);
    const dest = new ElementConditions(target)
      .existing()
      .runStrict()
      .getElement();

    this.existing$().dragAndDrop(dest, duration);
  }

  public getAttribute(attrName: string): string {
    logger.info(`Selector: ${this.selector} | Attribute: ${attrName}`);
    return this.existing$().getAttribute(attrName);
  }

  public isAttributeContaining(attrName: string, attrValue: string, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Attribute: ${attrName} | Value: ${attrValue} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeContains(attrName, attrValue, reverse)
      .run()
      .isSuccess();
  }

  public isAttributeEquals(attrName: string, attrValue: string, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Attribute: ${attrName} | Value: ${attrValue} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeEquals(attrName, attrValue, reverse)
      .run()
      .isSuccess();
  }

  public isAttributeExisting(attrName: string, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Attribute: ${attrName} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName, reverse)
      .run()
      .isSuccess();
  }

  public checkAttributeContains(attrName: string, attrValue: string, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${attrName} | Value: ${attrValue} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeContains(attrName, attrValue, reverse)
      .runStrict();
  }

  public checkAttributeEquals(attrName: string, attrValue: string, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${attrName} | Value: ${attrValue} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeEquals(attrName, attrValue, reverse)
      .runStrict();
  }

  public checkAttributeExists(attrName: string, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${attrName} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName, reverse)
      .runStrict();
  }

  public isAxisLocationEquals(axis: WebdriverIO.LocationParam, expected: number, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Axis: ${axis} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .axisLocationEquals(axis, expected, reverse)
      .run()
      .isSuccess();
  }

  public checkAxisLocationEquals(axis: WebdriverIO.LocationParam, expected: number, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Axis: ${axis} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .axisLocationEquals(axis, expected, reverse)
      .runStrict();
  }

  public getCSSProperty(cssProp: string): WebdriverIO.CSSProperty {
    logger.info(`Selector: ${this.selector} | Property: ${cssProp}`);
    return this.existing$().getCSSProperty(cssProp);
  }

  public isCSSPropertyExisting(cssProp: string, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Property: ${cssProp} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .cssPropertyExists(cssProp, reverse)
      .run()
      .isSuccess();
  }

  public checkCSSPropertyExists(cssProp: string, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Property: ${cssProp} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .cssPropertyExists(cssProp, reverse)
      .runStrict();
  }

  public getHTML(includeSelectorTag?: boolean): string {
    logger.info(`Selector: ${this.selector} | Include Tag?: ${!!~~includeSelectorTag}`);
    return this.existing$().getHTML(includeSelectorTag);
  }

  public getLocation(): WebdriverIO.LocationReturn {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getLocation();
  }

  public getProperty(property: string): object | string | boolean | number {
    logger.info(`Selector: ${this.selector} | Property: ${property}`);
    return this.existing$().getProperty(property);
  }

  public getSize(): WebdriverIO.SizeReturn {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getSize();
  }

  public getTagName(): string {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getTagName();
  }

  public getText(): string {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getText();
  }

  public isTextContaining(expected: string, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .textContains(expected, reverse)
      .run()
      .isSuccess();
  }

  public isTextEmpty(reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .textEmpty(reverse)
      .run()
      .isSuccess();
  }

  public isTextEquals(expected: string, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .textEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkTextContains(expected: string, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .textContains(expected, reverse)
      .runStrict();
  }

  public checkTextEmpty(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .textEmpty(reverse)
      .runStrict();
  }

  public checkTextEquals(expected: string, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .textEquals(expected, reverse)
      .runStrict();
  }

  public getValue(): string {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getValue();
  }

  public isValueContaining(expected: string, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .valueContains(expected, reverse)
      .run()
      .isSuccess();
  }

  public isValueEmpty(reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .valueEmpty(reverse)
      .run()
      .isSuccess();
  }

  public isValueEquals(expected: string, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .valueEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkValueContains(expected: string, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .valueContains(expected, reverse)
      .runStrict();
  }

  public checkValueEmpty(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .valueEmpty(reverse)
      .runStrict();
  }

  public checkValueEquals(expected: string, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .valueEquals(expected, reverse)
      .runStrict();
  }

  public getCount(): number {
    logger.info(`Selector: ${this.selector}`);
    return $$(this.selector).length;
  }

  public isUnique(reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .countEquals(1, reverse)
      .run()
      .isSuccess();
  }

  public checkUnique(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .countEquals(1, reverse)
      .runStrict();
  }

  public isCountEquals(expected: number, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.selector)
      .countEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public isCountGreaterThan(expected: number, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.selector)
      .countGreaterThan(expected, reverse)
      .run()
      .isSuccess();
  }

  public isCountLessThan(expected: number, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.selector)
      .countLessThan(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkCountEquals(expected: number, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.selector)
      .countEquals(expected, reverse)
      .runStrict();
  }

  public checkCountGreaterThan(expected: number, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.selector)
      .countGreaterThan(expected, reverse)
      .runStrict();
  }

  public checkCountLessThan(expected: number, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.selector)
      .countLessThan(expected, reverse)
      .runStrict();
  }

  public isDisplayed(reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .displayed(reverse)
      .run()
      .isSuccess();
  }

  public checkDisplayed(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.selector)
      .existing()
      .displayed(reverse)
      .runStrict();
  }

  public isDisplayedInViewport(reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .displayedInVewport(reverse)
      .run()
      .isSuccess();
  }

  public checkDisplayedInViewport(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .displayedInVewport(reverse)
      .runStrict();
  }

  public isEnabled(reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .enabled(reverse)
      .run()
      .isSuccess();
  }

  public checkEnabled(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .enabled(reverse)
      .runStrict();
  }

  public isExisting(reverse?: boolean, timeout?: number): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.selector)
      .existing(reverse)
      .run(timeout || 0)
      .isSuccess();
  }

  public checkExisting(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.selector)
      .existing(reverse)
      .runStrict();
  }

  public isFocused(reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .focused(reverse)
      .run()
      .isSuccess();
  }

  public checkFocused(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .focused(reverse)
      .runStrict();
  }

  public isImageMatchRef(filename: string, reverse?: boolean, options?: IImageCompareOptions): boolean {
    logger.info(`Selector: ${this.selector} | File: ${filename} | Options: ${options} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .imageMatch(filename, reverse, options)
      .run()
      .isSuccess();
  }

  public checkImageMatchRef(filename: string, reverse?: boolean, options?: IImageCompareOptions): void {
    logger.info(`Selector: ${this.selector} | File: ${filename} | Options: ${options} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .imageMatch(filename, reverse, options)
      .runStrict();
  }

  public isSelected(reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .selected(reverse)
      .run()
      .isSuccess();
  }

  public checkSelected(reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .selected(reverse)
      .runStrict();
  }

  public isSizeEquals(width: number, height: number, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Width: ${width} | Height: ${height} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .sizeEquals(width, height, reverse)
      .run()
      .isSuccess();
  }

  public isSizeHeightEquals(expected: number, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .sizeHeightEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public isSizeWidthEquals(expected: number, reverse?: boolean): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    return new ElementConditions(this.existing$().selector)
      .sizeWidthEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkSizeEquals(width: number, height: number, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Width: ${width} | Height: ${height} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .sizeEquals(width, height, reverse)
      .runStrict();
  }

  public checkSizeHeightEquals(expected: number, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .sizeHeightEquals(expected, reverse)
      .runStrict();
  }

  public checkSizeWidthEquals(expected: number, reverse?: boolean): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new ElementConditions(this.existing$().selector)
      .sizeWidthEquals(expected, reverse)
      .runStrict();
  }

  public moveTo(xoffset?: number, yoffset?: number): void {
    logger.info(`Selector: ${this.selector} | X: ${xoffset} | Y: ${yoffset}`);
    this.existing$().moveTo(xoffset, yoffset);
  }

  public scrollIntoView(scrollIntoViewOptions?: boolean | object): void {
    logger.info(`Selector: ${this.selector} | Options: ${scrollIntoViewOptions}`);
    this.existing$().scrollIntoView(scrollIntoViewOptions);
  }

  public selectByAttribute(attribute: string, value: string): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${attribute} | Value: ${value}`);
    this.existing$().selectByAttribute(attribute, value);
  }

  public selectByIndex(index: number): void {
    logger.info(`Selector: ${this.selector} | Index: ${index}`);
    this.existing$().selectByIndex(index);
  }

  public selectByVisibleText(text: string): void {
    logger.info(`Selector: ${this.selector} | Text: ${text}`);
    this.existing$().selectByVisibleText(text);
  }

  public setValue(value: string | number | boolean | object | any[]): void {
    logger.info(`Selector: ${this.selector} | Value: ${value}`);
    this.existing$().setValue(value);
  }

  public shadow$$(selector: string | Function): WebdriverIO.Element[] {
    return this.existing$().shadow$$(selector);
  }

  public shadow$(selector: string | Function): WebdriverIO.Element {
    return this.existing$().shadow$(selector);
  }

  public touchAction(action: WebdriverIO.TouchActions): void {
    this.existing$().setValue(action);
  }
}
