import DemoPage from '../../pages/objects/demo.page';
import { driver } from '../../../../build';

const demoPage = new DemoPage();

export function scrollToSectionHeader(label) {
  demoPage.getSectionHeader(label).scrollIntoView();
}

export function checkSectionHeaderExists(label, reverse) {
  const isSectionHeaderExisting = () => demoPage.getSectionHeader(label).isExisting(reverse);
  driver.checkCustomTruthy(isSectionHeaderExisting);

  // demoPage.getSectionHeader(label).checkExisting(reverse);
}
