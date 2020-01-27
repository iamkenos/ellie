import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class CSSPropertyExists implements IElementCondition {
  readonly name: string;

  private readonly cssProperty: string;

  private readonly expected: boolean;

  private readonly reverse: boolean;

  public constructor(cssProperty: string, reverse: boolean) {
    this.name = logger.getCaller(true);
    this.cssProperty = cssProperty;
    this.expected = !reverse;
    this.reverse = reverse;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      actual = !!$(selector).getCSSProperty(this.cssProperty);
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
  CSS Property: ${this.cssProperty}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
