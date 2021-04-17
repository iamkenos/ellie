import * as path from "path";

import { WebElement } from "../../../elements";
import { getMetaElement } from "../../../utils";

export default (filepath: string, page: string, key: string): void => {
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);

  element.setValue(path.join((browser.config as any).directory, filepath));
};
