import { DataTable } from "@cucumber/cucumber";
import { WebElements } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (page: string, key: string, preferred: string, table: DataTable): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElements(selector);
  // @ts-ignore
  const expected = [].concat(...table.rows());
  element.checkTextEqualsArray(expected, !preferred);
};
