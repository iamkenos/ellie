export default {
  default: {
    url: '/',
    title: 'DEMO APP',
    locators: {
      // Section 11
      'Section 11': '//h3[text()="SECTION 11"]',
      'Same window link': '//span[./a[@id="linkSameWindow"]]/a',

      // Section 13
      'Section 13': '//h3[text()="SECTION 13"]',
      'Test input': '#testInput',
      'Upload input': '#uploadInput',

      // Section 15
      'Section 15': '//h3[text()="SECTION 15"]',
      'Create button': '#waitForCreateBtn'
    }
  }
};
