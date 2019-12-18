Feature: WebDriverIO

  WebdriverIO (WDIO) is a webdriver test framework for Node.js.
  It offers various features useful for testing web applications such as:
  - webdriver commands for interacting with web elements
  - visual regression
  - intercepting ajax requests for validation
  - integration with cloud services such as BrowserStack
  - various reporter tools
  - many more!
  Ellie is an abstraction of the WDIO framework that aims to get you started
  quickly with web application testing using cucumber and page object model

  Background:
    Given I have a screen that is maximized

  Scenario: Cucumber boilerplate style
    This is an example of writing tests following the cucumber boilerplate fashion.
    We would directly supply the element locators and page URLs using the built-in steps.
    It works but the tests are hard to maintain since locator changes will be done all over the place.

    When I open the url "https://webdriver.io/"
    Then I expect the element ".projectTitle" text to be "WEBDRIVER I/O"
      And I expect the page title to be "WebdriverIO · Next-gen WebDriver test framework for Node.js"
    When I click the element "//a[text()='Get Started']"
    Then I expect the element "#docsNav" to be displayed

  Scenario: Page meta object model
    This is an example of writing tests using page object model.
    Page URLs and locators are defined in a meta file e.g. webdrverIO.meta.js.
    Using the built-in steps, we would supply 'Meta=>Element' instead element locators.

    When I open the url of the page "WebdriverIO"
    Then I expect the element "WebdriverIO=>Project title" text to be "WEBDRIVER I/O"
      And I expect the window title to be that of the page "WebdriverIO"
    When I click the element "WebdriverIO=>Button: Get Started"
    Then I expect the element "WebdriverIO=>navBar" to be displayed

  Scenario: Page class object model
    This is another example of writing tests using page object model.
    Unlike the previous example, this one makes use page object classes e.g. webdrverIO.page.js.
    This approch is perfect if you need to implement custom and more complex steps

    When I navigate on the WDIO page
    Then I expect the project title to be "WEBDRIVER I/O" on the WDIO page
      And I expect the title to match the value on the WDIO page
    When I click the Get Started buttton on the WDIO page
    Then I expect the nav bar to be displayed on the WDIO page
