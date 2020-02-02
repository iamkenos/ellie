export default {
  default: {
    url: '/',
    title: 'Demo Page',
    locators: {
      navigationItem: '//div[contains(@class,"tabs")]/label[text()="##LABEL##"]',
      sectionHeader: '//h2[text()="##LABEL##"]'
    }
  }
};
