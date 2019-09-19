import { driver } from "../../../browser";

export default (reverse: string, expected: string): void => {
  driver.checkUrlContains(expected, !!reverse);
};
