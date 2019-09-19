import { driver } from "../../../browser";

export default (key: string): void => {
  driver.pressKeys(key);
};
