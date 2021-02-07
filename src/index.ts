import { IConfig } from "./cli/interfaces";
import { BasePage, driver, RETRY, WebComponent, WebElement, WebElements } from "./core";
import { ICustomTruthy } from "./core/interfaces";
import { mergeMeta } from "./core/utils";
import logger from "./logger";

export {
  driver,
  logger,
  BasePage,
  mergeMeta,
  RETRY,
  WebComponent,
  WebElement,
  WebElements,
  IConfig,
  ICustomTruthy
};
