import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (page: string, key: string, cssProp: string, preferred: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);
  element.checkCSSPropertyExists(cssProp, !preferred);
};
