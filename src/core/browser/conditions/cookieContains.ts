import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class CookieContains implements IBrowserCondition {
  readonly name: string;

  private readonly cookie: string;

  private readonly expected: string;

  private readonly reverse: boolean;

  public constructor(cookie: string, expected: string, reverse: boolean) {
    this.name = logger.getCaller(true);
    this.cookie = cookie;
    this.expected = expected;
    this.reverse = reverse;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      actual = browser.getNamedCookie(this.cookie).value;
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
  Cookie: ${this.cookie}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
