import { BasePage, WebElement } from "@iamkenos/ellie";
import webdriverIO from "../meta/webdriverIO.meta";

export default class WebdriverIOPage extends BasePage {
  constructor() {
    super(webdriverIO);
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
