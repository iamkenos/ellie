import { AssertionError } from "chai";
import { PreFilterFunction } from "deep-diff";
import { WdioCheckFullPageMethodOptions, WdioCheckScreenMethodOptions } from "wdio-image-comparison-service";

import BrowserConditionsResult from "./browserConditionsResult";
import logger from "../../../logger";
import {
  AjaxRequestsMatch,
  CookieContains,
  CookieEquals,
  CookieExists,
  CountEquals,
  CountGreaterThan,
  CountLessThan,
  CustomTruthy,
  HttpResponseMatch,
  ImageMatch,
  ModalExists,
  ModalTextContains,
  ModalTextEquals,
  TitleContains,
  TitleEquals,
  UrlContains,
  UrlEquals,
  UrlPathContains,
  UrlPathEquals
} from "../conditions";
import { IBrowserCondition, IHttpRequest } from "../../interfaces";

const WAIT_TIMEOUT: number = browser.config.waitforTimeout;

export default class BrowserConditions {
  private readonly conditions: IBrowserCondition[];

  private readonly name: string;

  private readonly result: BrowserConditionsResult;

  private readonly selector: string;

  public constructor(name? : string) {
    this.conditions = [];
    this.name = name || logger.getCaller();
    this.result = new BrowserConditionsResult();
  }

  public ajaxRequestsMatch(filename: string, preferred: boolean, prefilter: PreFilterFunction): BrowserConditions {
    this.conditions.push(new AjaxRequestsMatch(filename, preferred, prefilter));
    return this;
  }

  public cookieContains(cookie: string, expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new CookieContains(cookie, expected, preferred));
    return this;
  }

  public cookieEquals(cookie: string, expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new CookieEquals(cookie, expected, preferred));
    return this;
  }

  public cookieExists(cookie: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new CookieExists(cookie, preferred));
    return this;
  }

  public countEquals(expected: number, preferred: boolean): BrowserConditions {
    this.conditions.push(new CountEquals(expected, preferred));
    return this;
  }

  public countGreaterThan(expected: number, preferred: boolean): BrowserConditions {
    this.conditions.push(new CountGreaterThan(expected, preferred));
    return this;
  }

  public customTruthy(truthy: Function, preferred: boolean): BrowserConditions {
    this.conditions.push(new CustomTruthy(truthy, preferred));
    return this;
  }

  public countLessThan(expected: number, preferred: boolean): BrowserConditions {
    this.conditions.push(new CountLessThan(expected, preferred));
    return this;
  }

  public httpResponseMatch(
    request: IHttpRequest, filename: string, preferred: boolean, prefilter: PreFilterFunction): BrowserConditions {
    this.conditions.push(new HttpResponseMatch(request, filename, preferred, prefilter));
    return this;
  }

  public imageMatch(
    context: string, filename: string, preferred: boolean,
    options?: WdioCheckFullPageMethodOptions | WdioCheckScreenMethodOptions): BrowserConditions {
    this.conditions.push(new ImageMatch(context, filename, preferred, options));
    return this;
  }

  public modalExists(preferred: boolean): BrowserConditions {
    this.conditions.push(new ModalExists(preferred));
    return this;
  }

  public modalTextContains(expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new ModalTextContains(expected, preferred));
    return this;
  }

  public modalTextEquals(expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new ModalTextEquals(expected, preferred));
    return this;
  }

  public titleContains(expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new TitleContains(expected, preferred));
    return this;
  }

  public titleEquals(expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new TitleEquals(expected, preferred));
    return this;
  }

  public urlContains(expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new UrlContains(expected, preferred));
    return this;
  }

  public urlEquals(expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new UrlEquals(expected, preferred));
    return this;
  }

  public urlPathContains(expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new UrlPathContains(expected, preferred));
    return this;
  }

  public urlPathEquals(expected: string, preferred: boolean): BrowserConditions {
    this.conditions.push(new UrlPathEquals(expected, preferred));
    return this;
  }

  public run(timeout: number = WAIT_TIMEOUT): BrowserConditionsResult {
    try {
      return this.runStrict(timeout);
    } catch (e) {
      logger.warn(e.message);
      return this.result;
    }
  }

  public runStrict(timeout: number = WAIT_TIMEOUT): BrowserConditionsResult {
    try {
      logger.debug("Evaluating %s...", this.name);
      browser.waitUntil(
        (): boolean => {
          this.conditions.forEach(condition => {
            const evaluation = condition.evaluate();
            this.result.setResult(evaluation.name, evaluation);
          });
          this.result.isSuccess() || logger.debug("Retrying...");
          return this.result.isSuccess();
        },
        { timeout }
      );
      return this.result;
    } catch (e) {
      throw new AssertionError(this.result.getErrorMessage(this.name, this.conditions, timeout));
    }
  }
}
