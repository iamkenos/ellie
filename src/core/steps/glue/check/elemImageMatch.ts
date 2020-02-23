import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (page: string, key: string, preferred: string, filename: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);
  element.checkImageMatchRef(filename, !preferred);
};
