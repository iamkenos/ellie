import { TableDefinition } from "cucumber";
import { WebElements } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (key: string, reverse: string, table: TableDefinition): void => {
  const selector = getPageElement(key);
  const element = new WebElements(selector);
  const expected = [].concat(...table.rows());
  element.checkTextContainsArray(expected, !!reverse);
};
