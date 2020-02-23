import { driver } from "../../../browser";

export default (preferred: string): void => {
  driver.checkModalExisting(!preferred);
};
