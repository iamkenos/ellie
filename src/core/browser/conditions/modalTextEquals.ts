import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class ModalTextEquals implements IBrowserCondition {
  readonly name: string;

  private readonly expected: string;

  private readonly preferred: boolean;

  public constructor(expected: string, preferred: boolean) {
    this.name = logger.getCaller(true);
    this.expected = expected;
    this.preferred = preferred;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      actual = browser.getAlertText();
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
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
