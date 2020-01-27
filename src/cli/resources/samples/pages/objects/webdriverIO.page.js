import { BasePage } from 'ellie';
import webdriverIO from '../meta/webdriverIO.meta';

export default class WebdriverIOPage extends BasePage {
  constructor() {
    super(webdriverIO);
  }

  get projectTitle() {
    return this.getElement(this.locators['Project title']);
  }

  get getStarted() {
    return this.getElement(this.locators['Button: Get Started']);
  }

  get navBar() {
    return this.getElement(this.locators.navBar);
  }
}
