import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (action: string, page: string, key: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);

  if (action === "select") {
    element.isSelected(false) && element.moveAndClick();
  } else if (action === "deselect") {
    element.isSelected() && element.moveAndClick();
  }
};
