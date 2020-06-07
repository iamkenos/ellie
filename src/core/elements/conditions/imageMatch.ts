import { WdioCheckElementMethodOptions } from "wdio-image-comparison-service";

import logger from "../../../logger";
import { ImageCompareContext } from "../../enums";
import { IElementCondition, IExpectedConditionResult } from "../../interfaces";
import { getImageDiff } from "../../utils";

export default class ImageMatch implements IElementCondition {
  readonly name: string;

  private readonly context: ImageCompareContext;

  private readonly filename: string;

  private readonly preferred: boolean;

  private readonly options: WdioCheckElementMethodOptions;

  public constructor(filename: string, preferred: boolean, options?: WdioCheckElementMethodOptions) {
    this.name = logger.getCaller(true);
    this.context = ImageCompareContext.ELEMENT;
    this.filename = filename;
    this.preferred = preferred;
    this.options = options;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: any;
    let result: boolean;

    try {
      actual = getImageDiff(this.filename, { context: this.context, options: this.options, element: $(selector) });
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
