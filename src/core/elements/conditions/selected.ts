import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class Selected implements IElementCondition {
  readonly name: string;

  private readonly expected: boolean;

  private readonly preferred: boolean;

  public constructor(preferred: boolean) {
    this.name = logger.getCaller(true);
    this.expected = preferred;
    this.preferred = preferred;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      actual = $(selector).isSelected();
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
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
