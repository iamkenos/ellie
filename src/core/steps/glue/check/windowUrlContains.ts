import { driver } from "../../../browser";
import { getPageUrl } from "../../../utils";

export default (preferred: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkUrlContains(expected, !preferred);
  } else {
    driver.checkUrlContains(getPageUrl(page), !preferred);
  }
};
