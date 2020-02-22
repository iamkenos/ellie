import WebdriverIOPage from "../../pages/objects/webdriverIO.page";
import { driver } from "@iamkenos/ellie";

const wdioPage = new WebdriverIOPage();

export function navigate(): void {
  wdioPage.navigate();
}

export function checkTitle(preferred: boolean): void {
  wdioPage.checkTitle(!preferred);
}

export function clickGetStarted(): void {
  wdioPage.getStarted().click();
}

export function checkProjectTitleText(preferred: boolean, value: string): void {
  // you can create anonymous functions that encloses a single function which
  // returns a truthy value. this is useful when you want to create custom assertions
  // and still make use of the framework's internal retry mechanism
  const isProjectTitleTextEquals = (): boolean => wdioPage.projectTitle().isTextEquals(value, !preferred);
  driver.checkCustomTruthy(isProjectTitleTextEquals);

  // the check above is for illustration purposes and can be simplified by
  // using the statement below
  // wdioPage.projectTitle().checkTextEquals(value, !preferred);
}

export function checkNavBarDisplayed(preferred: boolean): void {
  wdioPage.navBar().checkDisplayed(!preferred);
}
