import { URL } from "url";

import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class UrlPathContains implements IBrowserCondition {
  readonly name: string;

  private readonly expected: string;

  private readonly preferred: boolean;

  public constructor(expected: string, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.expected = expected;
    this.preferred = preferred;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      const url = new URL(browser.getUrl());
      actual = url.pathname;
      result = this.preferred ? actual.includes(this.expected) : !actual.includes(this.expected);
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.preferred ? "" : "(Reversed) "}${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
