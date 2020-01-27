Feature: Section 19

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 19" to exist

  Scenario: Move to element
    When I move to the element "Demo=>Move to"
    Then I expect the viewport image to match the reference "section-19/viewport-01"

  Scenario: Move to element with offset
    When I move to the element "Demo=>Move to" with an offset of 200,200
    Then I expect the viewport image to match the reference "section-19/viewport-02"
