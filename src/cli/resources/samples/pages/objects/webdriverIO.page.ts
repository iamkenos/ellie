import { BasePage, WebElement } from "@iamkenos/ellie";
import webdriverIO from "../meta/webdriverIO.meta";

export default class WebdriverIOPage extends BasePage {
  constructor() {
    super(webdriverIO);
  }

  public projectTitle(): WebElement {
    return this.getElement(this.locators["Project title"]);
  }

  public getStarted(): WebElement {
    return this.getElement(this.locators["Button: Get Started"]);
  }

  public navBar(): WebElement {
    return this.getElement(this.locators.navBar);
  }
}
