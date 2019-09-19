import * as logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class AxisLocationEquals implements IElementCondition {
  readonly name: string;

  private readonly axis: WebdriverIO.LocationParam;

  private readonly expected: number;

  private readonly reverse: boolean;

  public constructor(axis: WebdriverIO.LocationParam, expected: number, reverse: boolean) {
    this.name = logger.getCallerFunc(true);
    this.axis = axis;
    this.expected = expected;
    this.reverse = reverse;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: number;
    let result: boolean;

    try {
      actual = $(selector).getLocation(this.axis);
      result = this.reverse ? actual !== this.expected : actual === this.expected;
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.reverse ? "Not " : ""}${this.axis.toUpperCase()}-${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
