import * as logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class Selected implements IElementCondition {
  readonly name: string;

  private readonly expected: boolean;

  private readonly reverse: boolean;

  public constructor(reverse: boolean) {
    this.name = logger.getCallerFunc(true);
    this.expected = !reverse;
    this.reverse = reverse;
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
  Condition: ${this.reverse ? "Not " : ""}${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.reverse ? !this.expected : this.expected}
  Actual: ${this.reverse ? !actual : actual}
  `,
      isSuccess: result
    };
  }
}
