import { ClickOptions, DragAndDropOptions, MoveToOptions, ParsedCSSValue, TouchActions } from "webdriverio";
import { WdioCheckElementMethodOptions as ElementImageCheckOptions } from "wdio-image-comparison-service";

import logger from "../../logger";
import ElementConditions from "./evaluation/elementConditions";
import SelectorBuilder from "./selectorBuilder";
import { TElementCoordinates, TElementLocation, TElementSize } from "../interfaces";
import { JS_ELEM_EXEC_FUNC, JS_ELEM_SET_ATTRIB, JS_GET_ABSOLUTE_XPATH, JS_GET_PROP, JS_MOUSE_CLICK } from "../browser/scripts";
import { inspect } from "../../cli/utils";

export default class WebElement {
  public readonly parent: string;
  public selector: string;

  public constructor(selector: string) {
    this.selector = selector;
    this.parent = "";
  }

  public getPrevious<T extends WebElement>(levels? :number, Sub?: new (parent: string) => T): T {
    const selector = new SelectorBuilder(this.selector).previous(levels).build();
    const instance = Sub ? new Sub(this.parent) : new WebElement(selector);
    instance.selector = selector;
    return instance as T;
  }

  public getNext<T extends WebElement>(levels? :number, tag?: string, Sub?: new (parent: string) => T): T {
    const selector = new SelectorBuilder(this.selector).next(levels, tag).build();
    const instance = Sub ? new Sub(this.parent) : new WebElement(selector);
    instance.selector = selector;
    return instance as T;
  }

  public getByIndex<T extends WebElement>(index = 1, Sub?: new (parent: string) => T): T {
    const selector = new SelectorBuilder(this.selector).build(index);
    const instance = Sub ? new Sub(this.parent) : new WebElement(selector);
    instance.selector = selector;
    return instance as T;
  }

  public getByExactAttribute<T extends WebElement>(key: string, value: string, Sub?: new (parent: string) => T): T {
    const selector = new SelectorBuilder(this.selector).attributeEquals(key, value).build();
    const instance = Sub ? new Sub(this.parent) : new WebElement(selector);
    instance.selector = selector;
    return instance as T;
  }

  public getByExactLabel<T extends WebElement>(value:string, Sub?: new (parent: string) => T): T {
    return this.getByExactAttribute("label", value, Sub);
  }

  public getByName<T extends WebElement>(value:string, Sub?: new (parent: string) => T): T {
    return this.getByExactAttribute("name", value, Sub);
  }

  public getById<T extends WebElement>(value:string, Sub?: new (parent: string) => T): T {
    return this.getByExactAttribute("id", value, Sub);
  }

  public getByExactText<T extends WebElement>(value:string, Sub?: new (parent: string) => T): T {
    const selector = new SelectorBuilder(this.selector).textEquals(value).build();
    const instance = Sub ? new Sub(this.parent) : new WebElement(selector);
    instance.selector = selector;
    return instance as T;
  }

  public getByDescendantExactText<T extends WebElement>(value:string, Sub?: new (parent: string) => T): T {
    const selector = new SelectorBuilder(this.selector).descendantOrSelf().textEquals(value).build();
    const instance = Sub ? new Sub(this.parent) : new WebElement(selector);
    // @ts-ignore
    if (Sub) instance.selector = new SelectorBuilder(selector).ancestorOrSelf(instance.tag).build();
    return instance as T;
  }

  public getByDescendantPartialText<T extends WebElement>(value:string, Sub?: new (parent: string) => T): T {
    const selector = new SelectorBuilder(this.selector).descendantOrSelf().textContains(value).build();
    const instance = Sub ? new Sub(this.parent) : new WebElement(selector);
    // @ts-ignore
    if (Sub) instance.selector = new SelectorBuilder(selector).ancestorOrSelf(instance.tag).build();
    return instance as T;
  }

  public getByPartialClass<T extends WebElement>(values: string[], Sub?: new (parent: string) => T) {
    const classes = values.filter(Boolean);
    let builder = new SelectorBuilder(this.selector);
    classes.forEach(c => (builder = builder.attributeContains("class", c)));
    const selector = builder.build();
    const instance = Sub ? new Sub(this.parent) : new WebElement(selector);
    instance.selector = selector;
    return instance as T;
  }

  public existing$(): WebdriverIO.Element {
    return new ElementConditions(this.selector, logger.getCaller())
      .existing(true)
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
    const parentSelector = browser.execute(JS_GET_ABSOLUTE_XPATH, parent);
    const childSelector = parentSelector + xpath;
    return new WebElement(childSelector);
  }

