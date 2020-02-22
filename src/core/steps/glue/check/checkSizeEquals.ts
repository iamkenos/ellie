import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, preferred: string, width: string, height: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);
  element.checkSizeEquals(parseInt(width), parseInt(height), !preferred);
};
