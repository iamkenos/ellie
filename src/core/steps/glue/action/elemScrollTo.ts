import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (page: string, key: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);
  element.scrollIntoView();
};
