import { WebElement, WebElements } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (context: string, value: string, key: string, reverse: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);
  const options = new WebElements(element.child$("//option").selector);

  if (context === "index") {
    options.toArray()[parseInt(value)].checkSelected(!!reverse);
  } else if (context === "label") {
    options.getElementMatchingText(value).checkSelected(!!reverse);
  } else {
    options.getElementMatchingAttribute(context, value).checkSelected(!!reverse);
  }
};
