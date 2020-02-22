import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class TextContains implements IElementCondition {
  readonly name: string;

  private readonly expected: string;

  private readonly preferred: boolean;

  public constructor(expected: string, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.expected = expected;
    this.preferred = preferred;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      actual = $(selector).getText();
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
