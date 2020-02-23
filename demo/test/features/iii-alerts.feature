Feature: III. Alerts

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the "Demo" page's url
      And I click the "III. Alerts" navigation item
      And I expect the section header "III. Alerts" to exist

  Scenario: Interact with a page alert box
    When I click the "openAlertLink" link
    Then I expect the alert text to contain "This alert box is opened by"
      And I expect the alert text to be "This alert box is opened by [openAlertLink]..."
      But I accept the alert
      And I expect an alert to not be opened

  Scenario: Interact with a page confirm box
    When I click the "openConfirmLink" link
    Then I expect a confirm box to be opened
      But I accept the confirm box
      And I expect the "#openConfirmDest" element text to be "true"
    When I click the "openConfirmLink" link
      But I dismiss the confirm box
      And I expect the "#openConfirmDest" element text to be "false"

  Scenario: Interact with a page prompt
    When I click the "openPromptLink" link
      And I type "This prompt box is opened by [openPromptLink]..." on the prompt
      And I accept the prompt
      And I expect the "#openPromptDest" element text to be "This prompt box is opened by [openPromptLink]..."
    When I click the "openPromptLink" link
      And I type "This prompt box is opened by [openPromptLink]..." on the prompt
      But I dismiss the prompt
      And I expect the "#openPromptDest" element text to be "null"
