import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, reverse: string, filename: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);
  element.checkImageMatchRef(filename, !!reverse);
};
