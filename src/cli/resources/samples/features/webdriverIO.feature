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

  # These are tags
  @sample @boilerplate-style
  Scenario: Cucumber boilerplate style
    This is an example of writing tests following the cucumber boilerplate fashion.
    Element locators and page URLs are directly supplied from the built-in steps.
    Ideal when you want to get started quickly and run tests just by writing gherkin statements without additional code.
    It works but element locators will be harder to maintain as the number of tests grow.
    # This is a comment below the scenario description

    When I open the url "https://webdriver.io/"
    Then I expect the ".hero__subtitle" element text to contain "Next-gen browser"
      And I expect the page title to be "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
    When I click the "//a[text()='Get Started']" element
    Then I expect the ".navbar__items" element to be displayed

  Scenario: Page object model: meta style
    This is an example of writing tests using page object model.
    Element locators and other page properties are defined in a meta file e.g. webdrverIO.meta.ts.
    Use the optional page name parameter on applicable built-in steps to access the page meta properties

    When I open the "WebdriverIO" page's url
    Then I expect the "WebdriverIO" page's "Project title" element text to contain "Next-gen browser"
      And I expect the window title to match the "WebdriverIO" page's title
    When I click the "WebdriverIO" page's "Button: Get Started" element
    Then I expect the "WebdriverIO" page's "navBar" element to be displayed

  # Scenario outlines run multiple iterations of the same test. This is cucumber's take on data driven testing
  Scenario Outline: Page object model: classes style <ITER>
    This is another example of writing tests using page object model.
    Unlike the previous example, this one makes use page object classes e.g. webdrverIO.page.ts.
    This approach is more suitable for implementing custom and more complex steps.

    When I open the WebdriverIO page's url
    Then I expect the WebdriverIO page's project title to contain "Next-gen browser"
      And I expect the window title to match the WebdriverIO page's title
    When I click the WebdriverIO page's Get Started button
    Then I expect the the WebdriverIO page's nav bar to be displayed

    Examples:
      | ITER       |
      | iteration1 |
      | iteration2 |
