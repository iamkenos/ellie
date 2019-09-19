import { driver } from "../../../browser";
import { getPageUrl } from "../../../utils";

export default (url: string, page: string): void => {
  if (url) {
    driver.url(url);
  } else {
    driver.url(getPageUrl(page));
  }
};
