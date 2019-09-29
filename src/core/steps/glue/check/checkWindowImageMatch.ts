import { driver } from "../../../browser";

export default (context: string, reverse: string, filename: string): void => {
  driver.checkImageMatchRef(context, filename, !!reverse);
};
