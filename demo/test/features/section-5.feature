Feature: Section 5

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 5" to exist

  Scenario: Element text matches another text
    Then I expect the element "Demo=>Text comparison 1" text to be "I'm the same as the first string"
      And I expect the element "Demo=>Text comparison 2" text to be "I'm the same as the second string"
      And I expect the element "Demo=>Text comparison 3" text to be "I'm the same as the first string"

  Scenario: Element multi-line text matches another text
    Then I expect the element "Demo=>Text comparison 4" text to match:
      """
      I have a text that

      spans across


      multiple lines.
      """
      And I expect the element "Demo=>Text comparison 4" text to not match:
      """
      Lorem

      Ipsum
      """

  Scenario: Element text is either empty or not
    Then I expect the element "Demo=>Text comparison 5" text to be empty
      And I expect the element "Demo=>Text comparison 8" text to not be empty

  Scenario: Element text is contains another text
    Then I expect the element "Demo=>Text comparison 7" text to not contain "lipsum"
      And I expect the element "Demo=>Text comparison 8" text to contain "€ ©"
      And I expect the element "Demo=>Text comparison 9" text to contain ">"

  Scenario: Elements texts matches an array
    Then I expect the elements "Demo=>Text comparison elements" texts to match:
      | Values                                                  |
      | I'm the same as the first string                        |
      | I'm the same as the second string                       |
      | I'm the same as the first string                        |
      | I have a text that\n\nspans across\n\n\nmultiple lines. |
      |                                                         |
      | I'm the same as the first string                        |
      | I'm the same as the first string                        |
      | I'm a string containing € © >                          |
      | I'm a string containing € © >                          |
      And I expect the elements "Demo=>Text comparison elements" texts to not match:
      | Values |
      | lorem  |
      | ipsum  |

  Scenario: Elements texts contains an array
    Then I expect the elements "Demo=>Text comparison elements" texts to contain:
      | Values                            |
      | I'm the same as the first string  |
      | I'm the same as the second string |
      | I'm a string containing € © >    |
      And I expect the elements "Demo=>Text comparison elements" texts to not contain:
      | Values |
      | lorem  |
      | ipsum  |
