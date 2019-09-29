import { driver } from "../../../browser";

export default (location: string): void => {
  if (location === "top") {
    driver.scrollToTop();
  } else if (location === "bottom") {
    driver.scrollToBottom();
  }
};