  public child$$(xpath: string): WebElement[] {
    const parentSelector = this.child$(xpath).selector;
    return $$(parentSelector).map((elem, index) =>
      new WebElement(new SelectorBuilder(elem.selector as string).build(index + 1)));
  }

  public sendKeys(value: string[]): void {
    logger.info(`Selector: ${this.selector} | Value: ${value}`);
    this.focus();
    browser.pause(200);
    browser.keys(value);
    browser.pause(200);
  }

  public addValue(value: string | number | boolean | object | any[]): void {
    logger.info(`Selector: ${this.selector} | Value: ${value}`);
    this.existing$().addValue(value);
  }

  public clearValue(): void {
    logger.info(`Selector: ${this.selector}`);
    this.existing$().clearValue();
  }

  public jsClick(): void {
    logger.info(`Selector: ${this.selector}`);
    const elem = this.existing$();
    browser.execute(JS_MOUSE_CLICK, elem);
  }

  public clickUntil(condition: ElementConditions, options?: ClickOptions): void {
    logger.info(`Selector: ${this.selector}${options ? " | Options: " + inspect(options) : ""}`);
    const action = () => this.click(options);

    condition.name = `${logger.getCaller(true, 1)} - ${condition.name}`;
    condition.runStrict(action);
  }

  public jsClickUntil(condition: ElementConditions): void {
    logger.info(`Selector: ${this.selector}`);
    const action = () => this.jsClick();

    condition.name = `${logger.getCaller(true, 1)} - ${condition.name}`;
    condition.runStrict(action);
  }

  public click(options?: ClickOptions): void {
    logger.info(`Selector: ${this.selector}${options ? " | Options: " + inspect(options) : ""}`);
    this.existing$().click(options);
  }

  public doubleClick(): void {
    logger.info(`Selector: ${this.selector}`);
    this.existing$().doubleClick();
  }

  public focus(): void {
    logger.info(`Selector: ${this.selector}`);
    const elem = this.existing$();
    browser.execute((elem: any) => elem.focus(), elem);
  }

  public moveAndClick(): void {
    logger.info(`Selector: ${this.selector}`);
    this.moveTo();
    this.existing$().click();
  }

  public moveAndDoubleClick(): void {
    logger.info(`Selector: ${this.selector}`);
    const elem = this.existing$();
    elem.moveTo();
    elem.doubleClick();
  }

  public dragAndDrop(target: string | TElementLocation, options?: DragAndDropOptions): void {
    logger.info(`Selector: ${this.selector}`);
    const dest = typeof target === "string"
      ? new ElementConditions(target)
        .existing(true)
        .runStrict()
        .getElement()
      : target;

    typeof target === "string" && this.moveTo();
    this.existing$().dragAndDrop(dest, options);
  }

  public executeFunction(funcName: string, await = false) {
    logger.info(`Selector: ${this.selector} | Function: ${funcName}`);
    const elem = this.existing$();
    return browser.execute(JS_ELEM_EXEC_FUNC(funcName, await), elem);
  }

  public getProp(prop: string): string {
    logger.info(`Selector: ${this.selector} | Property: ${prop}`);
    return browser.execute(JS_GET_PROP, this.existing$(), prop);
  }

  public getAttribute(key: string): string {
    logger.info(`Selector: ${this.selector} | Attribute: ${key}`);
    return this.existing$().getAttribute(key);
  }

  public isAttributeContaining(key: string, value: string, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Value: ${value} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(key, true)
      .attributeContains(key, value, preferred)
      .run()
      .isSuccess();
  }

  public isAttributeEquals(key: string, value: string, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Value: ${value} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(key, true)
      .attributeEquals(key, value, preferred)
      .run()
      .isSuccess();
  }

  public isAttributeExisting(key: string, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .attributeExists(key, preferred)
      .run()
      .isSuccess();
  }

  public checkAttributeContains(key: string, value: string, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Value: ${value} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .attributeExists(key, true)
      .attributeContains(key, value, preferred)
      .runStrict();
  }

  public checkAttributeEquals(key: string, value: string, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Value: ${value} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .attributeExists(key, true)
      .attributeEquals(key, value, preferred)
      .runStrict();
  }

  public checkAttributeExists(key: string, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .attributeExists(key, preferred)
      .runStrict();
  }

