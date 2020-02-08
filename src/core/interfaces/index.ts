import { CoreOptions, Response, UrlOptions } from "request";
import { ImageCompareContext } from "../enums";

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

export interface IExpectedConditionResult {
  name: string;
  message: string;
  isSuccess: boolean;
}

export interface IImageCompareOptions {
  disableCSSAnimation?: boolean;
  hideScrollBars?: boolean;
  hideElements?: WebdriverIO.Element[];
  removeElements?: WebdriverIO.Element[];
  resizeDimensions?: { top: number; right: number; bottom: number; left: number };
  fullPageScrollTimeout?: number;
  hideAfterFirstScroll?: WebdriverIO.Element[];
  blockOut?: { height: number; width: number; x: number; y: number }[];
  ignoreAlpha?: boolean;
  blockOutStatusBar?: boolean;
  blockOutToolBar?: boolean;
  ignoreAntialiasing?: boolean;
  ignoreColors?: boolean;
  ignoreLess?: boolean;
  ignoreNothing?: boolean;
  ignoreTransparentPixel?: boolean;
  rawMisMatchPercentage?: boolean;
  returnAllCompareData?: boolean;
  saveAboveTolerance?: boolean;
  largeImageThreshold?: number;
}

export interface IImageCompare {
  context: ImageCompareContext;
  options?: IImageCompareOptions;
  element?: WebdriverIO.Element;
}

export interface IImageSave {
  parsedName: string;
  fileName: string;
  path: string;
  devicePixelRatio: number;
}

export interface IImageCompareResult {
  misMatchPercentage?: number;
}
