import { driver } from "../../../browser";

export default (cookieName: string, cookieValue: string): void => {
  driver.setCookie(cookieName, cookieValue);
};
