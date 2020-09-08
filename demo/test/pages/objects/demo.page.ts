import { BasePage, WebElement } from "../../../../build";
import meta from "../meta/demo.meta";

export default class DemoPage extends BasePage<typeof meta> {
  constructor() {
    super(meta);
  }

  public getNavigationItem(label: string): WebElement {
    return new WebElement(this.locators.navigationItem.replace("##LABEL##", label));
  }

  public getSectionHeader(label: string): WebElement {
    return new WebElement(this.locators.sectionHeader.replace("##LABEL##", label));
  }
}
