import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (page: string, key: string, x: string, y: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  const xOffset = parseInt(x, 10) || undefined;
  const yOffset = parseInt(y, 10) || undefined;

  element.moveTo({ xOffset, yOffset });
};
