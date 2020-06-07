import { WdioCheckFullPageMethodOptions, WdioCheckScreenMethodOptions } from "wdio-image-comparison-service";

import logger from "../../../logger";
import { ImageCompareContext } from "../../enums";
import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";
import { getImageDiff } from "../../utils";

export default class ImageMatch implements IBrowserCondition {
  readonly name: string;

  private readonly context: ImageCompareContext;

  private readonly filename: string;

  private readonly preferred: boolean;

  private readonly options: WdioCheckScreenMethodOptions;

  public constructor(
    context: string, filename: string, preferred: boolean,
    options?: WdioCheckFullPageMethodOptions | WdioCheckScreenMethodOptions) {
    this.name = logger.getCaller(true);
    this.context = ImageCompareContext[context.toUpperCase()];
    this.filename = filename;
    this.preferred = preferred;
    this.options = options;
  }

  public evaluate(): IExpectedConditionResult {
    let actual: any;
    let result: boolean;

    try {
      actual = getImageDiff(this.filename, { context: this.context, options: this.options });
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
