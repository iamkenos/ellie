# Seeded Steps

➤ [Home](../README.md)

---

## When

- `When I (?:(double|script|middle|right) )?click the(?: "([^"]*)?" page's)? "([^"]*)?" (link|button|element)(?: again)?`

  - click, double click, javascript click, middle click, or right click on a link or element

    ```gherkin
    When I click the "openInSameWindowLink" link
    When I double click the "#changeInnerHtmlBtn" button
    When I right click the "#changeTxtBtn" button
    When I middle click the "#changeValBtn" button
    When I script click the "#makeElemVisibleBtn" button
    ```

- `When I drag the(?: "([^"]*)?" page's)? "([^"]*)?" element to the "([^"]*)?" element`

  - drag an element and drop it to another element

    ```gherkin
    When I drag the "#draggableBox" element to the "#draggableBoxDest" element
    ```

- `When I upload the "([^"]*)?" file to the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)`

  - upload a file located relative to the config file

    ```gherkin
    When I upload the ".files/demo.txt" file to the "#fmFileInput" field
    ```

- `When I focus on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)`

  - set focus on an element

    ```gherkin
    When I focus on "#keyPress" the field
    ```

- `When I move to the(?: "([^"]*)?" page's)? "([^"]*)?" element(?: with an offset of (\d+),(\d+))?`

  - move mouse to the center of an element with an optional x and y offsets

    ```gherkin
    When I move to the "#moveToElementBox" element
    When I move to the "#moveToElementBox" element with an offset of 5,10
    ```

- `When I select the option with (index|label|[^" ]*) "([^"]*)?" from the(?: "([^"]*)?" page's)? "([^"]*)?" dropdown`

  - select a dropdown option by index, label, or other attributes

    ```gherkin
    When I select the option with index "3" from the "#fmSelect" dropdown
    When I select the option with label "Option 3" from the "#fmSelect" dropdown
    When I select the option with value "option-3" from the "#fmSelect" dropdown
    ```

- `When I (select|deselect) the(?: "([^"]*)?" page's)? "([^"]*)?" (?:element|option|check box|toggle item|radio button)`

  - select or deselect a toggle item

    ```gherkin
    When I select the "#fmInputCheck2" check box
    When I select the "#fmInputRadio2" radio button
    ```

- `When I scroll to the(?: "([^"]*)?" page's)? "([^"]*)?" element`

  - scroll to an element so that it becomes visible on the viewport

    ```gherkin
    When I scroll to the "#scrollToElementBox" element
    ```

- `When I clear the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)`

  - clear the value of an element

    ```gherkin
    When I clear the "#fmTextarea" field
    ```

- `When I (type|append) "([^"]*)?" on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)`

  - set or append a value of an element

    ```gherkin
    When I type "This text is " on the "#fmInput" field
    When I append "appended on [fmInput]..." on the "#fmInput" field
    ```

- `When I (type|append) a multi-line value on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element):`

  - set or append a multi-line of an element

    ```gherkin
    When I type a multi-line value on the "#fmTextarea" field:
      """
      This

      text is
      """
    When I append a multi-line value on the "#fmTextarea" field:
      """

      appended
      on [fmTextarea]...
      """
    ```

- `When I start to intercept (?:ajax|xhr) requests`

  - begin to listen for ajax requests to intercept

    ```gherkin
    When I start to intercept ajax requests
    ```

- `When I close all except the parent (?:window|tab)`

  - close all windows except the source of all these other windows

    ```gherkin
    When I close all except the parent window
    ```

- `When I delete the "([^"]*)?" site cookie`

  - delete a browser cookie given a name

    ```gherkin
    When I delete the "cookie-3" site cookie
    ```

- `When I delete the site cookies`

  - delete all browser cookies

    ```gherkin
    When I delete the site cookies
    ```

- `When I set the "([^"]*)?" site cookie value to "([^"]*)?"`

  - create a cookie given a name and value

    ```gherkin
    When I set the "cookie-1" site cookie value to "value-1"
    ```

