import { PreFilterFunction } from "deep-diff";

import * as logger from "../../logger";
import { WebElement } from "../elements";
import { IHttpRequest, IHttpResponse, IImageCompareOptions } from "../interfaces";
import { sendSyncRequest } from "../utils";
import BrowserConditions from "./evaluation/browserConditions";

export default abstract class Driver {
  public static acceptAlert(): void {
    logger.info("Accept alert");
    browser.acceptAlert();
  }

  public static dismissAlert(): void {
    logger.info("Dismiss alert");
    browser.dismissAlert();
  }

  public static closeLastWindow(): void {
    logger.info("Close last window");
    const handles = browser.getWindowHandles();
    const parent = handles[0];
    const last = handles.slice(-1)[0];

    browser.switchToWindow(last);
    browser.closeWindow();
    browser.switchToWindow(parent);
  }

  public static closeChildWindows(): void {
    logger.info("Close child windows");
    const handles = browser.getWindowHandles();
    const parent = handles[0];

    handles.forEach((handle: string, index: number) => {
      if (index > 0) {
        browser.switchWindow(handle);
        browser.closeWindow();
      }
    });
    browser.switchToWindow(parent);
  }

  public static focusLastWindow(): void {
    logger.info("Focus last window");
    const handles = browser.getWindowHandles();
    const last = handles.slice(-1)[0];

    browser.switchToWindow(last);
  }

  public static focusParentWindow(): void {
    logger.info("Focus parent window");
    const handles = browser.getWindowHandles();
    const last = handles.slice(-1)[0];

    browser.switchToWindow(last);
  }

  public static deleteCookie(cookie: string): void {
    logger.info("Delete coookie: %s", cookie);
    browser.deleteCookie(cookie);
  }

  public static deleteCookies(): void {
    logger.info("Delete coookies");
    browser.deleteCookies();
  }

  public static interceptAjaxRequests(): void {
    logger.info("Interccept ajax requests");
    (browser as any).setupInterceptor();
  }

  public static getAlertText(): string {
    logger.info("Get alert text");
    return browser.getAlertText();
  }

  public static maximizeWindow(): void {
    logger.info("Maximize window");
    browser.maximizeWindow();
  }

  public static newWindow(url: string, name?: string, features?: string): void {
    logger.info(`New window \nURL: ${url}\nName: ${name}\nFeatures: ${features}`);
    browser.newWindow(url, name, features);
  }

  public static back(): void {
    logger.info("Back");
    browser.back();
  }

  public static forward(): void {
    logger.info("Forward");
    browser.forward();
  }

  public static refresh(): void {
    logger.info("Refresh");
    browser.refresh();
  }

  public static pause(milliseconds: number): void {
    logger.info("Pause: %s", milliseconds);
    browser.pause(milliseconds);
  }

  public static pressKeys(...keys: string[]): void {
    logger.info("Press keys: %s", ...keys);
    browser.keys(keys);
  }

  public static scrollTo(x: number, y: number): void {
    logger.info("Scroll to: %s, %s", x, y);
    browser.execute((x, y) => window.scrollTo(x, y), x, y);
  }

  public static scrollToTop(): void {
    logger.info("Scroll to top");
    browser.execute((x, y) => window.scrollTo(x, y), 0, 0);
  }

  public static scrollToBottom(): void {
    logger.info("Scroll to bottom");
    browser.execute("window.scrollTo(0, document.body.scrollHeight)");
  }

  public static setCookie(cookieName: string, cookieValue: string): void {
    logger.info("Set cookie: %s - %s", cookieName, cookieValue);
    browser.setCookies({
      name: cookieName,
      value: cookieValue
    });
  }

  public static setWindowSize(screenWidth: string, screenHeight: string): void {
    logger.info("Set window size: %s - %s", screenWidth, screenHeight);
    browser.setWindowSize(
      parseInt(screenWidth, 10),
      parseInt(screenHeight, 10)
    );
  }

  public static sendAlertText(text: string): void {
    logger.info("Send alert text: %s", text);
    browser.sendAlertText(text);
  }

  public static sendHttpRequest(request: IHttpRequest): IHttpResponse {
    logger.info(`Send http request: ${request.options}`);
    return sendSyncRequest(request);
  }

  public static switchToFrame(element: WebElement): void {
    logger.info("Switch to frame: %s", element.selector);
    browser.switchToFrame(element.existing$());
  }

  public static switchToParentFrame(): void {
    logger.info("Switch to parent frame");
    browser.switchToParentFrame();
  }

