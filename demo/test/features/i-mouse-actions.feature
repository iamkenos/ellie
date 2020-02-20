Feature: I. Mouse Actions

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url of the page "Demo"
      And I click the "I. Mouse Actions" navigation item
      And I expect the section header "I. Mouse Actions" to exist

  Scenario: Create new element on button click
    When I click the button "#createElemBtn"
    Then I expect the element "#createElemDest" to exist
      But I click the button "#createElemBtn" again
    Then I expect the element "#createElemDest" to not exist
      And I expect the page title to be "Demo Page"
      And I expect the page title to be that of the page "Demo"

  Scenario: Change element text on button right click
    When I right click the button "#changeTxtBtn"
    Then I expect the element "#changeTxtDest" text to contain "[changeTxtBtn]"
      And I expect the element "#changeTxtDest" text to be "This text is changed by [changeTxtBtn]..."
      And I expect the element "#changeTxtDest" text to not be empty
      But I right click the button "#changeTxtBtn" again
    Then I expect the element "#changeTxtDest" text to not contain "[changeTxtBtn]"
      And I expect the element "#changeTxtDest" text to not be "This text is changed by [changeTxtBtn]..."
      And I expect the element "#changeTxtDest" text to be empty

  Scenario: Change element value on button middle click
    When I middle click the button "#changeValBtn"
    Then I expect the field "#changeValDest" value to contain "[changeValBtn]"
      And I expect the field "#changeValDest" value to be "This value is changed by [changeValBtn]..."
      And I expect the field "#changeValDest" value to not be empty
      And I expect the field "#changeValDest" attribute "class" to contain "success"
      And I expect the field "#changeValDest" attribute "class" to be "text-success"
      And I expect the field "#changeValDest" attribute "class" to exist
      And I expect the field "#changeValDest" attribute "class" to not contain "lipsum"
      And I expect the field "#changeValDest" attribute "class" to not be "lipsum"
      But I middle click the button "#changeValBtn" again
    Then I expect the field "#changeValDest" value to not contain "[changeValBtn]"
      And I expect the field "#changeValDest" value to not be "This value is changed by [changeValBtn]..."
      And I expect the field "#changeValDest" value to be empty
      And I expect the field "#changeValDest" attribute "class" to not exist

  Scenario: Change element inner html on button double click
    When I double click the button "#changeInnerHtmlBtn"
    Then I expect the element "#changeInnerHtmlBtn" to not be enabled
      And I expect the element "#changeInnerHtmlDest" text to contain:
      """
      this element
      to revert the changes of
      """
      And I expect the element "#changeInnerHtmlDest" text to match:
      """
      Double click

      this element
      to revert the changes of
      [changeInnerHtmlBtn]...
      """
      And I expect the field "#changeInnerHtmlDest" css property "border-color" to exist
      But I double click the element "#changeInnerHtmlDest"
    Then I expect the element "#changeInnerHtmlBtn" to be enabled
      And I expect the element "#changeInnerHtmlDest" text to not contain:
      """
      this element
      to revert the changes of
      """
      And I expect the element "#changeInnerHtmlDest" text to not match:
      """
      Double click

      this element
      to revert the changes of
      [changeInnerHtmlBtn]...
      """
      And I expect the field "#changeInnerHtmlDest" css property "lipsum" to not exist

  Scenario: Drag an element to another element
    When I drag the element "#draggableBox" to the element "#draggableBoxDest"
    Then I expect the element "#draggableBoxDest" text to be "This text is changed by [draggableBox]..."
      And I expect the element "#draggableBoxDest" location at x axis to be 372.5
      And I expect the element "#draggableBoxDest" location at x axis to not be 255.5
      And I expect the element "#draggableBoxDest" location at y axis to be 2521.65625
      And I expect the element "#draggableBoxDest" location at y axis to not be 255.5
      And I expect the page title to contain "emo Pag"
      And I expect the page title to contain that of the page "demo"

  Scenario: Move to existing element
    When I move to the element "#moveToElementBox"
    Then I expect the element "#moveToElementBoxDest" text to be "X: 379 | Y: 2844"
      But I move to the element "h3=Move To"
      And I move to the element "#moveToElementBox" with an offset of 5,10
    Then I expect the element "#moveToElementBoxDest" text to be "X: 317 | Y: 2831"

  Scenario: Scroll to existing element
    When I scroll to the element "#scrollToElementBox"
    Then I expect the element "#scrollToElementBoxDest" text to be "Left: 372.5 | Top: 1007.65625"

  Scenario: Scroll to a part of the window
    When I scroll to the bottom of the page
    Then I expect the element "#scrollToElementBoxDest" to be displayed within the viewport
      And I expect the element "#scrollToElementBoxDest" text to be "Left: 372.5 | Top: 1007.65625"
      But I scroll to the top of the page
    Then I expect the element "#scrollToElementBoxDest" to not be displayed within the viewport
      And I expect the element "#scrollToElementBoxDest" text to be ""
    When I scroll to the coordinates 300.2950 of the page
    Then I expect the element "#scrollToElementBoxDest" text to be "Left: 372.5 | Top: 1007.65625"