- `When I press the "([^"]*)?" key`

  - simulate a key press

    ```gherkin
    When I press the "Escape" key
    When I press the "a" key
    ```

- `When I close the last opened (?:window|tab)`

  - close the last opened window

    ```gherkin
    When I close the last opened window
    ```

- `When I focus on the last opened (?:window|tab)`

  - switch focus to the last opened window

    ```gherkin
    When I focus on the last opened window
    ```

- `When I (accept|dismiss) the (?:alert|confirm box|prompt)`

  - accept or dissmiss a browser alert, confirm box, or prompt

    ```gherkin
    When I accept the alert
    When I dismiss the confirm box
    When I accept the prompt
    ```

- `When I type "([^"]*)?" on the prompt`

  - enter a value on a browser prompt

    ```gherkin
    When I type "This prompt box is opened by [openPromptLink]..." on the prompt
    ```

- `When I navigate (back|forward) from the current page(?: (\d+) times)?`

  - simulate a browser back and forward navigation with an optional count

    ```gherkin
    When I back forward from the current page
    When I navigate forward from the current page
    When I navigate forward from the current page 2 times
    ```

- `When I pause for (\d+)ms`

  - pause explicitly for a number of milliseconds

    ```gherkin
    When I pause for 2000ms
    ```

- `When I focus on the parent (?:window|tab)`

  - switch focus on the parent window

    ```gherkin
    When I focus on the parent window
    ```

- `When I refresh the page`

  - simulate a browser refresh

    ```gherkin
    When I refresh the page
    ```

- `When I scroll to the (top|bottom) of the page`

  - scroll to either the top or bottom of the current page

    ```gherkin
    When I scroll to the top of the page
    When I scroll to the bottom of the page
    ```

- `When I scroll to the coordinates (\d+).(\d+) of the page`

  - scroll to a given x and y coordinates of the current page

    ```gherkin
    When I scroll to the coordinates 300.2950 of the page
    ```

- `When I have a screen that is maximized`

  - maximize the browser window

    ```gherkin
    When I have a screen that is maximized
    ```

- `When I have a screen that is ([\d]+) by ([\d]+) pixels`

  - set the size of the browser viewport

    ```gherkin
    When I have a screen that is 1600 by 1024 pixels
    ```

- `When I focus on the(?: "([^"]*)?" page's)? (?:"([^"]*)?" iframe|parent context)`

  - set browser focus to an iframe given an identifier, or back to the parent context

    ```gherkin
    When I focus on the "#showPageInIframe" iframe
    When I focus on the parent context
    ```

- `When I open the (?:"([^"]*)?" page's url|url "([^"]*)?")`

  - open a page url

    ```gherkin
    When I open the url "http://localhost:8080"
    When I open the "Demo" page's url
    ```

- `When I open the (?:"([^"]*)?" page's url|url "([^"]*)?") on a new window`

  - open a page url on a new window

    ```gherkin
    When I open the url "http://localhost:8080" on a new window
    When I open the "Demo" page's url on a new window
    ```

