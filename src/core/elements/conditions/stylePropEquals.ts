import logger from "../../../logger";
import { stringToObject } from "../../utils";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class StylePropEquals implements IElementCondition {
  readonly name: string;

  private readonly attribute = "style";

  private readonly prop: string;

  private readonly expected: string;

  private readonly preferred: boolean;

  public constructor(prop: string, expected: string, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.prop = prop;
    this.expected = expected;
    this.preferred = preferred;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      const style: any = stringToObject($(selector).getAttribute(this.attribute));
      actual = style[this.prop];
      result = this.preferred ? actual === this.expected : actual !== this.expected;
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.preferred ? "" : "(Reversed) "}${this.name}
  Style Prop: ${this.prop}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
