import { BasePage, WebElement } from "../../../../build";
import demo from "../meta/demo.meta";

export default class DemoPage extends BasePage {
  constructor() {
    super(demo);
  }

  public getNavigationItem(label: string): WebElement {
    return this.getElement(this.locators.navigationItem.replace("##LABEL##", label));
  }

  public getSectionHeader(label: string): WebElement {
    return this.getElement(this.locators.sectionHeader.replace("##LABEL##", label));
  }
}
