import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (action: string, page: string, key: string, value: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);

  if (action === "type") {
    element.setValue(value);
  } else if (action === "append") {
    element.addValue(value);
  }
};
