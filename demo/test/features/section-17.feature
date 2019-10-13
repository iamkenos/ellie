Feature: Section 17

  Background:
    Given I have a screen that is maximized
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 17" to exist

  Scenario: Open alert
    When I click the button "Demo=>Open alert"
    Then I expect an alert to be opened
      But I accept the alert
      And I expect an alert to not be opened

  Scenario: Open confirm box
    When I click the button "Demo=>Open confirm"
    Then I expect a confirm box to be opened
      But I dismiss the confirm box
      And I expect a confirm box to not be opened

  Scenario: Open prompt
    When I click the button "Demo=>Open prompt"
    Then I expect a prompt to be opened
      And I expect the prompt text to be "I am a prompt!"
      But I type "foo" on the prompt
      And I accept the prompt
      And I expect a prompt to not be opened
