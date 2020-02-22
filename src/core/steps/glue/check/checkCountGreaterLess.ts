import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, preferred: string, type: string, expected: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  if (type === "greater") {
    element.checkCountGreaterThan(parseInt(expected), !preferred);
  } else if (type === "less") {
    element.checkCountLessThan(parseInt(expected), !preferred);
  }
};
