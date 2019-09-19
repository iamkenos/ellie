import { driver } from "../../../browser";

export default (reverse: string, type: string, expected: string): void => {
  if (type === "greater") {
    driver.checkCountGreaterThan(parseInt(expected), !!reverse);
  } else if (type === "less") {
    driver.checkCountLessThan(parseInt(expected), !!reverse);
  }
};
