import { driver } from "../../../browser";

export default (preferred: string, expected: string): void => {
  driver.checkModalTextEquals(expected, !preferred);
};
