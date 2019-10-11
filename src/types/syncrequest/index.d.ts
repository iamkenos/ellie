/// <reference types="node" />

declare module "syncrequest" {
  import { CoreOptions, UrlOptions, Response } from "request";
  interface IHttpResponse {
    error: any;
    response: Response;
  }

  export function sync(options: CoreOptions & UrlOptions): IHttpResponse;
}
