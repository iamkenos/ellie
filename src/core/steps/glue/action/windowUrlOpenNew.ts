import { driver } from "../../../browser";
import { getPageUrl } from "../../../utils";

export default (page: string, url: string): void => {
  if (url) {
    driver.newWindow(url);
  } else {
    driver.newWindow(getPageUrl(page));
  }
};
