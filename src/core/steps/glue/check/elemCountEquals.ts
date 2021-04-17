import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (page: string, key: string, preferred: string, expected: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  element.checkCountEquals(parseInt(expected), !preferred);
};
