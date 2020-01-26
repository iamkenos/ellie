import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class UrlPathContains implements IBrowserCondition {
  readonly name: string;

  private readonly expected: string;

  private readonly reverse: boolean;

  public constructor(expected: string, reverse: boolean) {
    this.name = logger.getCaller(true);
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
      result = this.reverse ? !actual.includes(this.expected) : actual.includes(this.expected);
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
