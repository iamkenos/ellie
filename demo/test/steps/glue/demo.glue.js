import DemoPage from '../../pages/objects/demo.page';

const demoPage = new DemoPage();

export function scrollToSectionHeader(label) {
  demoPage.getSectionHeader(label).scrollIntoView();
}

export function checkSectionHeaderExists(label, reverse) {
  demoPage.getSectionHeader(label).checkExisting(reverse);
}
