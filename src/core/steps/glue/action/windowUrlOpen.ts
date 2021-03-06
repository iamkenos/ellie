import { driver } from "../../../browser";
import { getPageUrl } from "../../../utils";

export default (page: string, url: string): void => {
  if (url) {
    driver.url(url);
  } else {
    driver.url(getPageUrl(page));
  }
};
