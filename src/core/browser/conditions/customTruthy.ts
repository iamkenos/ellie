import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";
import { normalizeFunctionName } from "../../../logger/utils";

export default class CustomTruthy implements IBrowserCondition {
  readonly name: string;

  private readonly truthy: Function;

  private readonly reverse: boolean;

  public constructor(truthy: Function, reverse: boolean) {
    this.name = normalizeFunctionName(truthy.name) || logger.getCaller(true);
    this.truthy = truthy;
    this.reverse = reverse;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: boolean;
    let result: boolean;

    try {
      actual = this.truthy();
      result = this.reverse ? !actual : actual;
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
  Expected: ${!this.reverse}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
