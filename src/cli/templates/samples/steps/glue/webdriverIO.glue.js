import WebdriverIOPage from '../../pages/objects/webdriverIO.page';

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
  wdioPage.projectTitle.checkTextEquals(value, reverse);
}

export function checkNavBarDisplayed(reverse) {
  wdioPage.navBar.checkDisplayed(reverse);
}
