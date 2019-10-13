import { driver } from "../../../browser";

export default (reverse: string): void => {
  driver.checkModalExisting(!!reverse);
};
