import { driver } from "../../../browser";

export default (preferred: string, filename: string): void => {
  driver.checkAjaxRequestsMatchRef(filename, !preferred);
};
