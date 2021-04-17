import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";
import { TElementCoordinates } from "../../../interfaces";

export default (page: string, key: string, axis: TElementCoordinates, preferred: string, expected: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  element.checkAxisLocationEquals(axis, parseFloat(expected), !preferred);
};
