import { DataTable } from "@cucumber/cucumber";
import { WebElements } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (page: string, key: string, preferred: string, table: DataTable): void => {
  const selector = getPageElement(page, key);
  const element = new WebElements(selector);
  const expected = [].concat(...table.rows());
  element.checkTextEqualsArray(expected, !preferred);
};
