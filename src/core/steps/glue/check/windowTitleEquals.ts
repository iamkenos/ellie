import { driver } from "../../../browser";
import { getMetaTitle } from "../../../utils";

export default (preferred: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkTitleEquals(expected, !preferred);
  } else {
    driver.checkTitleEquals(getMetaTitle(page), !preferred);
  }
};
