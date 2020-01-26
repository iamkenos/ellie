import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class CountEquals implements IBrowserCondition {
  readonly name: string;

  private readonly expected: number;

  private readonly reverse: boolean;

  public constructor(expected: number, reverse: boolean) {
    this.name = logger.getCaller(true);
    this.expected = expected;
    this.reverse = reverse;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: number;
    let result: boolean;

    try {
      actual = browser.getWindowHandles().length;
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
