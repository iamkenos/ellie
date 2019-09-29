import * as logger from "../../../logger";
import { ImageCompareContext } from "../../enums";
import { IElementCondition, IExpectedConditionResult, IImageCompareOptions } from "../../interfaces";
import { getImageDiff } from "../../utils";

export default class ImageMatch implements IElementCondition {
  readonly name: string;

  private readonly context: ImageCompareContext;

  private readonly filename: string;

  private readonly reverse: boolean;

  private readonly options: IImageCompareOptions;

  public constructor(filename: string, reverse: boolean, options?: IImageCompareOptions) {
    this.name = logger.getCallerFunc(true);
    this.context = ImageCompareContext.ELEMENT;
    this.filename = filename;
    this.reverse = reverse;
    this.options = options;
  }

  public evaluate(selector: string): IExpectedConditionResult {
    let actual: any;
    let result: boolean;

    try {
      actual = getImageDiff(this.filename, { context: this.context, options: this.options, element: $(selector) });
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
  Expected: ${this.reverse ? "No " : ""}Difference
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
