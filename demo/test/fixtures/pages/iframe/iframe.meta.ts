export default {
  default: {
    url: "http://localhost:8080/iframe.html",
    title: "Demo iFrame",
    locators: {
      "Level 1 List Items": "//ol[@id='orderList']/li",
      "Level 2 List Items": "//ol[@id='orderList']/ol/li"
    }
  }
};
