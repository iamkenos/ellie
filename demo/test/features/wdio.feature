Feature: WebDriverIO

  # Scenario: Open WebDriverIO home page
  #   Given I open the url "https://webdriver.io"
  #   Then I expect the browser title to be "WebdriverIO · Next-gen WebDriver test framework for Node.js"

  # Scenario: Open WebDriverIO home page and fail
  #   Given I open the url "https://webdriver.io"
  #   When I click the "Get Started" link
  #   Then I expect the browser title to be "WebdriverIO · Next-gens WebDriver test framework for Node.js"

  Scenario: Demo app
    Given I open the url of the page "Demo"
    Then I expect the window title to be that of the page "Demo"
# When I click the link "This link opens example.com in the same window"
#   And I navigate to the previous page
# Then I expect the window title to not be "Example Domain"
# When I double click the element "Demo=>Create button"
# Then I expect the element "Demo=>Same window links" to be displayed
#   And I expect the element "Demo=>Create button" to be 58px broad and 26px tall
#   And I expect the element "Demo=>Create button" to be 58px broad
#   And I expect the element "Demo=>Create button" to not be 58px tall
#   And I expect the element "Demo=>Create button" location at y axis to be 123.13
