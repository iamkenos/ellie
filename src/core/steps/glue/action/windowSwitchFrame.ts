import { driver } from "../../../browser";
import { getPageElement } from "../../../utils";
import { WebElement } from "../../../elements";

export default (page: string, key: string): void => {
  if (key) {
    const selector = getPageElement(page, key);
    const element = new WebElement(selector);
    driver.switchToFrame(element);
  } else {
    driver.switchToParentFrame();
  }
};
