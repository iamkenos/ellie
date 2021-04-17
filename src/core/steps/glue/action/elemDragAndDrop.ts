import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (page: string, sourceKey: string, targetKey: string): void => {
  const sourceSelector = getMetaElement(page, sourceKey);
  const targetSelector = getMetaElement(page, targetKey);
  const element = new WebElement(sourceSelector);

  element.dragAndDrop(targetSelector);
};
