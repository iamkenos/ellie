import WebdriverIOPage from "./webdriverIO.page";
import { driver, ICustomTruthy } from "@iamkenos/ellie";

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

export function checkProjectTitleTextContains(preferred: boolean, value: string): void {
  // you can create anonymous functions assigned to a variable that returns
  // a custom truthy object (see immported interface). this is useful when you
  // want to create custom assertions and still make use of the framework's internal retry mechanism
  const isProjectTitleTextContains = (): ICustomTruthy => {
    const actual = wdioPage.projectTitle().getText();
    const expected = value;
    return {
      actual: actual,
      expected: expected,
      result: actual.includes(expected)
    };
  };
  driver.checkCustomTruthy(isProjectTitleTextContains, !preferred);

  // the check above is for illustration purposes and can be simplified by
  // using the statement below
  // wdioPage.projectTitle().checkTextContains(value, !preferred);
}

export function checkNavBarDisplayed(preferred: boolean): void {
  wdioPage.navBar().checkDisplayed(!preferred);
}
