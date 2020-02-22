import { driver } from "../../../browser";
import { getPageUrl } from "../../../utils";

export default (preferred: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkUrlEquals(expected, !preferred);
  } else {
    driver.checkUrlEquals(getPageUrl(page), !preferred);
  }
};
