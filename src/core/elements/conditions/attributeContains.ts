import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class AttributeContains implements IElementCondition {
  readonly name: string;

  private readonly attribute: string;

  private readonly expected: string;

  private readonly reverse: boolean;

  public constructor(attribute: string, expected: string, reverse: boolean) {
    this.name = logger.getCaller(true);
    this.attribute = attribute;
    this.expected = expected;
    this.reverse = reverse;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      actual = $(selector).getAttribute(this.attribute);
      result = this.reverse ? !actual.includes(this.expected) : actual.includes(this.expected);
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.reverse ? "Not " : ""}${this.name}
  Attribute: ${this.attribute}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
