import { BasePage, WebElement } from "../../../build";
import NavigationBar from "../components/navigation-bar.component";
import meta from "./demo.meta";

export default class DemoPage extends BasePage<typeof meta> {
  public navigationBar: NavigationBar

  constructor() {
    super(meta);
    this.navigationBar = new NavigationBar();
  }

  public getSectionHeader(label: string): WebElement {
    return new WebElement(this.locators.sectionHeader.replace("##LABEL##", label));
  }
}
