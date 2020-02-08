import DemoPage from "../../pages/objects/demo.page";

const demoPage = new DemoPage();

export function clickNavigationItem(label: string): void {
  demoPage.getNavigationItem(label).jsClick();
}

export function checkNavigationItemSelected(label: string, reverse: boolean): void {
  demoPage.getNavigationItem(label).checkSelected(reverse);
}

export function checkSectionHeaderExists(label: string, reverse: boolean): void {
  demoPage.getSectionHeader(label).checkExisting(reverse);
}
