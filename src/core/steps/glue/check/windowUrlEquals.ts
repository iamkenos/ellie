import { driver } from "../../../browser";
import { getMetaUrl } from "../../../utils";

export default (preferred: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkUrlEquals(expected, !preferred);
  } else if (page) {
    driver.checkUrlEquals(getMetaUrl(page), !preferred);
  } else {
    driver.checkUrlEquals(browser.config.baseUrl!, !preferred);
  }
};
