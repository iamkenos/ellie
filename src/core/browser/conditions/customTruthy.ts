import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";
import { normalizeFunctionName } from "../../../logger/utils";

export default class CustomTruthy implements IBrowserCondition {
  readonly name: string;

  private readonly truthy: Function;

  private readonly expected: boolean;

  private readonly preferred: boolean;

  public constructor(truthy: Function, preferred: boolean) {
    this.name = normalizeFunctionName(truthy.name) || logger.getCaller(true);
    this.truthy = truthy;
    this.expected = preferred;
    this.preferred = preferred;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      actual = this.truthy();
      result = this.preferred ? actual : !actual;
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
