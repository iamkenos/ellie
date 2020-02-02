import { driver } from "../../../browser";

export default (cookie: string, reverse: string, expected = ""): void => {
  driver.checkCookieEquals(cookie, expected, !!reverse);
};
