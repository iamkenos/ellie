Feature: Section 13 of the Demo App

  Background:
    Given I open the url of the page "Demo"
      And I expect the element "Demo=>Section 13" to exist

  Scenario: Set the content to an input field
    When I type "lipsum" on the field "Demo=>Test input"
    Then I expect the field "Demo=>Test input" value to be "lipsum"
      And I expect the field "Demo=>Test input" value to not be empty

  Scenario: Append content to an input field
    When I type "lorem" on the field "Demo=>Test input"
      And I append " ipsum" on the field "Demo=>Test input"
    Then I expect the field "Demo=>Test input" value to be "lorem ipsum"

  Scenario: Clear the contents of an input field
    When I type "lipsum" on the field "Demo=>Test input"
      And I clear the field "Demo=>Test input"
    Then I expect the element "Demo=>Test input" value to be empty

  Scenario: Upload a file to an input field
    When I upload the file ".files/demo.txt" to the field "Demo=>Upload input"
    Then I expect the field "Demo=>Upload input" value to be "C:\fakepath\upload.txt"
