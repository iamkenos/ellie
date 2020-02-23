import * as path from "path";

import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (filepath: string, page: string, key: string): void => {
  const selector = getPageElement(page, key);
  const element = new WebElement(selector);

  element.setValue(path.join((browser.config as any).directory, filepath));
};
