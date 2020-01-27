import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class AttributeExists implements IElementCondition {
  readonly name: string;

  private readonly attribute: string;

  private readonly expected: boolean;

  private readonly reverse: boolean;

  public constructor(attribute: string, reverse: boolean) {
    this.name = logger.getCaller(true);
    this.attribute = attribute;
    this.expected = !reverse;
    this.reverse = reverse;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      actual = !!$(selector).getAttribute(this.attribute);
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
  Attribute: ${this.attribute}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
