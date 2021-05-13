import { NewWindowOptions } from "webdriverio";
import { WdioCheckFullPageMethodOptions, WdioCheckScreenMethodOptions } from "wdio-image-comparison-service";

import logger from "../../logger";
import BrowserConditions from "./evaluation/browserConditions";
import { WebElement } from "../elements";
import { IHttpRequest, IHttpResponse, IJSONDiffOptions, TElementLocation } from "../interfaces";
import { sendSyncRequest } from "../utils";
import { inspect } from "../../cli/utils";
import { JS_WINDOW_SCROLL_TO_BOTTOM } from "./scripts";

export default abstract class Driver {
  public static acceptAlert(): void {
    logger.info("NoArgs");
    browser.acceptAlert();
  }

  public static dismissAlert(): void {
    logger.info("NoArgs");
    browser.dismissAlert();
  }

  public static closeLastWindow(): void {
    logger.info("NoArgs");
    const handles = browser.getWindowHandles();
    const parent = handles[0];
    const last = handles.slice(-1)[0];

    browser.switchToWindow(last);
    browser.closeWindow();
    browser.switchToWindow(parent);
  }

  public static closeChildWindows(): void {
    logger.info("NoArgs");
    let handles = browser.getWindowHandles();
    const parent = handles[0];

    while (handles.length > 1) {
      const last = handles.slice(-1)[0];

      browser.switchToWindow(last);
      browser.closeWindow();
      browser.switchToWindow(parent);
      handles = browser.getWindowHandles();
    }
  }

