import { driver } from "../../../browser";
import { getMetaUrl } from "../../../utils";

export default (preferred: string, expected: string, page: string): void => {
  if (expected) {
    driver.checkUrlContains(expected, !preferred);
  } else if (page) {
    driver.checkUrlContains(getMetaUrl(page), !preferred);
  } else {
    driver.checkUrlContains(browser.config.baseUrl!, !preferred);
  }
};
