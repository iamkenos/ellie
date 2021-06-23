import { driver } from "../../../browser";
import { transformToken } from "../../../utils";

export default (text: string): void => {
  driver.sendAlertText(transformToken(text));
};
