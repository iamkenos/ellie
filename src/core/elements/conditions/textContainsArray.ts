import * as logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class TextContainsArray implements IElementCondition {
  readonly name: string;

  private readonly expected: string[];

  private readonly reverse: boolean;

  public constructor(expected: string[], reverse: boolean) {
    this.name = logger.getCallerFunc(true);
    this.expected = expected;
    this.reverse = reverse;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: string[];
    let result: boolean;

    try {
      actual = $$(selector).map(e => e.getText());
      result = this.reverse ? !this.expected.every(item => actual.includes(item))
        : this.expected.every(item => actual.includes(item));
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
  Expected: \n${this.expected.map((i: string) => `    ${i}`).join("\n")}
  Actual: \n${actual.map((i: string) => `    ${i}`).join("\n")}
  `,
      isSuccess: result
    };
  }
}
