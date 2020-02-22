import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class CookieEquals implements IBrowserCondition {
  readonly name: string;

  private readonly cookie: string;

  private readonly expected: string;

  private readonly preferred: boolean;

  public constructor(cookie: string, expected: string, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.cookie = cookie;
    this.expected = expected;
    this.preferred = preferred;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      actual = browser.getCookies([this.cookie])[0].value;
      result = this.preferred ? actual === this.expected : actual !== this.expected;
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.preferred ? "" : "(Reversed) "}${this.name}
  Cookie: ${this.cookie}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
