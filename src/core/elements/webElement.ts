import * as logger from "../../logger";
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
    this.existing$().addValue(value);
  }

  public clearValue(): void {
    this.existing$().clearValue();
  }

  public click(): void {
    this.existing$().click();
  }

  public doubleClick(): void {
    this.existing$().doubleClick();
  }

  public moveAndClick(): void {
    const elem = this.existing$();
    elem.moveTo();
    elem.click();
  }

  public moveAndDoubleClick(): void {
    const elem = this.existing$();
    elem.moveTo();
    elem.doubleClick();
  }

  public dragAndDrop(target: string, duration?: number): void {
    const dest = new ElementConditions(target)
      .existing()
      .runStrict()
      .getElement();

    this.existing$().dragAndDrop(dest, duration);
  }

  public getAttribute(attrName: string): string {
    return this.existing$().getAttribute(attrName);
  }

  public isAttributeContaining(attrName: string, attrValue: string, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeContains(attrName, attrValue, reverse)
      .run()
      .isSuccess();
  }

  public isAttributeEquals(attrName: string, attrValue: string, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeEquals(attrName, attrValue, reverse)
      .run()
      .isSuccess();
  }

  public isAttributeExisting(attrName: string, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .attributeExists(attrName, reverse)
      .run()
      .isSuccess();
  }

  public checkAttributeContains(attrName: string, attrValue: string, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeContains(attrName, attrValue, reverse)
      .runStrict();
  }

  public checkAttributeEquals(attrName: string, attrValue: string, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName)
      .attributeEquals(attrName, attrValue, reverse)
      .runStrict();
  }

  public checkAttributeExists(attrName: string, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .attributeExists(attrName, reverse)
      .runStrict();
  }

  public isAxisLocationEquals(axis: WebdriverIO.LocationParam, expected: number, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .axisLocationEquals(axis, expected, reverse)
      .run()
      .isSuccess();
  }

  public checkAxisLocationEquals(axis: WebdriverIO.LocationParam, expected: number, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .axisLocationEquals(axis, expected, reverse)
      .runStrict();
  }

  public getCSSProperty(cssProp: string): WebdriverIO.CSSProperty {
    return this.existing$().getCSSProperty(cssProp);
  }

  public isCSSPropertyExisting(cssProp: string, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .cssPropertyExists(cssProp, reverse)
      .run()
      .isSuccess();
  }

  public checkCSSPropertyExists(cssProp: string, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .cssPropertyExists(cssProp, reverse)
      .runStrict();
  }

  public getHTML(includeSelectorTag?: boolean): string {
    return this.existing$().getHTML(includeSelectorTag);
  }

  public getLocation(): WebdriverIO.LocationReturn {
    return this.existing$().getLocation();
  }

  public getProperty(property: string): string | object {
    return this.existing$().getProperty(property);
  }

  public getSize(): WebdriverIO.SizeReturn {
    return this.existing$().getSize();
  }

  public getTagName(): string {
    return this.existing$().getTagName();
  }

  public getText(): string {
    return this.existing$().getText();
  }

  public isTextContaining(expected: string, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .textContains(expected, reverse)
      .run()
      .isSuccess();
  }

  public isTextEmpty(reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .textEmpty(reverse)
      .run()
      .isSuccess();
  }

  public isTextEquals(expected: string, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .textEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkTextContains(expected: string, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .textContains(expected, reverse)
      .runStrict();
  }

  public checkTextEmpty(reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .textEmpty(reverse)
      .runStrict();
  }

  public checkTextEquals(expected: string, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .textEquals(expected, reverse)
      .runStrict();
  }

  public getValue(): string {
    return this.existing$().getValue();
  }

  public isValueContaining(expected: string, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .valueContains(expected, reverse)
      .run()
      .isSuccess();
  }

  public isValueEquals(expected: string, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .valueEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkValueContains(expected: string, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .valueContains(expected, reverse)
      .runStrict();
  }

  public checkValueEquals(expected: string, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .valueEquals(expected, reverse)
      .runStrict();
  }

  public getCount(): number {
    return $$(this.selector).length;
  }

  public isUnique(reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .countEquals(1, reverse)
      .run()
      .isSuccess();
  }

  public checkUnique(reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .countEquals(1, reverse)
      .runStrict();
  }

  public isCountEquals(expected: number, reverse?: boolean): boolean {
    return new ElementConditions(this.selector)
      .countEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public isCountGreaterThan(expected: number, reverse?: boolean): boolean {
    return new ElementConditions(this.selector)
      .countGreaterThan(expected, reverse)
      .run()
      .isSuccess();
  }

  public isCountLessThan(expected: number, reverse?: boolean): boolean {
    return new ElementConditions(this.selector)
      .countLessThan(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkCountEquals(expected: number, reverse?: boolean): void {
    new ElementConditions(this.selector)
      .countEquals(expected, reverse)
      .runStrict();
  }

  public checkCountGreaterThan(expected: number, reverse?: boolean): void {
    new ElementConditions(this.selector)
      .countGreaterThan(expected, reverse)
      .runStrict();
  }

  public checkCountLessThan(expected: number, reverse?: boolean): void {
    new ElementConditions(this.selector)
      .countLessThan(expected, reverse)
      .runStrict();
  }

  public isDisplayed(reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .displayed(reverse)
      .run()
      .isSuccess();
  }

  public checkDisplayed(reverse?: boolean): void {
    new ElementConditions(this.selector)
      .existing()
      .displayed(reverse)
      .runStrict();
  }

  public isDisplayedInViewport(reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .displayedInVewport(reverse)
      .run()
      .isSuccess();
  }

  public checkDisplayedInViewport(reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .displayedInVewport(reverse)
      .runStrict();
  }

  public isEnabled(reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .enabled(reverse)
      .run()
      .isSuccess();
  }

  public checkEnabled(reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .enabled(reverse)
      .runStrict();
  }

  public isExisting(reverse?: boolean, timeout?: number): boolean {
    return new ElementConditions(this.selector)
      .existing(reverse)
      .run(timeout || 0)
      .isSuccess();
  }

  public checkExisting(reverse?: boolean): void {
    new ElementConditions(this.selector)
      .existing(reverse)
      .runStrict();
  }

  public isFocused(reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .focused(reverse)
      .run()
      .isSuccess();
  }

  public checkFocused(reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .focused(reverse)
      .runStrict();
  }

  public isSelected(reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .selected(reverse)
      .run()
      .isSuccess();
  }

  public checkSelected(reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .selected(reverse)
      .runStrict();
  }

  public isSizeEquals(width: number, height: number, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .sizeEquals(width, height, reverse)
      .run()
      .isSuccess();
  }

  public isSizeHeightEquals(expected: number, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .sizeHeightEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public isSizeWidthEquals(expected: number, reverse?: boolean): boolean {
    return new ElementConditions(this.existing$().selector)
      .sizeWidthEquals(expected, reverse)
      .run()
      .isSuccess();
  }

  public checkSizeEquals(width: number, height: number, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .sizeEquals(width, height, reverse)
      .runStrict();
  }

  public checkSizeHeightEquals(expected: number, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .sizeHeightEquals(expected, reverse)
      .runStrict();
  }

  public checkSizeWidthEquals(expected: number, reverse?: boolean): void {
    new ElementConditions(this.existing$().selector)
      .sizeWidthEquals(expected, reverse)
      .runStrict();
  }

  public moveTo(xoffset?: number, yoffset?: number): void {
    this.existing$().moveTo(xoffset, yoffset);
  }

  public scrollIntoView(scrollIntoViewOptions?: boolean | object): void {
    this.existing$().scrollIntoView(scrollIntoViewOptions);
  }

  public selectByAttribute(attribute: string, value: string): void {
    new ElementConditions(this.existing$().selector)
      .attributeExists(attribute)
      .runStrict()
      .getElement()
      .selectByAttribute(attribute, value);
  }

  public selectByIndex(index: number): void {
    this.existing$().selectByIndex(index);
  }

  public selectByVisibleText(text: string): void {
    this.existing$().selectByVisibleText(text);
  }

  public setValue(value: string | number | boolean | object | any[]): void {
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
