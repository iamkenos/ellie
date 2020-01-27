Feature: Section 18

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 18" to exist

  Scenario: Select option by index
    When I select the option with index "2" from the dropdown "Demo=>Select element"
    Then I expect the option with index "2" from the dropdown "Demo=>Select element" to be selected
      And I expect the option with index "1" from the dropdown "Demo=>Select element" to not be selected

  Scenario: Select option by text
    When I select the option with label "Option #3" from the dropdown "Demo=>Select element"
    Then I expect the option with label "Option #3" from the dropdown "Demo=>Select element" to be selected

  Scenario: Select option by attribute
    When I select the option with name "fourthOption" from the dropdown "Demo=>Select element"
    Then I expect the option with name "fourthOption" from the dropdown "Demo=>Select element" to be selected
