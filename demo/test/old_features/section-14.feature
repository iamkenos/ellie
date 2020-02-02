Feature: Section 14

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I expect the section header "SECTION 14" to exist

  Scenario: Submit a form
    When I start to intercept ajax requests
      And I type "foo" on the field "Demo=>Form input"
      And I click the button "Demo=>Submit button"
    Then I expect the ajax requests to match the reference "section-14/ajax-requests-01"