## Then

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? contain "([^"]*)?"`

  - assert that an element's attribute contain a given value or not

    ```gherkin
    Then I expect the "#changeValDest" field "class" attribute to contain "success"
    Then I expect the "#changeValDest" field "class" attribute to not contain "success"
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? be "([^"]*)?"`

  - assert that an element's attribute matches a given value or not

    ```gherkin
    Then I expect the "#changeValDest" field "class" attribute to be "text-success"
    Then I expect the "#changeValDest" field "class" attribute to not be "text-success"
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? exist`

  - assert that an element's attribute exists or not

    ```gherkin
    Then I expect the "#changeValDest" field "class" attribute to exist
    Then I expect the "#changeValDest" field "class" attribute to not exist
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element location at (x|y) axis to( not)? be ([\d+.?\d*]+)`

  - assert that an element's x and y coordinates matches a given value or not

    ```gherkin
    Then I expect the "#draggableBoxDest" element location at x axis to be 372.5
    Then I expect the "#draggableBoxDest" element location at x axis to not be 255.5
    Then I expect the "#draggableBoxDest" element location at y axis to be 2521.65625
    Then I expect the "#draggableBoxDest" element location at y axis to not be 255.5
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element count to( not)? be "([^"]*)?"`

  - assert that an element's count matches a given value or not

    ```gherkin
    Then I expect the "iFrame" page's "Level 1 List Items" element count to be "0"
    Then I expect the "iFrame" page's "Level 1 List Items" element count to not be "0"
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element count to( not)? be (greater|less) than "([^"]*)?"`

  - assert that an element's count to be greater than or less than a given value or not

    ```gherkin
    Then I expect the "iFrame" page's "Level 1 List Items" element count to be greater than "4"
    Then I expect the "iFrame" page's "Level 1 List Items" element count to be less than "6"
    Then I expect the "iFrame" page's "Level 1 List Items" element count to not be greater than "6"
    Then I expect the "iFrame" page's "Level 1 List Items" element count to not be less than "4"
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" css property to( not)? exist`

  - assert that an element's css property exists or not

    ```gherkin
    Then I expect the "#changeInnerHtmlDest" field css "border-color" property to exist
    Then I expect the "#changeInnerHtmlDest" field css "border-color" property to not exist
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be displayed`

  - assert that an element is displayed or not

    ```gherkin
    Then I expect the "#makeElemVisibleDest" element to be displayed
    Then I expect the "#makeElemVisibleDest" element to not be displayed
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be displayed within the viewport`

  - assert that an element is displayed within the viewport or not

    ```gherkin
    Then I expect the "#makeElemVisibleDest" element to be displayed within the viewport
    Then I expect the "#makeElemVisibleDest" element to not be displayed within the viewport
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be enabled`

  - assert that an element is enabled or not

    ```gherkin
    Then I expect the "#makeElemEnabledDest" element to be enabled
    Then I expect the "#makeElemEnabledDest" element to not be enabled
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? exist`

  - assert that an element is existing or not

    ```gherkin
    Then I expect the "#createElemDest" element to exist
    Then I expect the "#createElemDest" element to not exist
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? have focus`

  - assert that an element is focused on or not

    ```gherkin
    Then I expect the "#keyPress" element to have focus
    Then I expect the "#keyPressDest" element to not have focus
    ```

- `I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (link|link text) to( not)? open (?:on (?:a|the)? )?(new window|same frame|parent frame|top frame|without a target)`

  - assert that a link opens on a specific target or not

    ```gherkin
    Then I expect the "#changeTxtDest" link text to open on a new window
    Then I expect the "#changeTxtBtnLink2" link to open on the same frame
    Then I expect the "#changeTxtBtnLink3" link to open on the parent frame
    Then I expect the "#changeTxtBtnLink4" link to open on the top frame
    Then I expect the "#changeTxtBtnLink6" link to open without a target
    ```

- `I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (link|link text) to( not)? open on a named frame "([^"]*)?"`

  - assert that a link opens on a specific named frame or not

    ```gherkin
    Then I expect the "#changeTxtBtnLink5" link to open on a named frame "framename"
    ```

- `I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (link|link text) to( not)? point (?:to (?:a|an)? |to )?(?:(path|section|absolute url|mail|tel)? )?"([^"]*)?"`

  - assert that a link points to either a path, url, protocol, script or not

    ```gherkin
    Then I expect the "#changeTxtDest" link text to point to a path "/internal/path"
    Then I expect the "#changeTxtBtnLink2" link to point to a section "#content1"
    Then I expect the "#changeTxtBtnLink3" link to point to a mail "someone@example.com"
    Then I expect the "#changeTxtBtnLink4" link to point to a tel "+4733378901"
    Then I expect the "#changeTxtBtnLink5" link to point to an absolute url "https://otherdomain.com/external/path"
    Then I expect the "#changeTxtBtnLink6" link to point to "javascript:alert('Hello World!');"
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element image to( not)? match the reference "([^"]*)?"`

  - assert that an element matches a reference image, relative to the config file or not

    ```gherkin
    Then I expect the "#makeElemEnabledDest" element image to match the reference "05-delays/02-element"
    Then I expect the "#makeElemEnabledDest" element image to not match the reference "05-delays/02-element"
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:element|option|check box|toggle item|radio button) to( not)? be (?:checked|selected)`

  - assert that a toggle item is selected or not

    ```gherkin
    Then I expect the "#fmInputCheck2" check box to be selected
    Then I expect the "#fmInputRadio2" radio button to not be selected
    ```

