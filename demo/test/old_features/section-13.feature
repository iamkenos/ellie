Feature: Section 13

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 13" to exist

  Scenario: Set content to an input field
    When I type "foo" on the field "Demo=>Test input"
    Then I expect the field "Demo=>Test input" value to be "foo"
      And I expect the field "Demo=>Test input" value to not be empty

  Scenario: Append content to an input field
    When I type "foo" on the field "Demo=>Test input"
      And I append "baz" on the field "Demo=>Test input"
    Then I expect the field "Demo=>Test input" value to be "foobaz"

  Scenario: Clear the contents of an input field
    When I type "foo" on the field "Demo=>Test input"
      And I clear the field "Demo=>Test input"
    Then I expect the element "Demo=>Test input" value to be empty

  Scenario: Upload a file to an input field
    When I upload the file ".files/demo.txt" to the field "Demo=>Upload input"
    Then I expect the field "Demo=>Upload input" value to be "C:\fakepath\demo.txt"
