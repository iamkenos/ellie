import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (page: string, key: string, preferred: string, width: string, height: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  element.checkSizeEquals(parseInt(width), parseInt(height), !preferred);
};
