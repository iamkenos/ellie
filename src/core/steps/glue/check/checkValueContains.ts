import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, preferred: string, expected: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);
  element.checkValueContains(expected, !preferred);
};
