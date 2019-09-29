Feature: Section 16 of the Demo App

  Background:
    Given I have a screen that is maximized
      And I open the url of the page "Demo"
      And I expect the element "Demo=>Section 16" to exist

  Scenario: Set element text with a key press
    When I press the "Escape" key
    Then I expect the element "Demo=>Key bind" text to be "27"
    When I press the "a" key
    Then I expect the element "Demo=>Key bind" text to not be "27"

  Scenario: Set content to an input field inside an iframe
    When I focus on the iframe "Demo=>Sample Iframe"
      And I type "lipsum" on the field "Demo=>Iframe input"
    Then I expect the field "Demo=>Iframe input" value to be "lipsum"
      And I expect the element "Demo=>Section 16" to not exist
    But I focus on the parent context
    Then I expect the element "Demo=>Section 16" to exist
