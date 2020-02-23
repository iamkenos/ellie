Feature: I. Mouse Actions

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the "Demo" page's url
      And I click the "I. Mouse Actions" navigation item
      And I expect the section header "I. Mouse Actions" to exist

  Scenario: Create new element on button click
    When I click the "#createElemBtn" button
    Then I expect the "#createElemDest" element to exist
      But I click the "#createElemBtn" button again
    Then I expect the "#createElemDest" element to not exist
      And I expect the page title to be "Demo Page"
      And I expect the page title to match the "Demo" page's title

  Scenario: Change element text on button right click
    When I right click the "#changeTxtBtn" button
    Then I expect the "#changeTxtDest" element text to contain "[changeTxtBtn]"
      And I expect the "#changeTxtDest" element text to be "This text is changed by [changeTxtBtn]..."
      And I expect the "#changeTxtDest" element text to not be empty
      But I right click the "#changeTxtBtn" button again
    Then I expect the "#changeTxtDest" element text to not contain "[changeTxtBtn]"
      And I expect the "#changeTxtDest" element text to not be "This text is changed by [changeTxtBtn]..."
      And I expect the "#changeTxtDest" element text to be empty

  Scenario: Change element value on button middle click
    When I middle click the "#changeValBtn" button
    Then I expect the "#changeValDest" field value to contain "[changeValBtn]"
      And I expect the "#changeValDest" field value to be "This value is changed by [changeValBtn]..."
      And I expect the "#changeValDest" field value to not be empty
      And I expect the "#changeValDest" field "class" attribute to contain "success"
      And I expect the "#changeValDest" field "class" attribute to be "text-success"
      And I expect the "#changeValDest" field "class" attribute to exist
      And I expect the "#changeValDest" field "class" attribute to not contain "lipsum"
      And I expect the "#changeValDest" field "class" attribute to not be "lipsum"
      But I middle click the "#changeValBtn" button again
    Then I expect the "#changeValDest" field value to not contain "[changeValBtn]"
      And I expect the "#changeValDest" field value to not be "This value is changed by [changeValBtn]..."
      And I expect the "#changeValDest" field value to be empty
      And I expect the "#changeValDest" field "class" attribute to not exist

  Scenario: Change element inner html on button double click
    When I double click the "#changeInnerHtmlBtn" button
    Then I expect the "#changeInnerHtmlBtn" element to not be enabled
      And I expect the "#changeInnerHtmlDest" element text to contain:
      """
      this element
      to revert the changes of
      """
      And I expect the "#changeInnerHtmlDest" element text to match:
      """
      Double click

      this element
      to revert the changes of
      [changeInnerHtmlBtn]...
      """
      And I expect the "#changeInnerHtmlDest" field "border-color" css property to exist
      But I double click the "#changeInnerHtmlDest" element
    Then I expect the "#changeInnerHtmlBtn" element to be enabled
      And I expect the "#changeInnerHtmlDest" element text to not contain:
      """
      this element
      to revert the changes of
      """
      And I expect the "#changeInnerHtmlDest" element text to not match:
      """
      Double click

      this element
      to revert the changes of
      [changeInnerHtmlBtn]...
      """
      And I expect the "#changeInnerHtmlDest" field "lipsum" css property to not exist

  Scenario: Drag an element to another element
    When I drag the "#draggableBox" element to the "#draggableBoxDest" element
    Then I expect the "#draggableBoxDest" element text to be "This text is changed by [draggableBox]..."
      And I expect the "#draggableBoxDest" element location at x axis to be 372.5
      And I expect the "#draggableBoxDest" element location at x axis to not be 255.5
      And I expect the "#draggableBoxDest" element location at y axis to be 2521.65625
      And I expect the "#draggableBoxDest" element location at y axis to not be 255.5
      And I expect the page title to contain "emo Pag"
      And I expect the page title to contain the "demo" page's title

  Scenario: Move to existing element
    When I move to the "#moveToElementBox" element
    Then I expect the "#moveToElementBoxDest" element text to be "X: 379 | Y: 2844"
      But I move to the "h3=Move To" element
      And I move to the "#moveToElementBox" element with an offset of 5,10
    Then I expect the "#moveToElementBoxDest" element text to be "X: 317 | Y: 2831"

  Scenario: Scroll to existing element
    When I scroll to the "#scrollToElementBox" element
    Then I expect the "#scrollToElementBoxDest" element text to be "Left: 372.5 | Top: 1007.65625"

  Scenario: Scroll to a part of the window
    When I scroll to the bottom of the page
    Then I expect the "#scrollToElementBoxDest" element to be displayed within the viewport
      And I expect the "#scrollToElementBoxDest" element text to be "Left: 372.5 | Top: 1007.65625"
      But I scroll to the top of the page
    Then I expect the "#scrollToElementBoxDest" element to not be displayed within the viewport
      And I expect the "#scrollToElementBoxDest" element text to be ""
    When I scroll to the coordinates 300.2950 of the page
    Then I expect the "#scrollToElementBoxDest" element text to be "Left: 372.5 | Top: 1007.65625"
