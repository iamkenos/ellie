import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (page: string, key: string, x: string, y: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);
  const xOffset = parseInt(x, 10) || undefined;
  const yOffset = parseInt(y, 10) || undefined;

  element.moveTo({ xOffset, yOffset });
};
