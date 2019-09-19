import * as logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class CookieExists implements IBrowserCondition {
  readonly name: string;

  private readonly cookie: string;

  private readonly expected: boolean;

  private readonly reverse: boolean;

  public constructor(cookie: string, reverse: boolean) {
    this.name = logger.getCallerFunc(true);
    this.cookie = cookie;
    this.expected = !reverse;
    this.reverse = reverse;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      actual = !!browser.getNamedCookie(this.cookie);
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
  Cookie: ${this.cookie}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.reverse ? !this.expected : this.expected}
  Actual: ${this.reverse ? !actual : actual}
  `,
      isSuccess: result
    };
  }
}
