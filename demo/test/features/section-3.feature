Feature: Section 3

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 3" to exist

  Scenario: Look for the hidden element
    Then I expect the element "Demo=>Hidden element" to not be displayed
      And I expect the element "Demo=>Hidden element" to exist
