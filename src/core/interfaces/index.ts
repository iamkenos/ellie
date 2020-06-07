import { CoreOptions, Response, UrlOptions } from "request";
import { ImageCompareContext } from "../enums";
import { WdioCheckElementMethodOptions, WdioCheckFullPageMethodOptions, WdioCheckScreenMethodOptions } from "wdio-image-comparison-service";

export interface IBrowserCondition {
  name: string;
  evaluate(): IExpectedConditionResult;
}
export interface IElementCondition {
  name: string;
  evaluate(selector: string): IExpectedConditionResult;
}

export interface IHttpResponse {
  error: any;
  response: Response;
}

export interface IHttpRequest {
  options: CoreOptions & UrlOptions;
}
export interface IPageMeta {
  default: {
    url: string;
    title: string;
    locators: object;
  };
}

export interface IClickOptions {
  button?: 0 | "left" | 1 | "middle" | 2 | "right";
  x?: number;
  y?: number;
}

export interface IExpectedConditionResult {
  name: string;
  message: string;
  isSuccess: boolean;
}
export interface IImageCompare {
  context: ImageCompareContext;
  options?: WdioCheckElementMethodOptions | WdioCheckFullPageMethodOptions | WdioCheckScreenMethodOptions;
  element?: WebdriverIO.Element;
}

export interface IImageSave {
  parsedName: string;
  fileName: string;
  path: string;
  devicePixelRatio: number;
}
