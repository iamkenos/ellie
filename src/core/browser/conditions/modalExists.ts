import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class ModalExists implements IBrowserCondition {
  readonly name: string;

  private readonly expected: any;

  private readonly reverse: boolean;

  public constructor(reverse: boolean) {
    this.name = logger.getCaller(true);
    this.expected = null;
    this.reverse = reverse;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      actual = browser.getAlertText();
      result = this.reverse ? actual === this.expected : actual !== this.expected;
    } catch (e) {
      actual = e.message;
      result = false;
      if (e.message.includes("no such alert")) result = true;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.reverse ? "Not " : ""}${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
