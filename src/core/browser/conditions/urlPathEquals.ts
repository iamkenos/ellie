import * as logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class UrlPathEquals implements IBrowserCondition {
  readonly name: string;

  private readonly expected: string;

  private readonly reverse: boolean;

  public constructor(expected: string, reverse: boolean) {
    this.name = logger.getCallerFunc(true);
    this.expected = expected;
    this.reverse = reverse;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      const url = browser.getUrl().replace(/http(s?):\/\//, "");
      const domain = `${url.split("/")[0]}`;
      actual = url.replace(domain, "");
      actual = browser.getUrl();
      result = this.reverse ? actual !== this.expected : actual === this.expected;
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.reverse ? "Not " : ""}${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
