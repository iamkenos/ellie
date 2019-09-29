Feature: Section 1

  Background:
    Given I have a screen that is maximized
      And I open the url of the page "Demo"
      And I expect the element "Demo=>Section 1" to exist

  Scenario: Drag an element to another element
    When I drag the element "Demo=>Draggable box" to the element "Demo=>Drop zone"
    Then I expect the element "Demo=>Drop zone" text to be "Dropped!"

  Scenario: Compare page image
    When I scroll to the element "Demo=>Section 1"
    Then I expect the page image to match the reference "section-1/page-01"

  Scenario: Compare viewport image
    When I scroll to the top of the page
    Then I expect the viewport image to match the reference "section-1/viewport-01"
    But I scroll to the coordinates 10.200 of the page
      And I expect the viewport image to match the reference "section-1/viewport-02"
    But I scroll to the bottom of the page
      And I expect the viewport image to match the reference "section-1/viewport-03"

  Scenario: Compare element image
    When I scroll to the element "Demo=>Section 1"
    Then I expect the element "Demo=>Section 1" image to match the reference "section-1/element-01"

