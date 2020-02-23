Feature: IV. Contexts

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url "/"
      And I click the "IV. Contexts" navigation item
      And I expect the section header "IV. Contexts" to exist

  Scenario: Navigate pages in the same window
    Then I click the "openInSameWindowLink" link
      But I navigate back from the current page
      And I expect the "iFrame" page's "Level 1 List Items" element count to be "0"
      And I expect the url to not contain "iframe"
    When I refresh the page
    Then I expect the navigation item "IV. Contexts" to not be selected
      But I navigate forward from the current page
    Then I expect the url to contain "iframe"
      And I expect the "iFrame" page's "Level 1 List Items" element count to not be "0"
      And I expect the "iFrame" page's "Level 1 List Items" element count to be greater than "4"
      And I expect the "iFrame" page's "Level 1 List Items" element count to be less than "6"
      And I expect the "iFrame" page's "Level 1 List Items" element count to not be greater than "6"
      And I expect the "iFrame" page's "Level 1 List Items" element count to not be less than "4"

  Scenario: Simulate keyboard press events
    When I focus on the "#keyPress" field
    Then I expect the "#keyPress" element to have focus
      But I expect the "#keyPressDest" element to not have focus
      And I press the "Escape" key
      And I expect the "#keyPressDest" element text to be "27"
    When I press the "a" key
    Then I expect the "#keyPressDest" element text to not be "54"

  Scenario: Open url in a new window
    When I open the "Demo" page's url on a new window
    Then I expect the window count to be "2"
      But I close the last opened window
      And I expect the window count to not be "2"

  Scenario: Open link in a new window and switch context
    When I click the "openInNewWindowLink" link
    Then I expect the window count to be greater than "1"
    When I focus on the last opened window
    Then I expect the page title to not contain "Demo Page"
      And I expect the page title to not contain the "Demo" page's title
      And I expect the page title to not be "Demo Page"
      And I expect the page title to not be the "Demo" page's title
      And I expect the url to be the "iFrame" page's url
      But I close the last opened window
    Then I expect the window count to be less than "2"
      And I close all except the parent window

  Scenario: Open link in a new window but don't switch context
    When I click the "openInNewWindowLink" link
    Then I expect the url to contain the "Demo" page's url
      And I expect the url to not contain the "iFrame" page's url
      And I expect the url to not be the "iFrame" page's url
      And I close all except the parent window

  Scenario: Open broken link in a new window and switch context
    When I click the "openBlankInNewWindowLink" link
      And I click the "openBlankInNewWindowLink" link
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
    When I click the "openBlankInNewWindowLink" link
      And I click the "openBlankInNewWindowLink" link
      And I click the "openBlankInNewWindowLink" link
    Then I expect the window count to be "4"
      But I close all except the parent window
    Then I expect the window count to be "1"
      And I expect the page title to be "Demo Page"
      And I close all except the parent window

  Scenario: Switch context over to an iframe
    When I focus on the "#showPageInIframe" iframe
    Then I expect the "iFrame" page's "Level 1 List Items" elements text array to contain:
      | Values |
      | Item 3 |
      | Item 4 |
      And I expect the "iFrame" page's "Level 1 List Items" elements text array to not contain:
      | Values |
      | Item 0 |
      | Item 1 |
      And I expect the "iFrame" page's "Level 2 List Items" elements text array to match:
      | Values   |
      | Item 4.A |
      | Item 4.B |
      And I expect the "iFrame" page's "Level 2 List Items" elements text array to not match:
      | Values        |
      | Item 4.B.II.a |
      | Item 4.B.II.b |
    When I focus on the parent context
    Then I expect the "iFrame" page's "Level 1 List Items" element to not exist
