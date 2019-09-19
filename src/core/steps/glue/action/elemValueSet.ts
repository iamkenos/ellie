import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (action: string, value: string, key: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  if (action === "type") {
    element.setValue(value);
  } else if (action === "append") {
    element.addValue(value);
  }
};
