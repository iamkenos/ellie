import { driver } from "../../../browser";

export default (x: number, y: number): void => {
  driver.scrollTo(x, y);
};
