import { driver } from "../../../browser";

export default (type: string, count: string): void => {
  const loop = parseInt(count) || 1;

  for (let i = 0; i < loop; i++) {
    if (type === "back") {
      driver.back();
    } else if (type === "forward") {
      driver.forward();
    }
  }
};
