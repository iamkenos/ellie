import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (action: string, page: string, key: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);

  if (action === "select") {
    element.isSelected(false) && element.moveAndClick();
  } else if (action === "deselect") {
    element.isSelected() && element.moveAndClick();
  }
};
