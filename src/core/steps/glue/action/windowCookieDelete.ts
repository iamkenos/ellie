import { driver } from "../../../browser";

export default (cookie: string): void => {
  driver.deleteCookie(cookie);
};
