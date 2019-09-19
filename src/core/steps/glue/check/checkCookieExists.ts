import { driver } from "../../../browser";

export default (cookie: string, reverse: string): void => {
  driver.checkCookieExists(cookie, !!reverse);
};
