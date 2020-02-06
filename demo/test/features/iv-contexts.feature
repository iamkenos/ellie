Feature: IV. Contexts

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url "/"
      And I click the "IV. Contexts" navigation item
      And I expect the section header "IV. Contexts" to exist

  Scenario: Navigate pages in the same window
    Then I click the link "openInSameWindowLink"
      But I navigate back from the current page
      And I expect the element "iFrame=>Level 1 List Items" count to be "0"
      And I expect the url to not contain "iframe"
    When I refresh the page
    Then I expect the navigation item "IV. Contexts" to not be selected
      But I navigate forward from the current page
    Then I expect the url to contain "iframe"
      And I expect the element "iFrame=>Level 1 List Items" count to not be "0"
      And I expect the element "iFrame=>Level 1 List Items" count to be greater than "4"
      And I expect the element "iFrame=>Level 1 List Items" count to be less than "6"
      And I expect the element "iFrame=>Level 1 List Items" count to not be greater than "6"
      And I expect the element "iFrame=>Level 1 List Items" count to not be less than "4"

  Scenario: Simulate keyboard press events
    When I focus on the field "#keyPress"
    Then I expect the element "#keyPress" to have focus
      But I expect the element "#keyPressDest" to not have focus
      And I press the "Escape" key
      And I expect the element "#keyPressDest" text to be "27"
    When I press the "a" key
    Then I expect the element "#keyPressDest" text to not be "54"

  Scenario: Open url in a new window
    When I open the url of the page "Demo" on a new window
    Then I expect the window count to be "2"
      But I close the last opened window
      And I expect the window count to not be "2"

  Scenario: Open link in a new window and switch context
    When I click the link "openInNewWindowLink"
    Then I expect the window count to be greater than "1"
    When I focus on the last opened window
    Then I expect the page title to not contain "Demo Page"
      And I expect the page title to not contain that of the page "Demo"
      And I expect the page title to not be "Demo Page"
      And I expect the page title to not be that of the page "Demo"
      And I expect the url to be that of the page "iFrame"
      But I close the last opened window
    Then I expect the window count to be less than "2"
      And I close all except the parent window

  Scenario: Open link in a new window but don't switch context
    When I click the link "openInNewWindowLink"
    Then I expect the url to contain that of the page "Demo"
      And I expect the url to not contain that of the page "iFrame"
      And I expect the url to not be that of the page "iFrame"
      And I close all except the parent window

  Scenario: Open broken link in a new window and switch context
    When I click the link "openBlankInNewWindowLink"
      And I click the link "openBlankInNewWindowLink"
      And I focus on the last opened window
    Then I expect the url to be "http://localhost:8080/broken.html"
      And I expect the url path to be "/broken.html"
      And I expect the url path to contain "broken"
      But I focus on the parent window
      And I expect the url to not be "http://localhost:8080/broken.html"
      And I expect the url path to not be "/broken.html"
      And I expect the url path to not contain "broken"
      And I close all except the parent window

  Scenario: Open broken link in a new window but don't switch context
    When I click the link "openBlankInNewWindowLink"
      And I click the link "openBlankInNewWindowLink"
      And I click the link "openBlankInNewWindowLink"
    Then I expect the window count to be "4"
      But I close all except the parent window
    Then I expect the window count to be "1"
      And I expect the page title to be "Demo Page"
      And I close all except the parent window

  Scenario: Switch context over to an iframe
    When I focus on the iframe "#showPageInIframe"
    Then I expect the elements "iFrame=>Level 1 List Items" texts to contain:
      | Values |
      | Item 3 |
      | Item 4 |
      And I expect the elements "iFrame=>Level 1 List Items" texts to not contain:
      | Values |
      | Item 0 |
      | Item 1 |
      And I expect the elements "iFrame=>Level 2 List Items" texts to match:
      | Values   |
      | Item 4.A |
      | Item 4.B |
      And I expect the elements "iFrame=>Level 2 List Items" texts to not match:
      | Values        |
      | Item 4.B.II.a |
      | Item 4.B.II.b |
    When I focus on the parent context
    Then I expect the element "iFrame=>Level 1 List Items" to not exist
