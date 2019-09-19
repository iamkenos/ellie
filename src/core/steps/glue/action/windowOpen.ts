import { driver } from "../../../browser";
import { getPageUrl } from "../../../utils";

export default (url: string, page: string): void => {
  if (url) {
    driver.newWindow(url);
  } else {
    driver.newWindow(getPageUrl(page));
  }
};
