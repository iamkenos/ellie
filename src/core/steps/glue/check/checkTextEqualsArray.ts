import { TableDefinition } from "cucumber";
import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, preferred: string, table: TableDefinition): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);
  const expected = [].concat(...table.rows());
  element.checkTextEqualsArray(expected, !preferred);
};
