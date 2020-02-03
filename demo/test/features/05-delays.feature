Feature: V. Delays

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url "/"
      And I click the "V. Delays" navigation item
      And I expect the section header "V. Delays" to exist

  Scenario: Toggle element visibility with delay on button click
    When I click the button "#makeElemVisibleBtn"
    Then I expect the element "#makeElemVisibleDest" to be displayed
      And I expect the page image to match the reference "05-delays/01-page"
      But I click the button "#makeElemVisibleBtn" again
    Then I expect the element "#makeElemVisibleDest" to not be displayed

  Scenario: Toggle element enabled state with delay on button click
    When I click the button "#makeElemEnabledBtn"
    Then I expect the element "#makeElemEnabledDest" to be enabled
      And I expect the element "#makeElemEnabledDest" image to match the reference "05-delays/02-element"
      But I click the button "#makeElemEnabledBtn" again
    Then I expect the element "#makeElemEnabledDest" to not be enabled

  Scenario: Resize element with delay on button click
    When I move to the element "#resizeElemDest"
      And I click the button "#resizeElemBtn"
    Then I expect the element "#resizeElemDest" to be 250px broad and 250px tall
      And I expect the element "#resizeElemDest" to be 250px broad
      And I expect the element "#resizeElemBtn" to be 46px tall
      And I expect the viewport image to match the reference "05-delays/03-viewport"
      But I click the button "#resizeElemBtn" again
    Then I expect the element "#resizeElemDest" to not be 250px broad and 250px tall
      And I expect the element "#resizeElemDest" to not be 250px broad
      And I expect the element "#resizeElemBtn" to not be 45px tall
