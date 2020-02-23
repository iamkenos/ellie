import { driver } from "../../../browser";

export default (cookie: string, preferred: string): void => {
  driver.checkCookieExists(cookie, !preferred);
};