- `Then I expect the option with (index|label|[^" ]*) "([^"]*)?" from the(?: "([^"]*)?" page's)? "([^"]*)?" dropdown to( not)? be selected`

  - assert that a dropdown option that matches an index, label, or attribute is selected or not

    ```gherkin
    Then I expect the option with index "3" from the "#fmSelect" dropdown to be selected
    Then I expect the option with label "Option 0" from the "#fmSelect" dropdown to not be selected
    Then I expect the option with value "option-3" from the "#fmSelect" dropdown to be selected
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be ([\d]+)px broad and ([\d]+)px tall`

  - assert that an element's width and height matches a given value or not

    ```gherkin
    Then I expect the "#resizeElemDest" element to be 250px broad and 250px tall
    Then I expect the "#resizeElemDest" element to not be 200px broad and 200px tall
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be ([\d]+)px (broad|tall)`

  - assert that an element's width or height matches a given value or not

    ```gherkin
    Then I expect the "#resizeElemDest" element to be 250px broad
    Then I expect the "#resizeElemBtn" element to be 46px tall
    Then I expect the "#resizeElemDest" element to not be 200px broad
    Then I expect the "#resizeElemBtn" element to not be 45px tall
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? contain "([^"]*)?"`

  - assert that an element's text contains a given value or not

    ```gherkin
    Then I expect the "#changeTxtDest" element text to contain "[changeTxtBtn]"
    Then I expect the "#changeTxtDest" element text to not contain "[changeTxtBtn]"
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? contain:`

  - assert that an element's text contains a given multi-line value or not

    ```gherkin
    Then I expect the "#changeInnerHtmlDest" element text to contain:
    """
    this element
    to revert the changes of
    """
    Then I expect the "#changeInnerHtmlDest" element text to not contain:
    """
    this element
    to revert the changes of
    """
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" elements text array to( not)? contain:`

  - assert that an array of elements' text contain a given array value or not

    ```gherkin
    Then I expect the "iFrame" page's "Level 1 List Items" elements text array to contain:
      | Values |
      | Item 3 |
      | Item 4 |
    Then I expect the "iFrame" page's "Level 1 List Items" elements text array to not contain:
      | Values |
      | Item 0 |
      | Item 1 |
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? be empty`

  - assert that an element's text is empty or not

    ```gherkin
    Then I expect the "#changeTxtDest" element text to be empty
    Then I expect the "#changeTxtDest" element text to not be empty
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? be "([^"]*)?"`

  - assert that an element's text matches a given value or not

    ```gherkin
    Then I expect the "#changeTxtDest" element text to be "This text is changed by [changeTxtBtn]..."
    Then I expect the "#changeTxtDest" element text to not be "This text is changed by [changeTxtBtn]..."
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? match:`

  - assert that an element's text matches a given multi-line value or not

    ```gherkin
    Then I expect the "#changeInnerHtmlDest" element text to match:
      """
      Double click

      this element
      to revert the changes of
      [changeInnerHtmlBtn]...
      """
    Then I expect the "#changeInnerHtmlDest" element text to not match:
      """
      Double click

      this element
      to revert the changes of
      [changeInnerHtmlBtn]...
      """
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" elements text array to( not)? match:`

  - assert that an array of elements' text match a given array or not

    ```gherkin
    Then I expect the "iFrame" page's "Level 2 List Items" elements text array to match:
      | Values   |
      | Item 4.A |
      | Item 4.B |
    Then I expect the "iFrame" page's "Level 2 List Items" elements text array to not match:
      | Values   |
      | Item 4.A |
      | Item 4.B |
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? contain "([^"]*)?"`

  - assert that an element's value contains a given value or not

    ```gherkin
    Then I expect the "#changeValDest" field value to contain "[changeValBtn]"
    Then I expect the "#changeValDest" field value to not contain "[changeValBtn]"
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? contain:`

  - assert that an element's multi-line value contains a given multi-line value or not

    ```gherkin
    Then I expect the "#fmTextarea" field value to contain:
      """

      text is
      """
    Then I expect the "#fmTextarea" field value to not contain:
      """

      text is
      """
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? be empty`

  - assert that an element's value is empty or not

    ```gherkin
    Then I expect the "#fmInput" field value to be empty
    Then I expect the "#fmInput" field value to not be empty
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? be "([^"]*)?"`

  - assert that an element's value matches a given value or not

    ```gherkin
    Then I expect the "#fmInput" field value to be "This text is appended on [fmInput]..."
    Then I expect the "#fmInput" field value to not be "This text is appended on [fmInput]..."
    ```

