import { AssertionError } from "chai";

import * as logger from "../../../logger";
import {
  AjaxRequestsMatch,
  CookieContains,
  CookieEquals,
  CookieExists,
  CountEquals,
  CountGreaterThan,
  CountLessThan,
  TitleContains,
  TitleEquals,
  UrlContains,
  UrlEquals,
  UrlPathContains,
  UrlPathEquals
} from "../conditions";
import { IBrowserCondition } from "../../interfaces";
import BrowserConditionsResult from "./browserConditionsResult";

const WAIT_TIMEOUT: number = (browser as any).config.waitforTimeout;

export default class BrowserConditions {
  private readonly conditions: IBrowserCondition[];

  private readonly name: string;

  private readonly result: BrowserConditionsResult;

  private readonly selector: string;

  public constructor(name? : string) {
    this.conditions = [];
    this.name = name || logger.getCallerFunc();
    this.result = new BrowserConditionsResult();
  }

  public ajaxRequestsMatch(filename: string, prefilter = undefined, reverse = false): BrowserConditions {
    this.conditions.push(new AjaxRequestsMatch(filename, prefilter, reverse));
    return this;
  }

  public cookieContains(cookie: string, expected: string, reverse = false): BrowserConditions {
    this.conditions.push(new CookieContains(cookie, expected, reverse));
    return this;
  }

  public cookieEquals(cookie: string, expected: string, reverse = false): BrowserConditions {
    this.conditions.push(new CookieEquals(cookie, expected, reverse));
    return this;
  }

  public cookieExists(cookie: string, reverse = false): BrowserConditions {
    this.conditions.push(new CookieExists(cookie, reverse));
    return this;
  }

  public countEquals(expected: number, reverse = false): BrowserConditions {
    this.conditions.push(new CountEquals(expected, reverse));
    return this;
  }

  public countGreaterThan(expected: number, reverse = false): BrowserConditions {
    this.conditions.push(new CountGreaterThan(expected, reverse));
    return this;
  }

  public countLessThan(expected: number, reverse = false): BrowserConditions {
    this.conditions.push(new CountLessThan(expected, reverse));
    return this;
  }

  public titleContains(expected: string, reverse = false): BrowserConditions {
    this.conditions.push(new TitleContains(expected, reverse));
    return this;
  }

  public titleEquals(expected: string, reverse = false): BrowserConditions {
    this.conditions.push(new TitleEquals(expected, reverse));
    return this;
  }

  public urlContains(expected: string, reverse = false): BrowserConditions {
    this.conditions.push(new UrlContains(expected, reverse));
    return this;
  }

  public urlEquals(expected: string, reverse = false): BrowserConditions {
    this.conditions.push(new UrlEquals(expected, reverse));
    return this;
  }

  public urlPathContains(expected: string, reverse = false): BrowserConditions {
    this.conditions.push(new UrlPathContains(expected, reverse));
    return this;
  }

  public urlPathEquals(expected: string, reverse = false): BrowserConditions {
    this.conditions.push(new UrlPathEquals(expected, reverse));
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
          this.result.isSuccess() || logger.trace("Retrying...");
          return this.result.isSuccess();
        },
        timeout
      );
      return this.result;
    } catch (e) {
      throw new AssertionError(this.result.getErrorMessage(this.name, this.conditions, timeout));
    }
  }
}
