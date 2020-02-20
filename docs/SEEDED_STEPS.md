# Seeded Steps

➤ [Home](../README.md)

---

## When

- `When I ((double|script|middle|right)(?: ))?click the (link|button|element) "([^"]*)?"(?: again)?`

  - click, double click, javascript click, middle click, or right click on a link or element

    ```gherkin
    When I click the link "openInSameWindowLink"
    When I double click the button "#changeInnerHtmlBtn"
    When I right click the button "#changeTxtBtn"
    When I middle click the button "#changeValBtn"
    When I script click the button "#makeElemVisibleBtn"
    ```

- `When I drag the element "([^"]*)?" to the element "([^"]*)?"`

  - drag an element and drop it to another element

    ```gherkin
    When I drag the element "#draggableBox" to the element "#draggableBoxDest"
    ```

- `When I upload the file "([^"]*)?" to the (?:field|element) "([^"]*)?"`

  - upload a file located relative to the config file

    ```gherkin
    When I upload the file ".files/demo.txt" to the field "#fmFileInput"
    ```

- `When I focus on the (?:field|element) "([^"]*)?"`

  - set focus on an element

    ```gherkin
    When I focus on the field "#keyPress"
    ```

- `When I move to the element "([^"]*)?"(?: with an offset of (\d+),(\d+))?`

  - move mouse to the center of an element with an optional x and y offsets

    ```gherkin
    When I move to the element "#moveToElementBox"
    When I move to the element "#moveToElementBox" with an offset of 5,10
    ```

- `When I select the option with (index|label|[^" ]*) "([^"]*)?" from the dropdown "([^"]*)?"`

  - select a dropdown option by index, label, or other attributes

    ```gherkin
    When I select the option with index "3" from the dropdown "#fmSelect"
    When I select the option with label "Option 3" from the dropdown "#fmSelect"
    When I select the option with value "option-3" from the dropdown "#fmSelect"
    ```

- `When I (select|deselect) the (?:element|option|check box|toggle item|radio button) "([^"]*)?"`

  - select or deselect a toggle item

    ```gherkin
    When I select the check box "#fmInputCheck2"
    When I select the radio button "#fmInputRadio2"
    ```

- `When I scroll to the element "([^"]*)?"`

  - scroll to an element so that it becomes visible on the viewport

    ```gherkin
    When I scroll to the element "#scrollToElementBox"
    ```

- `When I clear the (?:field|element) "([^"]*)?"`

  - clear the value of an element

    ```gherkin
    When I clear the field "#fmTextarea"
    ```

- `When I (type|append) "([^"]*)?" on the (?:field|element) "([^"]*)?"`

  - set or append a value of an element

    ```gherkin
    When I type "This text is " on the field "#fmInput"
    When I append "appended on [fmInput]..." on the field "#fmInput"
    ```

- `When I (type|append) a multi-line value on the (?:field|element) "([^"]*)?":`

  - set or append a multi-line of an element

    ```gherkin
    When I type a multi-line value on the field "#fmTextarea":
      """
      This

      text is
      """
    When I append a multi-line value on the field "#fmTextarea":
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

- `When I delete the cookie "([^"]*)?"`

  - delete a browser cookie given a name

    ```gherkin
    When I delete the cookie "cookie-3"
    ```

- `When I delete the cookies`

  - delete all browser cookies

    ```gherkin
    When I delete the cookies
    ```

