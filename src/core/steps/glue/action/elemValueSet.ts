import { WebElement } from "../../../elements";
import { getMetaElement, localizeLabel, transformToken } from "../../../utils";

export default (action: string, value: string, page: string, key: string): void => {
  value = transformToken(localizeLabel(page, value));
  const selector = getMetaElement(page, key);
  const element = new WebElement(selector);

  if (action === "type") {
    element.setValue(value);
  } else if (action === "append") {
    element.addValue(value);
  }
};
