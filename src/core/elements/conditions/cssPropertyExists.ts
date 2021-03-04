import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class CSSPropertyExists implements IElementCondition {
  readonly name: string;

  private readonly cssProperty: string;

  private readonly expected: boolean;

  private readonly preferred: boolean;

  public constructor(cssProperty: string, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.cssProperty = cssProperty;
    this.expected = preferred;
    this.preferred = preferred;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      const prop = $(selector).getCSSProperty(this.cssProperty);
      actual = prop.value !== "" && prop.parsed !== {};
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
  CSS Property: ${this.cssProperty}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