- `Then I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? match:`

  - assert that an element's multi-line value matches a given multi-line value or not

    ```gherkin
    Then I expect the "#fmTextarea" field value to match:
      """
      This

      text is
      appended
      on [fmTextarea]...
      """
    Then I expect the "#fmTextarea" field value to not match:
      """
      This

      text is
      appended
      on [fmTextarea]...
      """
    ```

- `Then I expect the (?:ajax|xhr) requests to( not)? match the reference "([^"]*)?"`

  - assert that the intercepted ajax requsts match a reference file, relative to the config file or not

    ```gherkin
    Then I expect the ajax requests to match the reference "06-requests/03-post-reqres-login"
    Then I expect the ajax requests to not match the reference "06-requests/03-post-reqres-login"
    ```

- `Then I expect the "([^"]*)?" site cookie value to( not)? contain "([^"]*)?"`

  - assert that a browser cookie contains a given value or not

    ```gherkin
    Then I expect the "cookie-1" site cookie value to contain "ue-1"
    Then I expect the "cookie-1" site cookie value to not contain "ue-1"
    ```

- `Then I expect the "([^"]*)?" site cookie value to( not)? be "([^"]*)?"`

  - assert that a browser cookie matches a given value or not

    ```gherkin
    Then I expect the "cookie-2" site cookie value to be "value-2"
    Then I expect the "cookie-2" site cookie value to not be "value-2"
    ```

- `Then I expect the "([^"]*)?" site cookie value to( not)? exist`

  - assert that a browser cookie exists or not

    ```gherkin
    Then I expect the "cookie-2" site cookie value to exist
    Then I expect the "cookie-2" site cookie value to not exist
    ```

- `Then I expect the (?:window|tab) count to( not)? be "([^"]*)?"`

  - assert that a browser window count to match a given value or not

    ```gherkin
    Then I expect the window count to be "4"
    Then I expect the window count to not be "1"
    ```

- `Then I expect the (?:window|tab) count to( not)? be (greater|less) than "([^"]*)?"`

  - assert that a browser window count to be greater than or less than a given value or not

    ```gherkin
    Then I expect the window count to be greater than "1"
    Then I expect the window count to be less than "3"
    Then I expect the window count to not be greater than "2"
    Then I expect the window count to not be less than "2"
    ```

- `Then I expect the captured google analytics(?: event "([^"]*)?" )? to( not)? match the reference "([^"]*)?"`

  - assert that the captured google analytics tracking match a reference file, relative to the config file or not

    ```gherkin
    Then I expect the captured google analytics to match the reference "06-requests/05-ga-tracking"
    ```

- `Then I expect the response to the following request to( not)? match the reference "([^"]*)?":`

  - assert that the response of a given http requests match a reference file, relative to the config file or not

    ```gherkin
    Then I expect the response to the following request to match the reference "06-requests/02-get-reqres-users":
      """
      {
        "url": "https://reqres.in/api/users",
        "qs": {
          "page": 2
        }
      }
      """
    Then I expect the response to the following request to not match the reference "06-requests/02-get-reqres-users":
      """
      {
        "url": "https://reqres.in/api/users",
        "qs": {
          "page": 2
        }
      }
      """
    ```

