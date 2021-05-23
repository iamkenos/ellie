import { WebElement } from "../../../";
import { getMetaElement } from "../../../utils";

export default (
  page: string, key: string, type: string, preferred: string, expected: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  const attribute = "target";

  if (type !== "link") {
    element.selector = `=${key}`;
  }

  element.checkAttributeEquals(attribute, expected, !preferred);
};
