import { Response } from "request";

import logger from "../../../logger";
import { IBrowserCondition, IExpectedConditionResult, IHttpRequest, IJSONDiffOptions } from "../../interfaces";
import { getJSONDiff, isJSON, sendSyncRequest } from "../../utils";

export default class HttpResponseMatch implements IBrowserCondition {
  readonly name: string;

  private readonly request: IHttpRequest;

  private readonly filename: string;

  private readonly preferred: boolean;

  private readonly options: IJSONDiffOptions;

  public constructor(request: IHttpRequest, filename: string, preferred: boolean, options?: IJSONDiffOptions) {
    this.name = logger.getCaller(true);
    this.request = request;
    this.filename = filename;
    this.preferred = preferred;
    this.options = options;
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
        this.options
      );
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
