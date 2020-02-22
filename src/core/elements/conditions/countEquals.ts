import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class CountEquals implements IElementCondition {
  readonly name: string;

  private readonly expected: number;

  private readonly preferred: boolean;

  public constructor(expected: number, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.expected = expected;
    this.preferred = preferred;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: number;
    let result: boolean;

    try {
      actual = $$(selector).length;
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
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
