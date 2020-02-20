import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (action: string, type: string, key: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  if (type === "link") {
    element.selector = `=${key}`;
  }

  if (action === "double") {
    element.doubleClick();
  } else if (action === "script") {
    element.jsClick();
  } else if (action === "middle") {
    element.click({ button: action });
  } else if (action === "right") {
    element.click({ button: action });
  } else {
    element.click();
  }
};
