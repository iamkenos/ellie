import * as logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class SizeEquals implements IElementCondition {
  readonly name: string;

  private readonly expected: string;

  private readonly reverse: boolean;

  public constructor(width: number, heigth: number, reverse: boolean) {
    this.name = logger.getCallerFunc(true);
    this.expected = `${width}px x ${heigth}px`;
    this.reverse = reverse;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      const size = $(selector).getSize();
      actual = `${size.width}px x ${size.height}px`;
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