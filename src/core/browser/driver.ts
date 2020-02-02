import { PreFilterFunction } from "deep-diff";

import logger from "../../logger";
import BrowserConditions from "./evaluation/browserConditions";
import { WebElement } from "../elements";
import { IHttpRequest, IHttpResponse, IImageCompareOptions } from "../interfaces";
import { sendSyncRequest } from "../utils";

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
    (browser as any).setupInterceptor();
  }

  public static getAlertText(): string {
    logger.info("NoArgs");
    return browser.getAlertText();
  }

  public static maximizeWindow(): void {
    logger.info("NoArgs");
    browser.maximizeWindow();
  }

  public static newWindow(url: string, name?: string, features?: string): void {
    logger.info(`URL: ${url} | Name: ${name} | Features: ${features}`);
    browser.newWindow(url, name, features);
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
    browser.execute("window.scrollTo(0, document.body.scrollHeight)");
  }

  public static setCookie(cookieName: string, cookieValue: string): void {
    logger.info(`Cookie: ${cookieName} | Value: ${cookieValue}`);
    browser.setCookies({
      name: cookieName,
      value: cookieValue
    });
  }

  public static setWindowSize(screenWidth: string, screenHeight: string): void {
    logger.info(`Width: ${screenWidth} | Height: ${screenHeight}`);
    browser.setWindowSize(
      parseInt(screenWidth, 10),
      parseInt(screenHeight, 10)
    );
  }

  public static sendAlertText(text: string): void {
    logger.info("NoArgs");
    browser.sendAlertText(text);
  }

  public static sendHttpRequest(request: IHttpRequest): IHttpResponse {
    logger.info(request.options);
    return sendSyncRequest(request);
  }

  public static switchToFrame(element: WebElement): void {
    logger.info(element);
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

  public static checkAjaxRequestsMatchRef(filename: string, reverse?: boolean, prefilter?: PreFilterFunction): void {
    logger.info(`File: ${filename} | Reverse: ${!!~~reverse} | Prefilter: ${prefilter}`);
    new BrowserConditions()
      .ajaxRequestsMatch(filename, reverse, prefilter)
      .runStrict();
  }

  public static checkModalExisting(reverse?: boolean): void {
    logger.info(`Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .modalExists(reverse)
      .runStrict();
  }

  public static checkModalTextContains(expected: string, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .modalTextContains(expected, reverse)
      .runStrict();
  }

  public static checkModalTextEquals(expected: string, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .modalTextEquals(expected, reverse)
      .runStrict();
  }

  public static checkCookieContains(cookie: string, expected: string, reverse?: boolean): void {
    logger.info(`Cookie: ${cookie} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .cookieContains(cookie, expected, reverse)
      .runStrict();
  }

  public static checkCookieEquals(cookie: string, expected: string, reverse?: boolean): void {
    logger.info(`Cookie: ${cookie} | Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .cookieEquals(cookie, expected, reverse)
      .runStrict();
  }

  public static checkCookieExists(cookie: string, reverse?: boolean): void {
    logger.info(`Cookie: ${cookie} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .cookieExists(cookie, reverse)
      .runStrict();
  }

  public static checkCountEquals(expected: number, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .countEquals(expected, reverse)
      .runStrict();
  }

  public static checkCountGreaterThan(expected: number, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .countGreaterThan(expected, reverse)
      .runStrict();
  }

  public static checkCountLessThan(expected: number, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .countLessThan(expected, reverse)
      .runStrict();
  }

  public static checkCustomTruthy(truthy: Function, reverse?: boolean): void {
    logger.info(`Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .customTruthy(truthy, reverse)
      .runStrict();
  }

  public static checkHttpResponseMatchRef(
    request: IHttpRequest, filename: string, reverse?: boolean, prefilter?: PreFilterFunction): void {
    logger.info(`Request: ${request.options} | File: ${filename} | Reverse: ${!!~~reverse} | Filter: ${prefilter}`);
    new BrowserConditions()
      .httpResponseMatch(request, filename, reverse, prefilter)
      .runStrict();
  }

  public static checkImageMatchRef(
    context: string, filename: string, reverse?: boolean, options?: IImageCompareOptions): void {
    logger.info(`Context: ${context} | File: ${filename} | Reverse: ${!!~~reverse} | Options: ${options}`);
    new BrowserConditions()
      .imageMatch(context, filename, reverse, options)
      .runStrict();
  }

  public static checkTitleContains(expected: string, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .titleContains(expected, reverse)
      .runStrict();
  }

  public static checkTitleEquals(expected: string, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .titleEquals(expected, reverse)
      .runStrict();
  }

  public static checkUrlContains(expected: string, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .urlContains(expected, reverse)
      .runStrict();
  }

  public static checkUrlEquals(expected: string, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .urlEquals(expected, reverse)
      .runStrict();
  }

  public static checkUrlPathContains(expected: string, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .urlPathContains(expected, reverse)
      .runStrict();
  }

  public static checkUrlPathEquals(expected: string, reverse?: boolean): void {
    logger.info(`Expected: ${expected} | Reverse: ${!!~~reverse}`);
    new BrowserConditions()
      .urlPathEquals(expected, reverse)
      .runStrict();
  }
}
