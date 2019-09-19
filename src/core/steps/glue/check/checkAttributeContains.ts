import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, attribute: string, reverse: string, expected: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);
  element.checkAttributeContains(attribute, expected, !!reverse);
};
