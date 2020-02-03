export default {
  default: {
    url: '/',
    title: 'Demo Page',
    locators: {
      navigationItem: '//ul[@id="nav-items"]//a[text()="##LABEL##"]',
      sectionHeader: '//h2[text()="##LABEL##"]'
    }
  }
};
