import { driver } from "../../../browser";
import { getPageUrl } from "../../../utils";

export default (reverse: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkUrlEquals(expected, !!reverse);
  } else {
    driver.checkUrlEquals(getPageUrl(page), !!reverse);
  }
};
