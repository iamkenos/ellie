import logger from "../../../logger";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";

export default class TextEqualsArray implements IElementCondition {
  readonly name: string;

  private readonly expected: string[];

  private readonly preferred: boolean;

  public constructor(expected: string[], preferred: boolean) {
    this.name = logger.getCaller(true);
    this.expected = expected;
    this.preferred = preferred;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: string[];
    let result: boolean;

    try {
      actual = $$(selector).map(e => e.getText());
      result = this.preferred ? JSON.stringify(actual) === JSON.stringify(this.expected)
        : JSON.stringify(actual) !== JSON.stringify(this.expected);
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.preferred ? "" : "(Reversed) "}${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: \n${this.expected.map((i: string) => `    ${i}`).join("\n")}
  Actual: \n${actual.map((i: string) => `    ${i}`).join("\n")}
  `,
      isSuccess: result
    };
  }
}
