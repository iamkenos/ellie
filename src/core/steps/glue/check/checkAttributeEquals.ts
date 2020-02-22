import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, attribute: string, preferred: string, expected = ""): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);
  element.checkAttributeEquals(attribute, expected, !preferred);
};
