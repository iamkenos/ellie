import { DataTable } from "@cucumber/cucumber";
import { getDataTableRows } from "../../../";
import { driver } from "../../../browser";

export default (preferred: string, filename: string, table: DataTable): void => {
  const regex = { paths: getDataTableRows(table, 1), expressions: getDataTableRows(table, 2) };
  driver.checkAjaxRequestsMatchRef(filename, !preferred, { regex });
};
