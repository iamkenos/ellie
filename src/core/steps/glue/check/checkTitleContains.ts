import { driver } from "../../../browser";
import { getPageTitle } from "../../../utils";

export default (reverse: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkTitleContains(expected, !!reverse);
  } else {
    driver.checkTitleContains(getPageTitle(page), !!reverse);
  }
};
