import { driver } from "../../../browser";

export default (preferred: string, expected: string): void => {
  driver.checkModalTextContains(expected, !preferred);
};
