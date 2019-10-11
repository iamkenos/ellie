import { driver } from "../../../browser";

export default (reverse: string, filename: string, opts: string): void => {
  driver.checkHttpResponseMatchRef({ options: JSON.parse(opts) }, filename, !!reverse);
};
