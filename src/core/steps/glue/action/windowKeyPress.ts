import { driver } from "../../../browser";

export default (key: string, count: string): void => {
  const loop = parseInt(count) || 1;

  for (let i = 0; i < loop; i++) {
    driver.pressKeys(key);
  }
};
