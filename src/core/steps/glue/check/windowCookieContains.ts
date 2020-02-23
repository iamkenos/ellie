import { driver } from "../../../browser";

export default (cookie: string, preferred: string, expected: string): void => {
  driver.checkCookieContains(cookie, expected, !preferred);
};
