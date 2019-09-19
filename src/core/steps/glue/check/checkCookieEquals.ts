import { driver } from "../../../browser";

export default (cookie: string, reverse: string, expected: string): void => {
  driver.checkCookieEquals(cookie, expected, !!reverse);
};