- `Then I expect the (viewport|page) image to( not)? match the reference "([^"]*)?"`

  - assert that the viewport or page matches a reference image, relative to the config file or not

    ```gherkin
    Then I expect the page image to match the reference "05-delays/01-page"
    Then I expect the viewport image to match the reference "05-delays/03-viewport"
    Then I expect the page image to not match the reference "05-delays/01-page"
    Then I expect the viewport image to not match the reference "05-delays/03-viewport"
    ```

- `Then I expect (?:a|an) (?:alert|confirm box|prompt) to( not)? be opened`

  - assert that a browser alert, confirm box, or prompt is open or not

    ```gherkin
    Then I expect an alert to be opened
    Then I expect a confirm box to not be opened
    Then I expect a prompt to be opened
    ```

- `Then I expect the (?:alert|confirm box|prompt) text to( not)? contain "([^"]*)?"`

  - assert that a browser alert, confirm box, or prompt text contains a given value or not

    ```gherkin
    Then I expect the alert text to contain "This alert box is opened by"
    Then I expect the confirm box text to not contain "This confirm box box is opened by"
    Then I expect the prompt text to contain "This prompt box is opened by"
    ```

- `Then I expect the (?:alert|confirm box|prompt) text to( not)? be "([^"]*)?"`

  - assert that a browser alert, confirm box, or prompt text matches a given value or not

    ```gherkin
    Then I expect the alert text to be "This alert box is opened by openAlertLink"
    Then I expect the confirm box text to not be "This confirm box box is opened by openConfirmLink"
    Then I expect the prompt text to be "This prompt box is opened by openPromptLink"
    ```

- `Then I expect the (?:window|page) title to( not)? contain (?:"([^"]*)?"|the "([^"]*)?" page's title)`

  - assert that the window title contains a given value or not

    ```gherkin
    Then I expect the page title to contain "emo Pag"
    Then I expect the page title to contain the "demo" page's title
    Then I expect the page title to not contain "Femo Pag"
    Then I expect the page title to not contain the "iFrame" page's title
    ```

- `Then I expect the (?:window|page) title to( not)? (?:be|match) (?:"([^"]*)?"|the "([^"]*)?" page's title)`

  - assert that the window title matches a given value or not

    ```gherkin
    Then I expect the page title to be "Demo Page"
    Then I expect the page title to match the "Demo" page's title
    Then I expect the page title to not be "Femo Page"
    Then I expect the page title to not match the "iFrame" page's title
    ```

- `Then I expect the url to( not)? contain (?:"([^"]*)?"|the "([^"]*)?" page's url)`

  - assert that the window url contains a given value or not

    ```gherkin
    Then I expect the url to contain "index"
    Then I expect the url to contain the "Demo" page's title
    Then I expect the url to not contain "iframe"
    Then I expect the url to not contain the "iFrame" page's title
    ```

- `Then I expect the url to( not)? (?:be|match) (?:"([^"]*)?"|the "([^"]*)?" page's url)`

  - assert that the window url matches a given value or not

    ```gherkin
    Then I expect the url to be "http://localhost:8080/index.html"
    Then I expect the url to match the "Demo" page's url
    Then I expect the url to not be "http://localhost:8080/iframe.html"
    Then I expect the url to not match the "iFrame" page's url
    ```

- `Then I expect the url path to( not)? contain "([^"]*)?"`

  - assert that the window url path contains a given value or not

    ```gherkin
    Then I expect the url path to contain "broken"
    Then I expect the url path to not contain "iframe"
    ```

- `Then I expect the url path to( not)? be "([^"]*)?"`

  - assert that the window url path matches a given value or not

    ```gherkin
    Then I expect the url path to be "/broken.html"
    Then I expect the url path to not be "/index.html"
    ```
