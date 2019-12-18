import * as logger from "../../logger";
import { IImageCompareOptions } from "../interfaces";
import { getAbsoluteXPathScript, getIndexedSelector } from "../utils";
import ElementConditions from "./evaluation/elementConditions";

export default class WebElement {
  public selector: string;

  public constructor(selector: string) {
    this.selector = selector;
  }

  public existing$(): WebdriverIO.Element {
    return new ElementConditions(this.selector, logger.getCallerFunc())
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
    logger.info("Append value to %s: %s", this.selector, value);
    this.existing$().addValue(value);
  }

  public clearValue(): void {
    logger.info("Clear value of %s", this.selector);
    this.existing$().clearValue();
  }

  public click(): void {
    logger.info("Click %s", this.selector);
    this.existing$().click();
  }

  public doubleClick(): void {
    logger.info("Double click %s", this.selector);
    this.existing$().doubleClick();
  }

  public moveAndClick(): void {
    logger.info("Move and click %s", this.selector);
    const elem = this.existing$();
    elem.moveTo();
    elem.click();
  }

  public moveAndDoubleClick(): void {
    logger.info("Move and double click %s", this.selector);
    const elem = this.existing$();
    elem.moveTo();
    elem.doubleClick();
  }

  public dragAndDrop(target: string, duration?: number): void {
    logger.info("Drag and drop %s to %s", this.selector, target);
    const dest = new ElementConditions(target)
      .existing()
      .runStrict()
      .getElement();

    this.existing$().dragAndDrop(dest, duration);
  }

  public getAttribute(attrName: string): string {
    logger.info("Get attribute %s: %s", this.selector, attrName);
    return this.existing$().getAttribute(attrName);
  }

  public isAttributeContaining(attrName: string, attrValue: string, reverse?: boolean): boolean {
    logger.info("Is attribute containing %s: %s - %s", this.selector, attrName, attrValue);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeContains(attrName, attrValue, reverse)
      .run()
      .isSuccess();
  }

  public isAttributeEquals(attrName: string, attrValue: string, reverse?: boolean): boolean {
    logger.info("Is attribute equals %s: %s - %s", this.selector, attrName, attrValue);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeEquals(attrName, attrValue, reverse)
      .run()
      .isSuccess();
  }

