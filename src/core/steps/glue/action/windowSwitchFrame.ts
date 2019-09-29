import { driver } from "../../../browser";
import { getPageElement } from "../../../utils";
import { WebElement } from "../../../elements";

export default (key: string): void => {
  if (key) {
    const selector = getPageElement(key);
    const element = new WebElement(selector);
    driver.switchToFrame(element);
  } else {
    driver.switchToParentFrame();
  }
};
