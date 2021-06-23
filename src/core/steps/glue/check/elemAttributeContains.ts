import { WebElement } from "../../../elements";
import { getMetaElement, localizeLabel, transformToken } from "../../../utils";

export default (page: string, key: string, attribute: string, preferred: string, expected: string): void => {
  expected = transformToken(localizeLabel(page, expected));
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  element.checkAttributeContains(attribute, expected, !preferred);
};
