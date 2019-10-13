import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (context: string, value: string, key: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  if (context === "index") {
    element.selectByIndex(parseInt(value));
  } else if (context === "label") {
    element.selectByVisibleText(value);
  } else {
    element.selectByAttribute(context, value);
  }
};
