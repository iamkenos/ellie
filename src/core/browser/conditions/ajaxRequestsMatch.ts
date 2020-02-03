import { PreFilterFunction } from "deep-diff";
import logger from "../../../logger";

import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";
import { getJSONDiff } from "../../utils";

export default class AjaxRequestMatch implements IBrowserCondition {
  readonly name: string;

  private readonly filename: string;

  private readonly reverse: boolean;

  private readonly prefilter: any;

  public constructor(filename: string, reverse: boolean, prefilter?: PreFilterFunction) {
    this.name = logger.getCaller(true);
    this.filename = filename;
    this.reverse = reverse;
    this.prefilter = prefilter;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: string;
    let result: boolean;

    try {
      browser.pause(1000);
      actual = (browser as any).getRequests().map((i: any) => { delete i.response.headers; return i; });
      actual = getJSONDiff("ajaxRequest", this.filename, actual, this.prefilter);
      result = this.reverse ? !!actual : !actual;
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
  Expected: ${this.reverse ? "Different" : "No Difference"}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
