import { PreFilterFunction } from "deep-diff";

import { WebElement } from "../elements";
import BrowserConditions from "./evaluation/browserConditions";

export default abstract class Driver {
  public static acceptAlert(): void {
    browser.acceptAlert();
  }

  public static dismissAlert(): void {
    browser.dismissAlert();
  }

  public static closeLastWindow(): void {
    const handles = browser.getWindowHandles();
    const parent = handles[0];
    const last = handles.slice(-1)[0];

    browser.switchToWindow(last);
    browser.closeWindow();
    browser.switchToWindow(parent);
  }

  public static closeChildWindows(): void {
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
    const handles = browser.getWindowHandles();
    const last = handles.slice(-1)[0];

    browser.switchToWindow(last);
  }

  public static focusParentWindow(): void {
    const handles = browser.getWindowHandles();
    const last = handles.slice(-1)[0];

    browser.switchToWindow(last);
  }

  public static deleteCookie(cookie: string): void {
    browser.deleteCookie(cookie);
  }

  public static deleteCookies(): void {
    browser.deleteCookies();
  }

  public static interceptAjaxRequests(): void {
    (browser as any).setupInterceptor();
  }

  public static maximizeWindow(): void {
    browser.maximizeWindow();
  }

  public static newWindow(url: string, name?: string, features?: string): void {
    browser.newWindow(url, name, features);
  }

  public static back(): void {
    browser.back();
  }

  public static forward(): void {
    browser.forward();
  }

  public static refresh(): void {
    browser.refresh();
  }

  public static pause(milliseconds: number): void {
    browser.pause(milliseconds);
  }

  public static pressKeys(...keys: string[]): void {
    browser.keys(keys);
  }

  public static setCookie(cookieName: string, cookieValue: string): void {
    browser.setCookies({
      name: cookieName,
      value: cookieValue
    });
  }

  public static setWindowSize(screenWidth: string, screenHeight: string): void {
    browser.setWindowSize(
      parseInt(screenWidth, 10),
      parseInt(screenHeight, 10)
    );
  }

  public static sendAlertText(text: string): void {
    browser.sendAlertText(text);
  }

  public static switchToFrame(element: WebElement): void {
    browser.switchToFrame(element.existing$());
  }

  public static switchToParentFrame(): void {
    browser.switchToParentFrame();
  }

  public static url(url: string): void {
    browser.url(url);
  }

  public static checkAjaxRequestsMatchRef(filename: string, prefilter?: PreFilterFunction, reverse?: boolean): void {
    new BrowserConditions()
      .ajaxRequestsMatch(filename, prefilter, reverse)
      .runStrict();
  }

  public static checkCookieContains(cookie: string, expected: string, reverse?: boolean): void {
    new BrowserConditions()
      .cookieContains(cookie, expected, reverse)
      .runStrict();
  }

  public static checkCookieEquals(cookie: string, expected: string, reverse?: boolean): void {
    new BrowserConditions()
      .cookieEquals(cookie, expected, reverse)
      .runStrict();
  }

  public static checkCookieExists(cookie: string, reverse?: boolean): void {
    new BrowserConditions()
      .cookieExists(cookie, reverse)
      .runStrict();
  }

  public static checkCountEquals(expected: number, reverse?: boolean): void {
    new BrowserConditions()
      .countEquals(expected, reverse)
      .runStrict();
  }

  public static checkCountGreaterThan(expected: number, reverse?: boolean): void {
    new BrowserConditions()
      .countGreaterThan(expected, reverse)
      .runStrict();
  }

  public static checkCountLessThan(expected: number, reverse?: boolean): void {
    new BrowserConditions()
      .countLessThan(expected, reverse)
      .runStrict();
  }

  public static checkTitleContains(expected: string, reverse?: boolean): void {
    new BrowserConditions()
      .titleContains(expected, reverse)
      .runStrict();
  }

  public static checkTitleEquals(expected: string, reverse?: boolean): void {
    new BrowserConditions()
      .titleEquals(expected, reverse)
      .runStrict();
  }

  public static checkUrlContains(expected: string, reverse?: boolean): void {
    new BrowserConditions()
      .urlContains(expected, reverse)
      .runStrict();
  }

  public static checkUrlEquals(expected: string, reverse?: boolean): void {
    new BrowserConditions()
      .urlEquals(expected, reverse)
      .runStrict();
  }

  public static checkUrlPathContains(expected: string, reverse?: boolean): void {
    new BrowserConditions()
      .urlPathContains(expected, reverse)
      .runStrict();
  }

  public static checkUrlPathEquals(expected: string, reverse?: boolean): void {
    new BrowserConditions()
      .urlPathEquals(expected, reverse)
      .runStrict();
  }
}
