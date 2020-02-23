import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";
type LocationParam = WebdriverIO.LocationParam;

export default (page: string, key: string, axis: LocationParam, preferred: string, expected: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);
  element.checkAxisLocationEquals(axis, parseFloat(expected), !preferred);
};
