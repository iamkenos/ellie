Feature: Section 4

  Background:
    Given I have a screen that is maximized
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 4" to exist

  Scenario: Make an element visible
    Then I expect the element "Demo=>Delayed visible element" to not be displayed
      And I expect the element "Demo=>Delayed visible element" to exist
    When I click the button "Demo=>Show element button"
    Then I expect the element "Demo=>Delayed visible element" to be displayed

  Scenario: Make an element invisible
    Then I expect the element "Demo=>Delayed invisible element" to be displayed
    When I click the element "Demo=>Hide element button"
    Then I expect the element "Demo=>Delayed invisible element" to not be displayed
      And I expect the element "Demo=>Delayed invisible element" to exist
