import { driver } from "../../../browser";
import { getMetaUrl } from "../../../utils";

export default (page: string, url: string): void => {
  if (url) {
    driver.url(url);
  } else {
    driver.url(getMetaUrl(page));
  }
};
