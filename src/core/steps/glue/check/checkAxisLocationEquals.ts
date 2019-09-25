import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, axis: WebdriverIO.LocationParam, reverse: string, expected: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);
  element.checkAxisLocationEquals(axis, parseFloat(expected), !!reverse);
};