- `When I set the cookie "([^"]*)?" with the content "([^"]*)?"`

  - create a cookie given a name and value

    ```gherkin
    When I set the cookie "cookie-1" with the content "value-1"
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

- `When I open the url (?:"([^"]*)?"|of the page "([^"]*)?") on a new window`

  - open a url with an optional page parameter, on a new window

    ```gherkin
    When I open the url "http://localhost:8080" on a new window
    When I open the url of the page "Demo" on a new window
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

  - Switch focus on the parent window

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

  - set the size of the browser viewpoert

    ```gherkin
    When I have a screen that is 1600 by 1024 pixels
    ```

- `When I focus on the (?:iframe "([^"]*)?"|parent context)`

  - set browser focus to an iframe given an identifier, or back to the parent context

    ```gherkin
    When I focus on the iframe "#showPageInIframe"
    When I focus on the parent context
    ```

- `When I open the url (?:"([^"]*)?"|of the page "([^"]*)?")`

  - open a url with an optional page parameter

    ```gherkin
    When I open the url "/"
    When I open the url of the page "Demo"
    ```

## Then

- `Then I expect the (?:ajax|xhr) requests to( not)? match the reference "([^"]*)?"`

  - assert that the intercepted ajax requsts match a reference file, relative to the config file or not

    ```gherkin
    Then I expect the ajax requests to match the reference "06-requests/03-post-reqres-login"
    Then I expect the ajax requests to not match the reference "06-requests/03-post-reqres-login"
    ```

- `Then I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? contain "([^"]*)?"`

  - assert that an element's attribute contain a given value or not

    ```gherkin
    Then I expect the field "#changeValDest" attribute "class" to contain "success"
    Then I expect the field "#changeValDest" attribute "class" to not contain "success"
    ```

- `Then I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? be "([^"]*)?"`

  - assert that an element's attribute matches a given value or not

    ```gherkin
    Then I expect the field "#changeValDest" attribute "class" to be "text-success"
    Then I expect the field "#changeValDest" attribute "class" to not be "text-success"
    ```

- `Then I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? exist`

  - assert that an element's attribute exists or not

    ```gherkin
    Then I expect the field "#changeValDest" attribute "class" to exist
    Then I expect the field "#changeValDest" attribute "class" to not exist
    ```

- `Then I expect the element "([^"]*)?" location at (x|y) axis to( not)? be ([\d+.?\d*]+)`

  - assert that an element's x and y coordinates matches a given value or not

    ```gherkin
    Then I expect the element "#draggableBoxDest" location at x axis to be 372.5
    Then I expect the element "#draggableBoxDest" location at x axis to not be 255.5
    Then I expect the element "#draggableBoxDest" location at y axis to be 2521.65625
    Then I expect the element "#draggableBoxDest" location at y axis to not be 255.5
    ```

- `Then I expect the cookie "([^"]*)?" value to( not)? contain "([^"]*)?"`

  - assert that a browser cookie contains a given value or not

    ```gherkin
    Then I expect the cookie "cookie-1" value to contain "ue-1"
    Then I expect the cookie "cookie-1" value to not contain "ue-1"
    ```

- `Then I expect the cookie "([^"]*)?" value to( not)? be "([^"]*)?"`

  - assert that a browser cookie matches a given value or not

    ```gherkin
    Then I expect the cookie "cookie-2" value to be "value-2"
    Then I expect the cookie "cookie-2" value to not be "value-2"
    ```

- `Then I expect the cookie "([^"]*)?" value to( not)? exist`

  - assert that a browser cookie exists or not

    ```gherkin
    Then I expect the cookie "cookie-2" value to exist
    Then I expect the cookie "cookie-2" value to not exist
    ```

- `Then I expect the element "([^"]*)?" count to( not)? be "([^"]*)?"`

  - assert that an element's count matches a given value or not

    ```gherkin
    Then I expect the element "iFrame=>Level 1 List Items" count to be "0"
    Then I expect the element "iFrame=>Level 1 List Items" count to not be "0"
    ```

- `Then I expect the element "([^"]*)?" count to( not)? be (greater|less) than "([^"]*)?"`

  - assert that an element's count to be greater than or less than a given value or not

    ```gherkin
    Then I expect the element "iFrame=>Level 1 List Items" count to be greater than "4"
    Then I expect the element "iFrame=>Level 1 List Items" count to be less than "6"
    Then I expect the element "iFrame=>Level 1 List Items" count to not be greater than "6"
    Then I expect the element "iFrame=>Level 1 List Items" count to not be less than "4"
    ```

- `Then I expect the (?:field|element) "([^"]*)?" css property "([^"]*)?" to( not)? exist`

  - assert that an element's css property exists or not

    ```gherkin
    Then I expect the field "#changeInnerHtmlDest" css property "border-color" to exist
    Then I expect the field "#changeInnerHtmlDest" css property "border-color" to not exist
    ```

- `Then I expect the element "([^"]*)?" to( not)? be displayed`

  - assert that an element is displayed or not

    ```gherkin
    Then I expect the element "#makeElemVisibleDest" to be displayed
    Then I expect the element "#makeElemVisibleDest" to not be displayed
    ```

- `Then I expect the element "([^"]*)?" to( not)? be displayed within the viewport`

  - assert that an element is displayed within the viewport or not

    ```gherkin
    Then I expect the element "#makeElemVisibleDest" to be displayed within the viewport
    Then I expect the element "#makeElemVisibleDest" to not be displayed within the viewport
    ```

- `Then I expect the element "([^"]*)?" image to( not)? match the reference "([^"]*)?"`

  - assert that an element matches a reference image, relative to the config file or not

    ```gherkin
    Then I expect the element "#makeElemEnabledDest" image to match the reference "05-delays/02-element"
    Then I expect the element "#makeElemEnabledDest" image to not match the reference "05-delays/02-element"
    ```

- `Then I expect the element "([^"]*)?" to( not)? be enabled`

  - assert that an element is enabled or not

    ```gherkin
    Then I expect the element "#makeElemEnabledDest" to be enabled
    Then I expect the element "#makeElemEnabledDest" to not be enabled
    ```

- `Then I expect the element "([^"]*)?" to( not)? exist`

  - assert that an element is existing or not

    ```gherkin
    Then I expect the element "#createElemDest" to exist
    Then I expect the element "#createElemDest" to not exist
    ```

- `Then I expect the element "([^"]*)?" to( not)? have focus`

  - assert that an element is focused on or not

    ```gherkin
    Then I expect the element "#keyPress" to have focus
    Then I expect the element "#keyPressDest" to not have focus
    ```

- `Then I expect the response the following request to( not)? match the reference "([^"]*)?":`

  - assert that the response of a given http requsts match a reference file, relative to the config file or not

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

- `Then I expect the option with (index|label|[^" ]*) "([^"]*)?" from the dropdown "([^"]*)?" to( not)? be selected`

  - assert that a dropdown option that matches an index, label, or attribute is selected or not

    ```gherkin
    Then I expect the option with index "3" from the dropdown "#fmSelect" to be selected
    Then I expect the option with label "Option 0" from the dropdown "#fmSelect" to not be selected
    Then I expect the option with value "option-3" from the dropdown "#fmSelect" to be selected
    ```

- `Then I expect the (?:element|option|check box|toggle item|radio button) "([^"]*)?" to( not)? be (?:checked|selected)`

  - assert that a toggle item is selected or not

    ```gherkin
    Then I expect the check box "#fmInputCheck2" to be selected
    Then I expect the radio button "#fmInputRadio2" to not be selected
    ```

- `Then I expect the element "([^"]*)?" to( not)? be ([\d]+)px broad and ([\d]+)px tall`

  - assert that an element's width and height matches a given value or not

    ```gherkin
    Then I expect the element "#resizeElemDest" to be 250px broad and 250px tall
    Then I expect the element "#resizeElemDest" to not be 200px broad and 200px tall
    ```

- `Then I expect the element "([^"]*)?" to( not)? be ([\d]+)px (broad|tall)`

  - assert that an element's width or height matches a given value or not

    ```gherkin
    Then I expect the element "#resizeElemDest" to be 250px broad
    Then I expect the element "#resizeElemBtn" to be 46px tall
    Then I expect the element "#resizeElemDest" to not be 200px broad
    Then I expect the element "#resizeElemBtn" to not be 45px tall
    ```

- `Then I expect the element "([^"]*)?" text to( not)? contain "([^"]*)?"`

  - assert that an element's text contains a given value or not

    ```gherkin
    Then I expect the element "#changeTxtDest" text to contain "[changeTxtBtn]"
    Then I expect the element "#changeTxtDest" text to not contain "[changeTxtBtn]"
    ```

- `Then I expect the element "([^"]*)?" text to( not)? contain:`

  - assert that an element's text contains a given multi-line value or not

    ```gherkin
    Then I expect the element "#changeInnerHtmlDest" text to contain:
    """
    this element
    to revert the changes of
    """
    Then I expect the element "#changeInnerHtmlDest" text to not contain:
    """
    this element
    to revert the changes of
    """
    ```

- `Then I expect the elements "([^"]*)?" texts to( not)? contain:`

  - assert that an array of elements text contains a given multi-line value or not

    ```gherkin
    Then I expect the elements "iFrame=>Level 1 List Items" texts to contain:
      | Values |
      | Item 3 |
      | Item 4 |
    Then I expect the elements "iFrame=>Level 1 List Items" texts to not contain:
      | Values |
      | Item 0 |
      | Item 1 |
    ```

- `Then I expect the element "([^"]*)?" text to( not)? be empty`

  - assert that an element's text is empty or not

    ```gherkin
    Then I expect the element "#changeTxtDest" text to be empty
    Then I expect the element "#changeTxtDest" text to not be empty
    ```

- `Then I expect the element "([^"]*)?" text to( not)? be "([^"]*)?"`

  - assert that an element's text matches a given value or not

    ```gherkin
    Then I expect the element "#changeTxtDest" text to be "This text is changed by [changeTxtBtn]..."
    Then I expect the element "#changeTxtDest" text to not be "This text is changed by [changeTxtBtn]..."
    ```

- `Then I expect the element "([^"]*)?" text to( not)? match:`

  - assert that an element's text matches a given multi-line value or not

    ```gherkin
    Then I expect the element "#changeInnerHtmlDest" text to match:
      """
      Double click

      this element
      to revert the changes of
      [changeInnerHtmlBtn]...
      """
    Then I expect the element "#changeInnerHtmlDest" text to not match:
      """
      Double click

      this element
      to revert the changes of
      [changeInnerHtmlBtn]...
      """
    ```

- `Then I expect the elements "([^"]*)?" texts to( not)? match:`

  - assert that an array of elements text matches a given multi-line value or not

    ```gherkin
    Then I expect the elements "iFrame=>Level 2 List Items" texts to match:
      | Values   |
      | Item 4.A |
      | Item 4.B |
    Then I expect the elements "iFrame=>Level 2 List Items" texts to not match:
      | Values   |
      | Item 4.A |
      | Item 4.B |
    ```

- `Then I expect the (?:window|page) title to( not)? contain (?:"([^"]*)?"|that of the page "([^"]*)?")`

  - assert that the window title contains a given value or not

    ```gherkin
    Then I expect the page title to contain "emo Pag"
    Then I expect the page title to contain that of the page "demo"
    Then I expect the page title to not contain "Femo Pag"
    Then I expect the page title to not contain that of the page "iFrame"
    ```

- `Then I expect the (?:window|page) title to( not)? be (?:"([^"]*)?"|that of the page "([^"]*)?")`

  - assert that the window title matches a given value or not

    ```gherkin
    Then I expect the page title to be "Demo Page"
    Then I expect the page title to be that of the page "Demo"
    Then I expect the page title to not be "Femo Page"
    Then I expect the page title to not be that of the page "iFrame"
    ```

- `Then I expect the url to( not)? contain (?:"([^"]*)?"|that of the page "([^"]*)?")`

  - assert that the window url contains a given value or not

    ```gherkin
    Then I expect the url to contain "index"
    Then I expect the url to contain that of the page "Demo"
    Then I expect the url to not contain "iframe"
    Then I expect the url to not contain that of the page "iFrame"
    ```

- `Then I expect the url to( not)? be (?:"([^"]*)?"|that of the page "([^"]*)?")`

  - assert that the window url matches a given value or not

    ```gherkin
    Then I expect the url to be "http://localhost:8080/index.html"
    Then I expect the url to be that of the page "Demo"
    Then I expect the url to not be "http://localhost:8080/iframe.html"
    Then I expect the url to not be that of the page "iFrame"
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

- `Then I expect the (?:field|element) "([^"]*)?" value to( not)? contain "([^"]*)?"`

  - assert that an element's value contains a given value or not

    ```gherkin
    Then I expect the field "#changeValDest" value to contain "[changeValBtn]"
    Then I expect the field "#changeValDest" value to not contain "[changeValBtn]"
    ```

- `Then I expect the (?:field|element) "([^"]*)?" value to( not)? contain:`

  - assert that an element's multi-line value contains a given multi-line value or not

    ```gherkin
    Then I expect the field "#fmTextarea" value to contain:
      """

      text is
      """
    Then I expect the field "#fmTextarea" value to not contain:
      """

      text is
      """
    ```