  public isAxisLocationEquals(axis: TElementCoordinates, expected: number, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Axis: ${axis} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .axisLocationEquals(axis, expected, preferred)
      .run()
      .isSuccess();
  }

  public checkAxisLocationEquals(axis: TElementCoordinates, expected: number, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Axis: ${axis} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .axisLocationEquals(axis, expected, preferred)
      .runStrict();
  }

  public getCSSProperty(key: string): ParsedCSSValue {
    logger.info(`Selector: ${this.selector} | Property: ${key}`);
    return this.existing$().getCSSProperty(key);
  }

  public isCSSPropertyExisting(key: string, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Property: ${key} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .cssPropertyExists(key, preferred)
      .run()
      .isSuccess();
  }

  public checkCSSPropertyExists(key: string, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Property: ${key} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .cssPropertyExists(key, preferred)
      .runStrict();
  }

  public getHTML(isSelfIncluded = true): string {
    logger.info(`Selector: ${this.selector} | Include Self: ${isSelfIncluded}`);
    return this.existing$().getHTML(isSelfIncluded);
  }

  public getLocation(): TElementLocation {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getLocation() as TElementLocation;
  }

  public getProperty(key: string) {
    logger.info(`Selector: ${this.selector} | Property: ${key}`);
    return this.existing$().getProperty(key);
  }

  public getSize(): TElementSize {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getSize() as TElementSize;
  }

  public getTagName(): string {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getTagName();
  }

  public getText(): string {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getText();
  }

  public isTextContaining(expected: string, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .textContains(expected, preferred)
      .run()
      .isSuccess();
  }

  public isTextEmpty(preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .textEmpty(preferred)
      .run()
      .isSuccess();
  }

  public isTextEquals(expected: string, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .textEquals(expected, preferred)
      .run()
      .isSuccess();
  }

  public checkTextContains(expected: string, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .textContains(expected, preferred)
      .runStrict();
  }

  public checkTextEmpty(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .textEmpty(preferred)
      .runStrict();
  }

  public checkTextEquals(expected: string, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .textEquals(expected, preferred)
      .runStrict();
  }

  public getValue(): string {
    logger.info(`Selector: ${this.selector}`);
    return this.existing$().getValue();
  }

  public isValueContaining(expected: string, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .valueContains(expected, preferred)
      .run()
      .isSuccess();
  }

  public isValueEmpty(preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .valueEmpty(preferred)
      .run()
      .isSuccess();
  }

  public isValueEquals(expected: string, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .valueEquals(expected, preferred)
      .run()
      .isSuccess();
  }

  public checkValueContains(expected: string, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .valueContains(expected, preferred)
      .runStrict();
  }

  public checkValueEmpty(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .valueEmpty(preferred)
      .runStrict();
  }

  public checkValueEquals(expected: string, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .valueEquals(expected, preferred)
      .runStrict();
  }

  public getCount(): number {
    logger.info(`Selector: ${this.selector}`);
    return $$(this.selector).length;
  }

  public isUnique(preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .countEquals(1, preferred)
      .run()
      .isSuccess();
  }

  public checkUnique(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .countEquals(1, preferred)
      .runStrict();
  }