  public isAttributeExisting(attrName: string, reverse?: boolean): boolean {
    logger.info("Is attribute existing %s: %s", this.selector, attrName);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName, reverse)
      .run()
      .isSuccess();
  }

  public checkAttributeContains(attrName: string, attrValue: string, reverse?: boolean): void {
    logger.info("Check attribute contains %s: %s - %s", this.selector, attrName, attrValue);
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeContains(attrName, attrValue, reverse)
      .runStrict();
  }

  public checkAttributeEquals(attrName: string, attrValue: string, reverse?: boolean): void {
    logger.info("Check attribute equals %s: %s - %s", this.selector, attrName, attrValue);
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeEquals(attrName, attrValue, reverse)
      .runStrict();
  }

  public checkAttributeExists(attrName: string, reverse?: boolean): void {
    logger.info("Is attribute exists %s: %s - %s", this.selector, attrName);
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName, reverse)
      .runStrict();
  }

  public isAxisLocationEquals(axis: WebdriverIO.LocationParam, expected: number, reverse?: boolean): boolean {
    logger.info("Is axis location equals %s: %s - %s", this.selector, axis, expected);
    return new ElementConditions(this.existing$().selector)
      .axisLocationEquals(axis, expected, reverse)
      .run()
      .isSuccess();
  }

  public checkAxisLocationEquals(axis: WebdriverIO.LocationParam, expected: number, reverse?: boolean): void {
    logger.info("Check axis location equals %s: %s - %s", this.selector, axis, expected);
    new ElementConditions(this.existing$().selector)
      .axisLocationEquals(axis, expected, reverse)
      .runStrict();
  }

  public getCSSProperty(cssProp: string): WebdriverIO.CSSProperty {
    logger.info("Get CSS property %s: %s", this.selector, cssProp);
    return this.existing$().getCSSProperty(cssProp);
  }

  public isCSSPropertyExisting(cssProp: string, reverse?: boolean): boolean {
    logger.info("Is CSS property existing %s: %s", this.selector, cssProp);
    return new ElementConditions(this.existing$().selector)
      .cssPropertyExists(cssProp, reverse)
      .run()
      .isSuccess();
  }

  public checkCSSPropertyExists(cssProp: string, reverse?: boolean): void {
    logger.info("Check CSS property existing %s: %s", this.selector, cssProp);
    new ElementConditions(this.existing$().selector)
      .cssPropertyExists(cssProp, reverse)
      .runStrict();
  }

  public getHTML(includeSelectorTag?: boolean): string {
    logger.info("Get inner html %s", this.selector);
    return this.existing$().getHTML(includeSelectorTag);
  }

  public getLocation(): WebdriverIO.LocationReturn {
    logger.info("Get location %s", this.selector);
    return this.existing$().getLocation();
  }

  public getProperty(property: string): object | string | boolean | number {
    logger.info("Get property %s: %s", this.selector, property);
    return this.existing$().getProperty(property);
  }

  public getSize(): WebdriverIO.SizeReturn {
    logger.info("Get size %s", this.selector);
    return this.existing$().getSize();
  }

  public getTagName(): string {
    logger.info("Get tag name %s", this.selector);
    return this.existing$().getTagName();
  }

  public getText(): string {
    logger.info("Get text %s", this.selector);
    return this.existing$().getText();
  }

  public isTextContaining(expected: string, reverse?: boolean): boolean {
    logger.info("Is text containing %s: ", this.selector, expected);
    return new ElementConditions(this.existing$().selector)
      .textContains(expected, reverse)
      .run()
      .isSuccess();
  }

  public isTextEmpty(reverse?: boolean): boolean {
    logger.info("Is text empty %s", this.selector);
    return new ElementConditions(this.existing$().selector)
      .textEmpty(reverse)
      .run()
      .isSuccess();
  }

  public isTextEquals(expected: string, reverse?: boolean): boolean {
    logger.info("Is text equals %s: %s", this.selector, expected);
    return new ElementConditions(this.existing$().selector)
      .textEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkTextContains(expected: string, reverse?: boolean): void {
    logger.info("Check text contains %s: %s", this.selector, expected);
    new ElementConditions(this.existing$().selector)
      .textContains(expected, reverse)
      .runStrict();
  }

  public checkTextEmpty(reverse?: boolean): void {
    logger.info("Check text empty %s", this.selector);
    new ElementConditions(this.existing$().selector)
      .textEmpty(reverse)
      .runStrict();
  }

  public checkTextEquals(expected: string, reverse?: boolean): void {
    logger.info("Check text equals %s: %s", this.selector, expected);
    new ElementConditions(this.existing$().selector)
      .textEquals(expected, reverse)
      .runStrict();
  }

  public getValue(): string {
    logger.info("Get value %s", this.selector);
    return this.existing$().getValue();
  }

  public isValueContaining(expected: string, reverse?: boolean): boolean {
    logger.info("Is value containing %s: %s", this.selector, expected);
    return new ElementConditions(this.existing$().selector)
      .valueContains(expected, reverse)
      .run()
      .isSuccess();
  }

  public isValueEmpty(reverse?: boolean): boolean {
    logger.info("Is value empty %s", this.selector);
    return new ElementConditions(this.existing$().selector)
      .valueEmpty(reverse)
      .run()
      .isSuccess();
  }

  public isValueEquals(expected: string, reverse?: boolean): boolean {
    logger.info("Is value equals %s: %s", this.selector, expected);
    return new ElementConditions(this.existing$().selector)
      .valueEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkValueContains(expected: string, reverse?: boolean): void {
    logger.info("Check value contains %s: %s", this.selector, expected);
    new ElementConditions(this.existing$().selector)
      .valueContains(expected, reverse)
      .runStrict();
  }

  public checkValueEmpty(reverse?: boolean): void {
    logger.info("Check value empty %s", this.selector);
    new ElementConditions(this.existing$().selector)
      .valueEmpty(reverse)
      .runStrict();
  }

  public checkValueEquals(expected: string, reverse?: boolean): void {
    logger.info("Check value equals %s: %s", this.selector, expected);
    new ElementConditions(this.existing$().selector)
      .valueEquals(expected, reverse)
      .runStrict();
  }

  public getCount(): number {
    logger.info("Get count %s", this.selector);
    return $$(this.selector).length;
  }

  public isUnique(reverse?: boolean): boolean {
    logger.info("Is unique %s", this.selector);
    return new ElementConditions(this.existing$().selector)
      .countEquals(1, reverse)
      .run()
      .isSuccess();
  }

  public checkUnique(reverse?: boolean): void {
    logger.info("Check unique %s", this.selector);
    new ElementConditions(this.existing$().selector)
      .countEquals(1, reverse)
      .runStrict();
  }

  public isCountEquals(expected: number, reverse?: boolean): boolean {
    logger.info("Is count equals %s: %s", this.selector, expected);
    return new ElementConditions(this.selector)
      .countEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public isCountGreaterThan(expected: number, reverse?: boolean): boolean {
    logger.info("Is count greater than %s: %s", this.selector, expected);
    return new ElementConditions(this.selector)
      .countGreaterThan(expected, reverse)
      .run()
      .isSuccess();
  }

  public isCountLessThan(expected: number, reverse?: boolean): boolean {
    logger.info("Is count less than %s: %s", this.selector, expected);
    return new ElementConditions(this.selector)
      .countLessThan(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkCountEquals(expected: number, reverse?: boolean): void {
    logger.info("Check count equals %s: %s", this.selector, expected);
    new ElementConditions(this.selector)
      .countEquals(expected, reverse)
      .runStrict();
  }

  public checkCountGreaterThan(expected: number, reverse?: boolean): void {
    logger.info("Check count greater than %s: %s", this.selector, expected);
    new ElementConditions(this.selector)
      .countGreaterThan(expected, reverse)
      .runStrict();
  }

  public checkCountLessThan(expected: number, reverse?: boolean): void {
    logger.info("Check count less than %s: %s", this.selector, expected);
    new ElementConditions(this.selector)
      .countLessThan(expected, reverse)
      .runStrict();
  }

  public isDisplayed(reverse?: boolean): boolean {
    logger.info("Is displayed %s", this.selector);
    return new ElementConditions(this.existing$().selector)
      .displayed(reverse)
      .run()
      .isSuccess();
  }

  public checkDisplayed(reverse?: boolean): void {
    logger.info("Check displayed %s", this.selector);
    new ElementConditions(this.selector)
      .existing()
      .displayed(reverse)
      .runStrict();
  }

  public isDisplayedInViewport(reverse?: boolean): boolean {
    logger.info("Is displayed in viewport %s", this.selector);
    return new ElementConditions(this.existing$().selector)
      .displayedInVewport(reverse)
      .run()
      .isSuccess();
  }

  public checkDisplayedInViewport(reverse?: boolean): void {
    logger.info("Check displayed in viewport %s", this.selector);
    new ElementConditions(this.existing$().selector)
      .displayedInVewport(reverse)
      .runStrict();
  }

  public isEnabled(reverse?: boolean): boolean {
    logger.info("Is enabled %s", this.selector);
    return new ElementConditions(this.existing$().selector)
      .enabled(reverse)
      .run()
      .isSuccess();
  }

  public checkEnabled(reverse?: boolean): void {
    logger.info("Check enabled %s", this.selector);
    new ElementConditions(this.existing$().selector)
      .enabled(reverse)
      .runStrict();
  }

  public isExisting(reverse?: boolean, timeout?: number): boolean {
    logger.info("Is existing %s", this.selector);
    return new ElementConditions(this.selector)
      .existing(reverse)
      .run(timeout || 0)
      .isSuccess();
  }

  public checkExisting(reverse?: boolean): void {
    logger.info("Check existing %s", this.selector);
    new ElementConditions(this.selector)
      .existing(reverse)
      .runStrict();
  }

  public isFocused(reverse?: boolean): boolean {
    logger.info("Is focused %s", this.selector);
    return new ElementConditions(this.existing$().selector)
      .focused(reverse)
      .run()
      .isSuccess();
  }

  public checkFocused(reverse?: boolean): void {
    logger.info("Check focused %s", this.selector);
    new ElementConditions(this.existing$().selector)
      .focused(reverse)
      .runStrict();
  }

  public isImageMatchRef(filename: string, reverse?: boolean, options?: IImageCompareOptions): boolean {
    logger.info("Is image matching %s: %s", this.selector, filename);
    return new ElementConditions(this.existing$().selector)
      .imageMatch(filename, reverse, options)
      .run()
      .isSuccess();
  }

  public checkImageMatchRef(filename: string, reverse?: boolean, options?: IImageCompareOptions): void {
    logger.info("Check image matching %s: %s", this.selector, filename);
    new ElementConditions(this.existing$().selector)
      .imageMatch(filename, reverse, options)
      .runStrict();
  }

  public isSelected(reverse?: boolean): boolean {
    logger.info("Is selected %s", this.selector);
    return new ElementConditions(this.existing$().selector)
      .selected(reverse)
      .run()
      .isSuccess();
  }

  public checkSelected(reverse?: boolean): void {
    logger.info("Check selected %s", this.selector);
    new ElementConditions(this.existing$().selector)
      .selected(reverse)
      .runStrict();
  }

  public isSizeEquals(width: number, height: number, reverse?: boolean): boolean {
    logger.info("Is size equals %s: %s x %s", this.selector, width, height);
    return new ElementConditions(this.existing$().selector)
      .sizeEquals(width, height, reverse)
      .run()
      .isSuccess();
  }

  public isSizeHeightEquals(expected: number, reverse?: boolean): boolean {
    logger.info("Is size height equals %s: %s", this.selector, expected);
    return new ElementConditions(this.existing$().selector)
      .sizeHeightEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public isSizeWidthEquals(expected: number, reverse?: boolean): boolean {
    logger.info("Is size width equals %s: %s", this.selector, expected);
    return new ElementConditions(this.existing$().selector)
      .sizeWidthEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkSizeEquals(width: number, height: number, reverse?: boolean): void {
    logger.info("Check size equals %s: %s x %s", this.selector, width, height);
    new ElementConditions(this.existing$().selector)
      .sizeEquals(width, height, reverse)
      .runStrict();
  }

  public checkSizeHeightEquals(expected: number, reverse?: boolean): void {
    logger.info("Check size height equals %s: %s", this.selector, expected);
    new ElementConditions(this.existing$().selector)
      .sizeHeightEquals(expected, reverse)
      .runStrict();
  }

  public checkSizeWidthEquals(expected: number, reverse?: boolean): void {
    logger.info("Check size width equals %s: %s", this.selector, expected);
    new ElementConditions(this.existing$().selector)
      .sizeWidthEquals(expected, reverse)
      .runStrict();
  }

  public moveTo(xoffset?: number, yoffset?: number): void {
    logger.info("Move to %s: %s.%s", this.selector, xoffset, yoffset);
    this.existing$().moveTo(xoffset, yoffset);
  }

  public scrollIntoView(scrollIntoViewOptions?: boolean | object): void {
    logger.info("Scroll intro view %s", this.selector);
    this.existing$().scrollIntoView(scrollIntoViewOptions);
  }

  public selectByAttribute(attribute: string, value: string): void {
    logger.info("Select by attribute %s: %s - %s", this.selector, attribute, value);
    this.existing$().selectByAttribute(attribute, value);
  }

  public selectByIndex(index: number): void {
    logger.info("Select by index %s: %s", this.selector, index);
    this.existing$().selectByIndex(index);
  }

  public selectByVisibleText(text: string): void {
    logger.info("Select by visible text %s: %s", this.selector, text);
    this.existing$().selectByVisibleText(text);
  }

  public setValue(value: string | number | boolean | object | any[]): void {
    logger.info("Set value %s: %s", this.selector, value);
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