  public static clickCoordinates(x = 0, y = 0, origin: "pointer" | "viewport" | WebdriverIO.Element = "pointer") {
    // see https://github.com/jlipps/simple-wd-spec#perform-actions
    browser.performActions([{
      type: "pointer",
      id: "mousepointer",
      actions: [
        { type: "pointerMove", duration: 0, origin: origin, x: x, y: y },
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 10 },
        { type: "pointerUp", button: 0 }
      ]
    }]);
    browser.releaseActions();
  }

  public static dragRelativeToPointer(dest: TElementLocation, dragDuration = 500) {
    browser.performActions([{
      type: "pointer",
      id: "mousepointer",
      actions: [
        { type: "pointerDown", button: 0 },
        { type: "pause", duration: 10 },
        { type: "pointerMove", dragDuration, origin: "pointer", x: dest.x, y: dest.y },
        { type: "pointerUp", button: 0 }
      ]
    }]);
    browser.releaseActions();
  }

  public static focusLastWindow(): void {
    logger.info("NoArgs");
    const handles = browser.getWindowHandles();
    const last = handles.slice(-1)[0];

    browser.switchToWindow(last);
  }

  public static focusParentWindow(): void {
    logger.info("NoArgs");
    const handles = browser.getWindowHandles();
    const parent = handles[0];

    browser.switchToWindow(parent);
  }

  public static deleteCookie(cookie: string): void {
    logger.info(cookie);
    browser.deleteCookie(cookie);
  }

  public static deleteCookies(): void {
    logger.info("NoArgs");
    browser.deleteCookies();
  }

  public static interceptAjaxRequests(): void {
    logger.info("NoArgs");
    browser.setupInterceptor();
  }

  public static getAlertText(): string {
    logger.info("NoArgs");
    return browser.getAlertText();
  }

  public static maximizeWindow(): void {
    logger.info("NoArgs");
    browser.maximizeWindow();
  }

  public static newWindow(url: string, options?: NewWindowOptions): void {
    logger.info(`URL: ${url} | Options: ${options}`);
    browser.newWindow(url, options);
  }

  public static back(): void {
    logger.info("NoArgs");
    browser.back();
  }

  public static forward(): void {
    logger.info("NoArgs");
    browser.forward();
  }

  public static refresh(): void {
    logger.info("NoArgs");
    browser.refresh();
  }

  public static pause(milliseconds: number): void {
    logger.info(milliseconds);
    browser.pause(milliseconds);
  }

  public static pressKeys(...keys: string[]): void {
    logger.info("Keys: ", ...keys);
    browser.keys(keys);
  }

  public static scrollTo(x: number, y: number): void {
    logger.info(`X: ${x} | Y: ${y}`);
    browser.execute((x, y) => window.scrollTo(x, y), x, y);
  }

  public static scrollToTop(): void {
    logger.info("NoArgs");
    browser.execute((x, y) => window.scrollTo(x, y), 0, 0);
  }

  public static scrollToBottom(): void {
    logger.info("NoArgs");
    browser.execute(JS_WINDOW_SCROLL_TO_BOTTOM);
  }

  public static setCookie(key: string, value: string): void {
    logger.info(`Cookie: ${key} | Value: ${value}`);
    browser.setCookies({
      name: key,
      value: value
    });
  }

  public static getLocalStorage(key: string): any {
    logger.info(`Key: ${key}`);
    return browser.execute(function(this: any, key) { return this.localStorage.getItem(key); }, key);
  }

  public static setLocalStorage(key: string, value: string): void {
    logger.info(`Key: ${key} | Value: ${value}`);
    browser.execute(function(this: any, key, value) { this.localStorage.setItem(key, value); }, key, value);
  }

  public static getSessionStorage(key: string): any {
    logger.info(`Key: ${key}`);
    return browser.execute(function(this: any, key) { return this.sessionStorage.getItem(key); }, key);
  }

  public static setSessionStorage(key: string, value: string): void {
    logger.info(`Key: ${key} | Value: ${value}`);
    browser.execute(function(this: any, key, value) { this.sessionStorage.setItem(key, value); }, key, value);
  }

  public static setWindowSize(width: string, height: string): void {
    logger.info(`Width: ${width} | Height: ${height}`);
    browser.setWindowSize(
      parseInt(width, 10),
      parseInt(height, 10)
    );
  }

  public static sendAlertText(text: string): void {
    logger.info("NoArgs");
    browser.sendAlertText(text);
  }

  public static sendHttpRequest(request: IHttpRequest): IHttpResponse {
    logger.info(inspect(request.options));
    return sendSyncRequest(request);
  }

  public static switchToFrame(element: WebElement): void {
    logger.info(element.selector);
    browser.switchToFrame(element.existing$());
  }

  public static switchToParentFrame(): void {
    logger.info("NoArgs");
    browser.switchToParentFrame();
  }

  public static url(url: string): void {
    logger.info(url);
    browser.url(url);
  }

  public static checkPageIsReady(preferred = true): void {
    logger.info(`Reverse: ${!preferred}`);
    new BrowserConditions()
      .documentReady(preferred)
      .runStrict();
  }

  public static checkAjaxRequestsMatchRef(filename: string, preferred = true, options: IJSONDiffOptions = {}): void {
    logger.info(`File: ${filename} | Reverse: ${!preferred} | Options: ${options}`);
    new BrowserConditions()
      .documentReady(true)
      .ajaxRequestsMatch(filename, preferred, options)
      .runStrict();
  }

  public static checkModalExisting(preferred = true): void {
    logger.info(`Reverse: ${!preferred}`);
    new BrowserConditions()
      .modalExists(preferred)
      .runStrict();
  }

  public static checkModalTextContains(expected: string, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .modalTextContains(expected, preferred)
      .runStrict();
  }

  public static checkModalTextEquals(expected: string, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .modalTextEquals(expected, preferred)
      .runStrict();
  }

  public static checkCookieContains(cookie: string, expected: string, preferred = true): void {
    logger.info(`Cookie: ${cookie} | Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .cookieContains(cookie, expected, preferred)
      .runStrict();
  }

  public static checkCookieEquals(cookie: string, expected: string, preferred = true): void {
    logger.info(`Cookie: ${cookie} | Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .cookieEquals(cookie, expected, preferred)
      .runStrict();
  }

  public static checkCookieExists(cookie: string, preferred = true): void {
    logger.info(`Cookie: ${cookie} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .cookieExists(cookie, preferred)
      .runStrict();
  }

  public static checkCountEquals(expected: number, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .countEquals(expected, preferred)
      .runStrict();
  }

  public static checkCountGreaterThan(expected: number, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .countGreaterThan(expected, preferred)
      .runStrict();
  }

  public static checkCountLessThan(expected: number, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .countLessThan(expected, preferred)
      .runStrict();
  }

  public static checkCustomTruthy(truthy: Function, preferred = true): void {
    logger.info(`Reverse: ${!preferred}`);
    new BrowserConditions()
      .customTruthy(truthy, preferred)
      .runStrict();
  }

  public static checkGAEntriesMatchRef(
    filename: string, event: string, preferred = true, options: IJSONDiffOptions = {}): void {
    logger.info(`File: ${filename} | Event: ${event} | Reverse: ${!preferred} | Options: ${options}`);
    new BrowserConditions()
      .documentReady(true)
      .gaEntriesMatch(filename, event, preferred, options)
      .runStrict();
  }

  public static checkHttpResponseMatchRef(
    request: IHttpRequest, filename: string, preferred = true, options: IJSONDiffOptions = {}): void {
    logger.info(`Request: ${request.options} | File: ${filename} | Reverse: ${!preferred} | Options: ${options}`);
    new BrowserConditions()
      .httpResponseMatch(request, filename, preferred, options)
      .runStrict();
  }

  public static checkImageMatchRef(
    context: string, filename: string, preferred = true,
    options?: WdioCheckFullPageMethodOptions | WdioCheckScreenMethodOptions): void {
    logger.info(`Context: ${context} | File: ${filename} | Reverse: ${!preferred} | Options: ${options}`);
    new BrowserConditions()
      .imageMatch(context, filename, preferred, options)
      .runStrict();
  }

  public static checkTitleContains(expected: string, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .titleContains(expected, preferred)
      .runStrict();
  }

  public static checkTitleEquals(expected: string, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .titleEquals(expected, preferred)
      .runStrict();
  }

  public static checkUrlContains(expected: string, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .urlContains(expected, preferred)
      .runStrict();
  }

  public static checkUrlEquals(expected: string, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .urlEquals(expected, preferred)
      .runStrict();
  }

  public static checkUrlPathContains(expected: string, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .urlPathContains(expected, preferred)
      .runStrict();
  }

  public static checkUrlPathEquals(expected: string, preferred = true): void {
    logger.info(`Expected: ${expected} | Reverse: ${!preferred}`);
    new BrowserConditions()
      .urlPathEquals(expected, preferred)
      .runStrict();
  }
}
