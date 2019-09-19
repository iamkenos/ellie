import { driver } from "../../../browser";

export default (action: string): void => {
  if (action === "accept") {
    driver.acceptAlert();
  } else if (action === "dismiss") {
    driver.dismissAlert();
  }
};
