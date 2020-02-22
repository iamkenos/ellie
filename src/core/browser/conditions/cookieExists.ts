import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class CookieExists implements IBrowserCondition {
  readonly name: string;

  private readonly cookie: string;

  private readonly expected: boolean;

  private readonly preferred: boolean;

  public constructor(cookie: string, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.cookie = cookie;
    this.expected = preferred;
    this.preferred = preferred;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      actual = !!browser.getCookies([this.cookie])[0];
      result = actual === this.expected;
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
