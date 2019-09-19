import { driver } from "../../../browser";

export default (screenWidth: string, screenHeight: string): void => {
  driver.setWindowSize(screenWidth, screenHeight);
};
