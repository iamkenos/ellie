@sample
Feature: WebDriverIO

  Next-gen WebDriver test framework for Node.js
  WebdriverIO is:
  - Extendable
  Adding helper functions, or more complicated sets and combinations of existing commands is simple and really useful
  - Compatible
  WebdriverIO has 1st class support for the WebDriver specification as well as to Appium and allows to run tests on desktop and mobile
  - Feature Rich
  It implements all Webdriver protocol commands and provides useful integrations with other tools

  ellie is an abstraction of WebdriverIO. It aims to get you started quickly on writing
  browser and devices automated tests using cucumber and page object model

  Background:
    Given I have a screen that is 1600 by 1024 pixels

  @sample @boilerplate-style
  Scenario: Cucumber boilerplate style
    This is an example of writing tests following the cucumber boilerplate fashion.
    Element locators and page URLs are directly supplied from the built-in steps.
    It works but element locators will be harder to maintain as the number of tests grow.
    # This is a comment below the scenario description

    When I open the url "https://webdriver.io/"
    Then I expect the element ".projectTitle" text to be "WEBDRIVER I/O"
      And I expect the page title to be "WebdriverIO · Next-gen WebDriver test framework for Node.js"
    When I click the element "//a[text()='Get Started']"
    Then I expect the element "#docsNav" to be displayed

  Scenario: Page meta object model
    This is an example of writing tests using page object model.
    Element locators and page URLs are defined in a meta file e.g. webdrverIO.meta.js.
    Parameters followng the format 'Meta=>Element' are supplied from the built-in steps.

    When I open the url of the page "WebdriverIO"
    Then I expect the element "WebdriverIO=>Project title" text to be "WEBDRIVER I/O"
      And I expect the window title to be that of the page "WebdriverIO"
    When I click the element "WebdriverIO=>Button: Get Started"
    Then I expect the element "WebdriverIO=>navBar" to be displayed

  Scenario Outline: Page class object model: <ITER>
    This is another example of writing tests using page object model.
    Unlike the previous example, this one makes use page object classes e.g. webdrverIO.page.js.
    This approch is more suitable for implementing custom and complex steps.

    When I navigate on the WDIO page
    Then I expect the project title to be "WEBDRIVER I/O" on the WDIO page
      And I expect the title to match the value on the WDIO page
    When I click the Get Started buttton on the WDIO page
    Then I expect the nav bar to be displayed on the WDIO page

    Examples:
      | ITER       |
      | iteration1 |
      | iteration2 |
