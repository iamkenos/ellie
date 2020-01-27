Feature: Section 15

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 15" to exist

  Scenario: Delayed select checkbox
    When I click the element "Demo=>Check button"
    Then I expect the check box "Demo=>Check delayed element" to be selected
      But I click the element "Demo=>Check delayed element"
      And I expect the check box "Demo=>Check delayed element" to not be selected

  Scenario: Delayed enable textbox
    Then I expect the element "Demo=>Enable delayed element" to not be enabled
      But I click the element "Demo=>Enable button"
      And I expect the element "Demo=>Enable delayed element" to be enabled

  Scenario: Delayed dropdown option
    Then I expect the option with index "0" from the dropdown "Demo=>Select delayed element" to be selected
      But I click the element "Demo=>Select button"
      And I expect the option with label "Second option" from the dropdown "Demo=>Select delayed element" to be selected
    When I select the option with label "First option" from the dropdown "Demo=>Select delayed element"
    Then I expect the option with value "1" from the dropdown "Demo=>Select delayed element" to be selected

  Scenario: Delayed element visibility
    Then I expect the element "Demo=>Visible delayed element" to not be displayed
      But I click the element "Demo=>Visible button"
      And I expect the element "Demo=>Visible delayed element" to be displayed

  Scenario: Delayed element text
    Then I expect the element "Demo=>Contains text delayed element" text to be empty
      But I click the element "Demo=>Contains text button"
      And I expect the element "Demo=>Contains text delayed element" text to contain "est"
      And I expect the element "Demo=>Contains text delayed element" text to be "test"

  Scenario: Delayed element value
    Then I expect the element "Demo=>Contains value delayed element" value to be empty
      But I click the element "Demo=>Contains value button"
      And I expect the element "Demo=>Contains value delayed element" value to contain "est"
      And I expect the element "Demo=>Contains value delayed element" value to be "test"

  Scenario: Delayed element create
    Then I expect the element "Demo=>Create delayed element" to not exist
      But I click the element "Demo=>Create button"
      And I expect the element "Demo=>Create delayed element" to exist
