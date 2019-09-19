import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, reverse: string, expected: string, side: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  if (side === "broad") {
    element.checkSizeWidthEquals(parseInt(expected), !!reverse);
  } else if (side === "tall") {
    element.checkSizeHeightEquals(parseInt(expected), !!reverse);
  }
};
