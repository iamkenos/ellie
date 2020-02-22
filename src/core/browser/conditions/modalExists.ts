import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class ModalExists implements IBrowserCondition {
  readonly name: string;

  private readonly expected: any;

  private readonly preferred: boolean;

  public constructor(preferred: boolean) {
    this.name = logger.getCaller(true);
    this.expected = preferred;
    this.preferred = preferred;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      actual = browser.getAlertText().length >= 0;
      result = actual === this.expected;
    } catch (e) {
      actual = e.message;
      result = false;
      if (e.message.includes("no such alert")) result = !this.preferred;
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
