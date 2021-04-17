import { driver } from "../../../browser";
import { getMetaUrl } from "../../../utils";

export default (page: string, url: string): void => {
  if (url) {
    driver.newWindow(url);
  } else {
    driver.newWindow(getMetaUrl(page));
  }
};
