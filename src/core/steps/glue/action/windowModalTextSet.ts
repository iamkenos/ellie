import { driver } from "../../../browser";

export default (text: string): void => {
  driver.sendAlertText(text);
};
