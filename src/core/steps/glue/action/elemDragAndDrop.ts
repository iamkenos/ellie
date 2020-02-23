import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (page: string, sourceKey: string, targetKey: string): void => {
  const sourceSelector = getPageElement(page, sourceKey);
  const targetSelector = getPageElement(page, targetKey);
  const element = new WebElement(sourceSelector);

  element.dragAndDrop(targetSelector);
};
