import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (action: string, key: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  if (action === "select") {
    element.isSelected(false) && element.click();
  } else if (action === "deselect") {
    element.isSelected() && element.click();
  }
};
