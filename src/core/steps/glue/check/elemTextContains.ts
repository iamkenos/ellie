import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (page: string, key: string, preferred: string, expected: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);
  element.checkTextContains(expected, !preferred);
};
