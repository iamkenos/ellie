import { WebElement } from "../../..";
import { getMetaElement } from "../../../utils";

export default (
  page: string, key: string, type: string, preferred: string, protocol: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  const attribute = "target";

  if (type !== "link") {
    element.selector = `=${key}`;
  }

  switch (protocol) {
    case "new window": {
      element.checkAttributeEquals(attribute, "_blank", !preferred);
      break;
    }
    case "same frame": {
      element.checkAttributeEquals(attribute, "_self", !preferred);
      break;
    }
    case "parent frame": {
      element.checkAttributeEquals(attribute, "_parent", !preferred);
      break;
    }
    case "top frame": {
      element.checkAttributeEquals(attribute, "_top", !preferred);
      break;
    }
    case "without a target": {
      element.checkAttributeExists(attribute, !!preferred);
      break;
    }
  }
};
