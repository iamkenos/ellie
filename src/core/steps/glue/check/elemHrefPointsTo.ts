import { WebElement } from "../../../";
import { getMetaElement } from "../../../utils";

export default (
  page: string, key: string, type: string, preferred: string, protocol: string, expected: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  const attribute = "href";

  if (type !== "link") {
    element.selector = `=${key}`;
  }

  switch (protocol) {
    case "path":
    case "section": {
      element.checkAttributeEquals(attribute, new URL(expected, driver.config.baseUrl).href, !preferred);
      break;
    }
    case "mail": {
      element.checkAttributeEquals(attribute, `mailto:${expected}`, !preferred);
      break;
    }
    case "tel": {
      element.checkAttributeEquals(attribute, `tel:${expected}`, !preferred);
      break;
    }
    default:
      element.checkAttributeEquals(attribute, expected, !preferred);
      break;
  }
};