  public static url(url: string): void {
    logger.info("Url: %s", url);
    browser.url(url);
  }

  public static checkAjaxRequestsMatchRef(filename: string, reverse?: boolean, prefilter?: PreFilterFunction): void {
    logger.info("Check ajax requests match ref: %s", filename);
    new BrowserConditions()
      .ajaxRequestsMatch(filename, reverse, prefilter)
      .runStrict();
  }

  public static checkModalExisting(reverse?: boolean): void {
    logger.info("Check modal existing");
    new BrowserConditions()
      .modalExists(reverse)
      .runStrict();
  }

  public static checkModalTextContains(expected: string, reverse?: boolean): void {
    logger.info("Check modal text contains: %s", expected);
    new BrowserConditions()
      .modalTextContains(expected, reverse)
      .runStrict();
  }

  public static checkModalTextEquals(expected: string, reverse?: boolean): void {
    logger.info("Check modal text equals: %s", expected);
    new BrowserConditions()
      .modalTextEquals(expected, reverse)
      .runStrict();
  }

  public static checkCookieContains(cookie: string, expected: string, reverse?: boolean): void {
    logger.info("Check cookie contains: %s", expected);
    new BrowserConditions()
      .cookieContains(cookie, expected, reverse)
      .runStrict();
  }

  public static checkCookieEquals(cookie: string, expected: string, reverse?: boolean): void {
    logger.info("Check cookie equals: %s - %s", cookie, expected);
    new BrowserConditions()
      .cookieEquals(cookie, expected, reverse)
      .runStrict();
  }

  public static checkCookieExists(cookie: string, reverse?: boolean): void {
    logger.info("Check cookie exists: %s", cookie);
    new BrowserConditions()
      .cookieExists(cookie, reverse)
      .runStrict();
  }

  public static checkCountEquals(expected: number, reverse?: boolean): void {
    logger.info("Check count equals: %s", expected);
    new BrowserConditions()
      .countEquals(expected, reverse)
      .runStrict();
  }

  public static checkCountGreaterThan(expected: number, reverse?: boolean): void {
    logger.info("Check count greater than: %s", expected);
    new BrowserConditions()
      .countGreaterThan(expected, reverse)
      .runStrict();
  }

  public static checkCountLessThan(expected: number, reverse?: boolean): void {
    logger.info("Check count less than: %s", expected);
    new BrowserConditions()
      .countLessThan(expected, reverse)
      .runStrict();
  }

  public static checkCustomTruthy(truthy: Function, reverse?: boolean): void {
    logger.info("Check custom truthy");
    new BrowserConditions()
      .customTruthy(truthy, reverse)
      .runStrict();
  }

  public static checkHttpResponseMatchRef(
    request: IHttpRequest, filename: string, reverse?: boolean, prefilter?: PreFilterFunction): void {
    logger.info("Check http response match ref: %s", filename);
    new BrowserConditions()
      .httpResponseMatch(request, filename, reverse, prefilter)
      .runStrict();
  }

  public static checkImageMatchRef(
    context: string, filename: string, reverse?: boolean, options?: IImageCompareOptions): void {
    logger.info("Check image match ref: %s", filename);
    new BrowserConditions()
      .imageMatch(context, filename, reverse, options)
      .runStrict();
  }

  public static checkTitleContains(expected: string, reverse?: boolean): void {
    logger.info("Check title contains: %s", expected);
    new BrowserConditions()
      .titleContains(expected, reverse)
      .runStrict();
  }

  public static checkTitleEquals(expected: string, reverse?: boolean): void {
    logger.info("Check title equals: %s", expected);
    new BrowserConditions()
      .titleEquals(expected, reverse)
      .runStrict();
  }

  public static checkUrlContains(expected: string, reverse?: boolean): void {
    logger.info("Check url contains: %s", expected);
    new BrowserConditions()
      .urlContains(expected, reverse)
      .runStrict();
  }

  public static checkUrlEquals(expected: string, reverse?: boolean): void {
    logger.info("Check url equals: %s", expected);
    new BrowserConditions()
      .urlEquals(expected, reverse)
      .runStrict();
  }

  public static checkUrlPathContains(expected: string, reverse?: boolean): void {
    logger.info("Check url path contains: %s", expected);
    new BrowserConditions()
      .urlPathContains(expected, reverse)
      .runStrict();
  }

  public static checkUrlPathEquals(expected: string, reverse?: boolean): void {
    logger.info("Check url path equals: %s", expected);
    new BrowserConditions()
      .urlPathEquals(expected, reverse)
      .runStrict();
  }
}
