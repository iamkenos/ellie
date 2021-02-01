import { BasePage, WebElement } from "@iamkenos/ellie";
import meta from "./webdriverIO.meta";

export default class WebdriverIOPage extends BasePage<typeof meta> {
  constructor() {
    super(meta);
  }

  public projectTitle(): WebElement {
    return new WebElement(this.locators["Project title"]);
  }

  public getStarted(): WebElement {
    return new WebElement(this.locators["Button: Get Started"]);
  }

  public navBar(): WebElement {
    return new WebElement(this.locators.navBar);
  }
}