- `Then I expect the (?:field|element) "([^"]*)?" value to( not)? be empty`

  - assert that an element's value is empty or not

    ```gherkin
    Then I expect the field "#fmInput" value to be empty
    Then I expect the field "#fmInput" value to not be empty
    ```

- `Then I expect the (?:field|element) "([^"]*)?" value to( not)? be "([^"]*)?"`

  - assert that an element's value matches a given value or not

    ```gherkin
    Then I expect the field "#fmInput" value to be "This text is appended on [fmInput]..."
    Then I expect the field "#fmInput" value to not be "This text is appended on [fmInput]..."
    ```

- `Then I expect the (?:field|element) "([^"]*)?" value to( not)? match:`

  - assert that an element's multi-line value matches a given multi-line value or not

    ```gherkin
    Then I expect the field "#fmTextarea" value to match:
      """
      This

      text is
      appended
      on [fmTextarea]...
      """
    Then I expect the field "#fmTextarea" value to not match:
      """
      This

      text is
      appended
      on [fmTextarea]...
      """
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

- `Then I expect the (viewport|page) image to( not)? match the reference "([^"]*)?"`

  - assert that the viewport or page matches a reference image, relative to the config file or not

    ```gherkin
    Then I expect the page image to match the reference "05-delays/01-page"
    Then I expect the viewport image to match the reference "05-delays/03-viewport"
    Then I expect the page image to not match the reference "05-delays/01-page"
    Then I expect the viewport image to not match the reference "05-delays/03-viewport"
    ```
