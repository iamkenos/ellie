import DemoPage from "../pages/demo.page";

const demoPage = new DemoPage();

export function clickNavigationItem(label: string): void {
  demoPage.navigationBar.getNavigationItem(label).jsClick();
}

export function checkNavigationItemSelected(label: string, preferred: boolean): void {
  demoPage.navigationBar.getNavigationItem(label).checkSelected(!preferred);
}

export function checkSectionHeaderExists(label: string, preferred: boolean): void {
  demoPage.getSectionHeader(label).checkExisting(!preferred);
}
