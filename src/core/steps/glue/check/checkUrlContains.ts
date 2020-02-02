import { driver } from "../../../browser";
import { getPageUrl } from "../../../utils";

export default (reverse: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkUrlContains(expected, !!reverse);
  } else {
    driver.checkUrlContains(getPageUrl(page), !!reverse);
  }
};
