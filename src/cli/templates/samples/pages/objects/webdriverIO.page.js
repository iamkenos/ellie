import { Page } from 'ellie/build/core';
import webdriverIO from '../meta/webdriverIO.meta';

export default class WebdriverIOPage extends Page {
  constructor() {
    super(webdriverIO);
  }

  get projectTitle() {
    return this.getElement(this.elements['Project title']);
  }

  get getStarted() {
    return this.getElement(this.elements['Button: Get Started']);
  }

  get navBar() {
    return this.getElement(this.elements.navBar);
  }
}
