import { driver } from "../../../browser";

export default (cookie: string, preferred: string, expected = ""): void => {
  driver.checkCookieEquals(cookie, expected, !preferred);
};
