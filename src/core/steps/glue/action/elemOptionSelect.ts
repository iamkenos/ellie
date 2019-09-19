import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (type: string, typeValue: string, attr: string, attrValue: string, key: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  if (type === "index") {
    element.selectByIndex(parseInt(typeValue));
  } else if (type === "label") {
    element.selectByVisibleText(typeValue);
  } else if (type === "value") {
    element.setValue(typeValue);
  } else if (attr) {
    element.selectByAttribute(attr, attrValue);
  }
};
