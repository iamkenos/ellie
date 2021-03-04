import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";
import { TElementLocation } from "../../../interfaces";

export default (page: string, key: string, axis: TElementLocation, preferred: string, expected: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);
  element.checkAxisLocationEquals(axis, parseFloat(expected), !preferred);
};
