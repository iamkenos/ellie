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
    Then I expect the ".projectTitle" element text to be "WEBDRIVER I/O"
      And I expect the page title to be "WebdriverIO · Next-gen WebDriver test framework for Node.js"
    When I click the "//a[text()='Get Started']" element
    Then I expect the "#docsNav" element to be displayed

  Scenario: Page object model: meta style
    This is an example of writing tests using page object model.
    Element locators and other page properties are defined in a meta file e.g. webdrverIO.meta.js.
    Use the optional page name parameter on applicable built-in steps to access the page meta properties

    When I open the "WebdriverIO" page's url
    Then I expect the "WebdriverIO" page's "Project title" element text to be "WEBDRIVER I/O"
      And I expect the window title to match the "WebdriverIO" page's title
    When I click the "WebdriverIO" page's "Button: Get Started" element
    Then I expect the "WebdriverIO" page's "navBar" element to be displayed

  Scenario Outline: Page object model: classes style <ITER>
    This is another example of writing tests using page object model.
    Unlike the previous example, this one makes use page object classes e.g. webdrverIO.page.js.
    This approch is more suitable for implementing custom and more complex steps.

    When I open the WebdriverIO page's url
    Then I expect the WebdriverIO page's project title to be "WEBDRIVER I/O"
      And I expect the window title to match the WebdriverIO page's title
    When I click the WebdriverIO page's Get Started button
    Then I expect the the WebdriverIO page's nav bar to be displayed

    Examples:
      | ITER       |
      | iteration1 |
      | iteration2 |
