import { driver } from "../../../browser";

export default (milliseconds: string): void => {
  driver.pause(parseInt(milliseconds));
};
