import { driver } from "../../../browser";

export default (context: string, preferred: string, filename: string): void => {
  driver.checkImageMatchRef(context, filename, !preferred);
};
