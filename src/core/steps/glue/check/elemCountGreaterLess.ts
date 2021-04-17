import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (page: string, key: string, preferred: string, type: string, expected: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);

  if (type === "greater") {
    element.checkCountGreaterThan(parseInt(expected), !preferred);
  } else if (type === "less") {
    element.checkCountLessThan(parseInt(expected), !preferred);
  }
};
