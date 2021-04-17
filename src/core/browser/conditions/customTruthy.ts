import logger from "../../../logger";
import { IBrowserCondition, ICustomTruthy, IExpectedConditionResult } from "../../interfaces";
import { normalizeFunctionName } from "../../../logger/utils";

export default class CustomTruthy implements IBrowserCondition {
  readonly name: string;

  private readonly truthy: Function;

  private readonly preferred: boolean;

  public constructor(truthy: Function, preferred: boolean) {
    this.name = normalizeFunctionName(truthy.name) || logger.getCaller(true);
    this.truthy = truthy;
    this.preferred = preferred;
  }

  public evaluate(): IExpectedConditionResult {
    let returned: ICustomTruthy;
    let result: boolean;
    let actual: string;
    let expected: string;

    try {
      returned = this.truthy();
      actual = returned.actual;
      expected = returned.expected;
      result = this.preferred ? returned.result : !returned.result;
    } catch (e) {
      actual = e.message;
      expected = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.preferred ? "" : "(Reversed) "}${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${expected}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
