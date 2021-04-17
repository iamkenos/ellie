import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (page: string, key: string, preferred: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  element.checkTextEmpty(!preferred);
};
