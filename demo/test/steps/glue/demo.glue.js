import DemoPage from '../../pages/objects/demo.page';
import { driver } from '../../../../build';

const demoPage = new DemoPage();

export function scrollToSectionHeader(label) {
  demoPage.getSectionHeader(label).scrollIntoView();
}

export function clickNavigationItem(label) {
  demoPage.getNavigationItem(label).click();
}

export function checkSectionHeaderExists(label, reverse) {
  demoPage.getSectionHeader(label).checkExisting(reverse);
}
