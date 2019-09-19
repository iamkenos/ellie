import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (action: string, type: string, key: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  if (type === "link") {
    element.selector = `=${key}`;
  }

  if (action === "click") {
    element.click();
  } else if (action === "double click") {
    element.doubleClick();
  }
};
