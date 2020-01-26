import { PreFilterFunction } from "deep-diff";
import { Response } from "request";

import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult, IHttpRequest } from "../../interfaces";
import { getJSONDiff, isJSON, sendSyncRequest } from "../../utils";

export default class HttpResponseMatch implements IBrowserCondition {
  readonly name: string;

  private readonly request: IHttpRequest;

  private readonly filename: string;

  private readonly reverse: boolean;

  private readonly prefilter: any;

  public constructor(request: IHttpRequest, filename: string, reverse: boolean, prefilter?: PreFilterFunction) {
    this.name = logger.getCaller(true);
    this.request = request;
    this.filename = filename;
    this.reverse = reverse;
    this.prefilter = prefilter;
  }

  public evaluate(): IExpectedConditionResult {
    let response: Response;
    let actual: string;
    let result: boolean;

    try {
      response = sendSyncRequest(this.request).response;
      actual = getJSONDiff(
        "httpResponse",
        this.filename,
        {
          statusCode: response.statusCode,
          body: isJSON(response.body) ? JSON.parse(response.body) : response.body
        },
        this.prefilter
      );
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
