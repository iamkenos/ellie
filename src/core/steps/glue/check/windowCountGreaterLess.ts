import { driver } from "../../../browser";

export default (preferred: string, type: string, expected: string): void => {
  if (type === "greater") {
    driver.checkCountGreaterThan(parseInt(expected), !preferred);
  } else if (type === "less") {
    driver.checkCountLessThan(parseInt(expected), !preferred);
  }
};
