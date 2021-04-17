import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (context: string, value: string, page: string, key: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);

  if (context === "index") {
    element.selectByIndex(parseInt(value));
  } else if (context === "label") {
    element.selectByVisibleText(value);
  } else {
    element.selectByAttribute(context, value);
  }
};
