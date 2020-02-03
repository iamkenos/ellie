import DemoPage from '../../pages/objects/demo.page';

const demoPage = new DemoPage();

export function clickNavigationItem(label) {
  demoPage.getNavigationItem(label).jsClick();
}

export function checkNavigationItemSelected(label, reverse) {
  demoPage.getNavigationItem(label).checkSelected(reverse);
}

export function checkSectionHeaderExists(label, reverse) {
  demoPage.getSectionHeader(label).checkExisting(reverse);
}
