import { mergeMeta, WebComponent, WebElement } from "@iamkenos/ellie";
import navBar from "./navigation-bar.meta";
import navItem from "./navigation-item.meta";
import navTitle from "./navigation-title.meta";

const meta = mergeMeta(navBar, navItem, navTitle);

export default class NavigationBar extends WebComponent<typeof meta> {
  constructor() {
    super("navigationBar", meta);
  }

  public getNavigationItem(label: string): WebElement {
    return this.child$(this.locators.navigationItems + this.locators.options.replace("##LABEL##", label));
  }
}
