import { driver } from "../../../browser";
import { getMetaTitle } from "../../../utils";

export default (preferred: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkTitleContains(expected, !preferred);
  } else {
    driver.checkTitleContains(getMetaTitle(page), !preferred);
  }
};
