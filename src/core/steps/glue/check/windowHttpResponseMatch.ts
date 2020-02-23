import { driver } from "../../../browser";

export default (preferred: string, filename: string, opts: string): void => {
  driver.checkHttpResponseMatchRef({ options: JSON.parse(opts) }, filename, !preferred);
};
