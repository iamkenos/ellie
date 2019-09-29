import * as logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";
import { compareJSON } from "../../utils";

export default class AjaxRequestMatch implements IBrowserCondition {
  readonly name: string;

  private readonly cookie: string;

  private readonly filename: string;

  private readonly reverse: boolean;

  private readonly prefilter: any;

  public constructor(filename: string, prefilter: any, reverse: boolean) {
    this.name = logger.getCallerFunc(true);
    this.filename = filename;
    this.prefilter = prefilter;
    this.reverse = reverse;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      actual = (browser as any).getRequests();
      result = compareJSON("ajaxRequests", this.filename, actual, this.prefilter);
      result = this.reverse ? !result : result;
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
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
