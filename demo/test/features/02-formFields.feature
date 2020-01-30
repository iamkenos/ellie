Feature: II. Form Fields

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url "/"
      And I click the "II. Form Fields" navigation item
      And I expect the section header "II. Form Fields" to exist

  Scenario: Change input field value
    When I type "This text is " on the field "#fmInput"
    Then I expect the field "#fmInput" value to not contain "[fmInput]"
      But I append "appended on [fmInput]..." on the field "#fmInput"
    Then I expect the field "#fmInput" value to be "This text is appended on [fmInput]..."
      But I clear the field "#fmInput"
    Then I expect the field "#fmInput" value to be empty

  Scenario: Change textarea value
    When I type a multi-line value on the field "#fmTextarea":
      """
      This

      text is
      """
    Then I expect the field "#fmTextarea" value to contain:
      """

      text is
      """
      But I append a multi-line value on the field "#fmTextarea":
      """

      appended
      on [fmTextarea]...
      """
    Then I expect the field "#fmTextarea" value to match:
      """
      This

      text is
      appended
      on [fmTextarea]...
      """
      But I clear the field "#fmTextarea"
    Then I expect the field "#fmTextarea" value to not contain:
      """
      on [fmTextarea]...
      """
      And I expect the field "#fmTextarea" value to not match:
      """
      This

      text is
      appended
      on [fmTextarea]...
      """

  Scenario: Upload file to an input field
    When I upload the file ".files/demo.txt" to the field "#fmFileInput"
    Then I expect the field "#fmFileInput" value to contain "demo.txt"
