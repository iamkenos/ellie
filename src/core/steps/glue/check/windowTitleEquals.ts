import { driver } from "../../../browser";
import { getPageTitle } from "../../../utils";

export default (preferred: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkTitleEquals(expected, !preferred);
  } else {
    driver.checkTitleEquals(getPageTitle(page), !preferred);
  }
};
