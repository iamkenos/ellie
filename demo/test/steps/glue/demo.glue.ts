import DemoPage from "../../pages/objects/demo.page";

const demoPage = new DemoPage();

export function clickNavigationItem(label: string): void {
  demoPage.getNavigationItem(label).jsClick();
}

export function checkNavigationItemSelected(label: string, preferred: boolean): void {
  demoPage.getNavigationItem(label).checkSelected(!preferred);
}

export function checkSectionHeaderExists(label: string, preferred: boolean): void {
  demoPage.getSectionHeader(label).checkExisting(!preferred);
}
