import { driver } from "../../../browser";
import { getMetaElement } from "../../../utils";
import { WebElement } from "../../../elements";

export default (page: string, key: string): void => {
  if (key) {
    const selector = getMetaElement(page, key);
    const element = new WebElement(selector);
    driver.switchToFrame(element);
  } else {
    driver.switchToParentFrame();
  }
};
