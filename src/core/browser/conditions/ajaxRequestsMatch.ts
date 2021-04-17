import logger from "../../../logger";

import { IBrowserCondition, IExpectedConditionResult, IJSONDiffOptions } from "../../interfaces";
import { getJSONDiff } from "../../utils";

export default class AjaxRequestMatch implements IBrowserCondition {
  readonly name: string;

  private readonly filename: string;

  private readonly preferred: boolean;

  private readonly options: IJSONDiffOptions | undefined;

  public constructor(filename: string, preferred: boolean, options?: IJSONDiffOptions) {
    this.name = logger.getCaller(true);
    this.filename = filename;
    this.preferred = preferred;
    this.options = options;
  }

  public evaluate(): IExpectedConditionResult {
    let requests: any[];
    let actual: string;
    let result: boolean;

    try {
      browser.pause(1000);
      requests = browser.getRequests().map((i: any) => { delete i.response.headers; return i; });
      actual = getJSONDiff("ajaxRequest", this.filename, requests, this.options);
      result = this.preferred ? !actual : !!actual;
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
  Expected: ${this.preferred ? "Match" : "Different"}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
