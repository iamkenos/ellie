Feature: Section 2

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 2" to exist

  Scenario: Look for the visible element
    Then I expect the element "Demo=>Visible element" to be displayed