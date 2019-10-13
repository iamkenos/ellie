Feature: Section 6

  Background:
    Given I have a screen that is maximized
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 6" to exist

  Scenario: Field value equals matches another value
    Then I expect the field "Demo=>Value comparison 1" value to be "This input contains strawberry"
      And I expect the field "Demo=>Value comparison 2" value to be "This input contains cucumber"

  Scenario: Field multi-line value matches another value
    Then I expect the field "Demo=>Value comparison 5" value to match:
      """
      I have a text that

      spans across


      multiple lines.
      """
      And I expect the field "Demo=>Value comparison 5" value to not match:
      """
      Lorem

      Ipsum
      """

  Scenario: Field value is either empty or not
    Then I expect the field "Demo=>Value comparison 3" value to be empty
      And I expect the field "Demo=>Value comparison 4" value to not be empty

  Scenario: Field value is contains another value
    Then I expect the field "Demo=>Value comparison 3" value to not contain "lipsum"
      And I expect the field "Demo=>Value comparison 4" value to contain "€ ©"
