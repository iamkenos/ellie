import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (sourceKey: string, targetKey: string): void => {
  const sourceSelector = getPageElement(sourceKey);
  const targetSelector = getPageElement(targetKey);
  const element = new WebElement(sourceSelector);

  element.dragAndDrop(targetSelector);
};
