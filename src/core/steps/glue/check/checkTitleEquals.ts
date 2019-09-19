import { driver } from "../../../browser";
import { getPageTitle } from "../../../utils";

export default (reverse: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkTitleEquals(expected, !!reverse);
  } else {
    driver.checkTitleEquals(getPageTitle(page), !!reverse);
  }
};
