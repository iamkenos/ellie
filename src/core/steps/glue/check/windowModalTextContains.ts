import { driver } from "../../../browser";
import { transformToken } from "../../../utils";

export default (preferred: string, expected: string): void => {
  expected = transformToken(expected);
  driver.checkModalTextContains(expected, !preferred);
};
