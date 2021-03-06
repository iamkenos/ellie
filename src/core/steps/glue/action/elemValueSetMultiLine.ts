import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (action: string, page: string, key: string, value: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);

  if (action === "type") {
    element.setValue(value);
  } else if (action === "append") {
    element.addValue(value);
  }
};
