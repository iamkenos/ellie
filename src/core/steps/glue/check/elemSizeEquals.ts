import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (page: string, key: string, preferred: string, width: string, height: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);
  element.checkSizeEquals(parseInt(width), parseInt(height), !preferred);
};
