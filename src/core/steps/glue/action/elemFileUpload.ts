import * as path from "path";

import { WebElement } from "../../../elements";
import { getPageElement } from "../../../utils";

export default (filepath: string, key: string): void => {
  const selector = getPageElement(key);
  const element = new WebElement(selector);

  element.setValue(path.join((browser as any).config.directory, filepath));
};
