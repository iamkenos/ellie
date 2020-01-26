import WebdriverIOPage from '../../pages/objects/webdriverIO.page';
import { driver } from 'ellie';

const wdioPage = new WebdriverIOPage();

export function navigate() {
  wdioPage.navigate();
}

export function checkTitle(reverse) {
  wdioPage.checkTitle(reverse);
}

export function clickGetStarted() {
  wdioPage.getStarted.click();
}

export function checkProjectTitleText(reverse, value) {
  // you can create anonymous functions that encloses a single function which
  // returns a truthy value. this is useful when you want to create custom assertions
  // and still make use of the framework's internal retry mechanism
  const isProjectTitleTextEquals = () => wdioPage.projectTitle.isTextEquals(value, reverse);
  driver.checkCustomTruthy(isProjectTitleTextEquals);

  // the check above is for illustration purposes and can be simplified by
  // using the statement below
  // wdioPage.projectTitle.checkTextEquals(value, reverse);
}

export function checkNavBarDisplayed(reverse) {
  wdioPage.navBar.checkDisplayed(reverse);
}
