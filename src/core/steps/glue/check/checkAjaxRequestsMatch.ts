import { driver } from "../../../browser";

export default (reverse: string, filename: string): void => {
  driver.checkAjaxRequestsMatchRef(filename, !!reverse);
};
