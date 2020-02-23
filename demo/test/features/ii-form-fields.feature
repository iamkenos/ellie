Feature: II. Form Fields

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url "/"
      And I click the "II. Form Fields" navigation item
      And I expect the section header "II. Form Fields" to exist

  Scenario: Change input field value
    When I type "This text is " on the "#fmInput" field
    Then I expect the "#fmInput" field value to not contain "[fmInput]"
      But I append "appended on [fmInput]..." on the "#fmInput" field
    Then I expect the "#fmInput" field value to be "This text is appended on [fmInput]..."
      But I clear the "#fmInput" field
    Then I expect the "#fmInput" field value to be empty

  Scenario: Upload file to an input field
    When I upload the ".files/demo.txt" file to the "#fmFileInput" field
    Then I expect the "#fmFileInput" field value to contain "demo.txt"

  Scenario: Select a dropdown option by index
    When I select the option with index "3" from the "#fmSelect" dropdown
    Then I expect the option with index "0" from the "#fmSelect" dropdown to not be selected
      And I expect the option with index "3" from the "#fmSelect" dropdown to be selected

  Scenario: Select a dropdown option by label
    When I select the option with label "Option 3" from the "#fmSelect" dropdown
    Then I expect the option with label "Option 0" from the "#fmSelect" dropdown to not be selected
      And I expect the option with label "Option 3" from the "#fmSelect" dropdown to be selected

  Scenario: Select a dropdown option by attribute
    When I select the option with value "option-3" from the "#fmSelect" dropdown
    Then I expect the option with value "option-0" from the "#fmSelect" dropdown to not be selected
      And I expect the option with value "option-3" from the "#fmSelect" dropdown to be selected

  Scenario: Select a checkbox item
    When I select the "#fmInputCheck2" check box
    Then I expect the "#fmInputCheck2" check box to be selected
      But I deselect the "#fmInputCheck1" check box
      And I expect the "#fmInputCheck1" check box to not be selected

  Scenario: Select a radio option
    When I select the "#fmInputRadio2" radio button
    Then I expect the "#fmInputRadio2" radio button to be selected
      But I deselect the "#fmInputRadio2" radio button
      And I expect the "#fmInputRadio2" radio button to be selected
    When I select the "#fmInputRadio1" radio button
    Then I expect the "#fmInputRadio1" radio button to be selected
      And I expect the "#fmInputRadio2" radio button to not be selected

  Scenario: Change textarea value
    When I type a multi-line value on the "#fmTextarea" field:
      """
      This

      text is
      """
    Then I expect the "#fmTextarea" field value to contain:
      """

      text is
      """
      But I append a multi-line value on the "#fmTextarea" field:
      """

      appended
      on [fmTextarea]...
      """
    Then I expect the "#fmTextarea" field value to match:
      """
      This

      text is
      appended
      on [fmTextarea]...
      """
      But I clear the "#fmTextarea" field
    Then I expect the "#fmTextarea" field value to not contain:
      """
      on [fmTextarea]...
      """
      And I expect the "#fmTextarea" field value to not match:
      """
      This

      text is
      appended
      on [fmTextarea]...
      """