  public isCountEquals(expected: number, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.selector)
      .countEquals(expected, preferred)
      .run()
      .isSuccess();
  }

  public isCountGreaterThan(expected: number, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.selector)
      .countGreaterThan(expected, preferred)
      .run()
      .isSuccess();
  }

  public isCountLessThan(expected: number, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.selector)
      .countLessThan(expected, preferred)
      .run()
      .isSuccess();
  }

  public checkCountEquals(expected: number, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.selector)
      .countEquals(expected, preferred)
      .runStrict();
  }

  public checkCountGreaterThan(expected: number, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.selector)
      .countGreaterThan(expected, preferred)
      .runStrict();
  }

  public checkCountLessThan(expected: number, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.selector)
      .countLessThan(expected, preferred)
      .runStrict();
  }

  public isDisplayed(preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .displayed(preferred)
      .run()
      .isSuccess();
  }

  public checkDisplayed(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.selector)
      .existing(true)
      .displayed(preferred)
      .runStrict();
  }

  public isDisplayedInViewport(preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .displayedInVewport(preferred)
      .run()
      .isSuccess();
  }

  public checkDisplayedInViewport(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .displayedInVewport(preferred)
      .runStrict();
  }

  public isEnabled(preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .enabled(preferred)
      .run()
      .isSuccess();
  }

  public checkEnabled(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .enabled(preferred)
      .runStrict();
  }

  public isExisting(preferred = true, timeout = 0): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.selector)
      .existing(preferred)
      .run(undefined, timeout)
      .isSuccess();
  }

  public checkExisting(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.selector)
      .existing(preferred)
      .runStrict();
  }

  public isFocused(preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .focused(preferred)
      .run()
      .isSuccess();
  }

  public checkFocused(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .focused(preferred)
      .runStrict();
  }

  public isImageMatchRef(
    filename: string, preferred = true, options?: ElementImageCheckOptions, hook: "move" | "scroll" | "none" = "move"): boolean {
    logger.info(`Selector: ${this.selector} | File: ${filename} | Options: ${inspect(options)} | Reverse: ${!preferred}`);

    if (hook === "move") {
      this.moveTo();
    } else if (hook === "scroll") {
      this.scrollIntoView();
    }

    return new ElementConditions(this.existing$().selector)
      .imageMatch(filename, preferred, options)
      .run()
      .isSuccess();
  }

  public checkImageMatchRef(
    filename: string, preferred = true, options?: ElementImageCheckOptions, hook: "move" | "scroll" | "none" = "move"): void {
    logger.info(`Selector: ${this.selector} | File: ${filename} | Options: ${inspect(options)} | Reverse: ${!preferred}`);

    if (hook === "move") {
      this.moveTo();
    } else if (hook === "scroll") {
      this.scrollIntoView();
    }

    new ElementConditions(this.existing$().selector)
      .imageMatch(filename, preferred, options)
      .runStrict();
  }

  public isSelected(preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .selected(preferred)
      .run()
      .isSuccess();
  }

  public checkSelected(preferred = true): void {
    logger.info(`Selector: ${this.selector} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .selected(preferred)
      .runStrict();
  }

  public isSizeEquals(width: number, height: number, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Width: ${width} | Height: ${height} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .sizeEquals(width, height, preferred)
      .run()
      .isSuccess();
  }

  public isSizeHeightEquals(expected: number, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .sizeHeightEquals(expected, preferred)
      .run()
      .isSuccess();
  }

  public isSizeWidthEquals(expected: number, preferred = true): boolean {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    return new ElementConditions(this.existing$().selector)
      .sizeWidthEquals(expected, preferred)
      .run()
      .isSuccess();
  }

  public checkSizeEquals(width: number, height: number, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Width: ${width} | Height: ${height} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .sizeEquals(width, height, preferred)
      .runStrict();
  }

  public checkSizeHeightEquals(expected: number, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .sizeHeightEquals(expected, preferred)
      .runStrict();
  }

  public checkSizeWidthEquals(expected: number, preferred = true): void {
    logger.info(`Selector: ${this.selector} | Expected: ${expected} | Reverse: ${!preferred}`);
    new ElementConditions(this.existing$().selector)
      .sizeWidthEquals(expected, preferred)
      .runStrict();
  }

  public moveTo(options?: MoveToOptions): void {
    logger.info(`Selector: ${this.selector} | Options: ${options}`);
    this.existing$().scrollIntoView({ block: "center" });
    this.existing$().moveTo(options);
  }

  public scrollIntoView(options?: boolean | object): void {
    logger.info(`Selector: ${this.selector} | Options: ${inspect(options)}`);
    this.existing$().scrollIntoView(options);
  }

  public selectByAttribute(key: string, value: string): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Value: ${value}`);
    this.existing$().selectByAttribute(key, value);
  }

  public selectByIndex(index: number): void {
    logger.info(`Selector: ${this.selector} | Index: ${index}`);
    this.existing$().selectByIndex(index);
  }

  public selectByVisibleText(text: string): void {
    logger.info(`Selector: ${this.selector} | Text: ${text}`);
    this.existing$().selectByVisibleText(text);
  }

  public setValue(value: string): void {
    logger.info(`Selector: ${this.selector} | Value: ${value}`);
    this.existing$().setValue(value);
  }

  public setAttribute(key: string, value: string): void {
    logger.info(`Selector: ${this.selector} | Attribute: ${key} | Value: ${value}`);
    const elem = this.existing$();
    browser.execute(JS_ELEM_SET_ATTRIB(key, value), elem);
  }

  public shadow$$(selector: string): WebdriverIO.Element[] {
    return this.existing$().shadow$$(selector);
  }

  public shadow$(selector: string): WebdriverIO.Element {
    return this.existing$().shadow$(selector);
  }

  public touchAction(action: TouchActions): void {
    this.existing$().touchAction(action);
  }
}
