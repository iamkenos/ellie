import { Selector } from "webdriverio";
import { CoreOptions, Response, UrlOptions } from "request";
import { ImageCompareContext } from "../enums";
import { WdioCheckElementMethodOptions, WdioCheckFullPageMethodOptions, WdioCheckScreenMethodOptions } from "wdio-image-comparison-service";
import { ScreenshotOutput } from "webdriver-image-comparison/build/helpers/afterScreenshot.interfaces";
import { PreFilterFunction } from "deep-diff";

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type TElementCoordinates = "x" | "y"

export type TElementSize = { width?: number; height?: number; }

export type TElementLocation = { x: number; y: number; }

export interface IBrowserCondition {
  name: string;
  evaluate(): IExpectedConditionResult;
}

export interface IElementCondition {
  name: string;
  evaluate(selector: Selector): IExpectedConditionResult;
}

export interface IHttpResponse {
  error: any;
  response: Response;
}

export interface IHttpRequest {
  options: CoreOptions & UrlOptions;
}

type TPageMetaProps = { url: string; title: string; locators: { [key: string]: string }, [key: string]: any }

type TComponentMetaProps = { locators: { [key: string]: string }, [key: string]: any }

export interface IPageMeta {
  default: TPageMetaProps,
  [key: string]: Partial<TPageMetaProps>
}

export interface IComponentMeta {
  default: TComponentMetaProps,
  [key: string]: TComponentMetaProps,
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

export interface IImageSave extends ScreenshotOutput {
  parsedName: string;
}

export interface IJSONDiffOptions {
  regex?: {
    paths: string[],
    expressions: string[]
  };
  prefilter?: PreFilterFunction;
}

export interface IBrowserPerformanceEntry {
  cancelable?: boolean;
  connectEnd?: number;
  connectStart?: number;
  decodedBodySize?: number;
  domainLookupEnd?: number;
  domainLookupStart?: number;
  duration?: number;
  encodedBodySize?: number;
  entryType?: string;
  fetchStart?: number;
  initiatorType: "css" | "xmlhttprequest" | "img" | "navigation" | "link" | "script";
  name: string;
  nextHopProtocol?: string;
  redirectEnd?: number;
  redirectStart?: number;
  requestStart?: number;
  responseEnd?: number;
  responseStart?: number;
  secureConnectionStart?: number;
  serverTiming?: number[];
  startTime?: number;
  transferSize?: number;
  workerStart?: number;
  workerTiming?: number[];
}

export interface ICustomTruthy {
  actual: any,
  expected: any,
  result: boolean
}
