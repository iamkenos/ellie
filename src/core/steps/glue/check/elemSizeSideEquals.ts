import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (page: string, key: string, preferred: string, expected: string, side: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);

  if (side === "broad") {
    element.checkSizeWidthEquals(parseInt(expected), !preferred);
  } else if (side === "tall") {
    element.checkSizeHeightEquals(parseInt(expected), !preferred);
  }
};
