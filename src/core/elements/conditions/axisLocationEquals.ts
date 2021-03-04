import { DragAndDropCoordinate } from "webdriverio/build";
import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult, TElementLocation } from "../../interfaces";
export default class AxisLocationEquals implements IElementCondition {
  readonly name: string;

  private readonly axis: TElementLocation;

  private readonly expected: number;

  private readonly preferred: boolean;

  public constructor(axis: TElementLocation, expected: number, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.axis = axis;
    this.expected = expected;
    this.preferred = preferred;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: number | DragAndDropCoordinate;
    let result: boolean;

    try {
      actual = $(selector).getLocation(this.axis);
      result = this.preferred ? actual === this.expected : actual !== this.expected;
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.preferred ? "Not " : ""}${this.axis.toUpperCase()}-${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
