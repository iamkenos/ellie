import { When } from "cucumber";

import elemClick from "../glue/action/elemClick";
import elemDragAndDrop from "../glue/action/elemDragAndDrop";
import elemFileUpload from "../glue/action/elemFileUpload";
import elemFocus from "../glue/action/elemFocus";
import elemMoveTo from "../glue/action/elemMoveTo";
import elemOptionSelect from "../glue/action/elemOptionSelect";
import elemScrollTo from "../glue/action/elemScrollTo";
import elemSelect from "../glue/action/elemSelect";
import elemValueClear from "../glue/action/elemValueClear";
import elemValueSet from "../glue/action/elemValueSet";
import elemValueSetMultiLine from "../glue/action/elemValueSetMultiLine";
import windowAjaxIntercept from "../glue/action/windowAjaxIntercept";
import windowChildrenClose from "../glue/action/windowChildrenClose";
import windowCookieDelete from "../glue/action/windowCookieDelete";
import windowCookiesDelete from "../glue/action/windowCookiesDelete";
import windowCookieSet from "../glue/action/windowCookieSet";
import windowKeyPress from "../glue/action/windowKeyPress";
import windowLastClose from "../glue/action/windowLastClose";
import windowLastFocus from "../glue/action/windowLastFocus";
import windowModalHandle from "../glue/action/windowModalHandle";
import windowModalTextSet from "../glue/action/windowModalTextSet";
import windowOpen from "../glue/action/windowOpen";
import windowPageNavigate from "../glue/action/windowPageNavigate";
import windowParentFocus from "../glue/action/windowParentFocus";
import windowPause from "../glue/action/windowPause";
import windowRefresh from "../glue/action/windowRefresh";
import windowScrollTo from "../glue/action/windowScrollTo";
import windowScrollToCoordinates from "../glue/action/windowScrollToCoordinates";
import windowSizeMaximize from "../glue/action/windowSizeMaximize";
import windowSizeSet from "../glue/action/windowSizeSet";
import windowSwitchFrame from "../glue/action/windowSwitchFrame";
import windowUrlSet from "../glue/action/windowUrlSet";

// ok
When(
  /^I (click|double click|script click) the (link|button|element) "([^"]*)?"(?: again)?$/,
  elemClick
);

// ok
When(
  /^I drag the element "([^"]*)?" to the element "([^"]*)?"$/,
  elemDragAndDrop
);

// ok
When(
  /^I upload the file "([^"]*)?" to the (?:field|element) "([^"]*)?"$/,
  elemFileUpload
);

// ok
When(
  /^I focus on the (?:field|element) "([^"]*)?"$/,
  elemFocus
);

// ok
When(
  /^I move to the element "([^"]*)?"(?: with an offset of (\d+),(\d+))?$/,
  elemMoveTo
);

// ok
When(
  /^I select the option with (index|label|[^" ]*) "([^"]*)?" from the dropdown "([^"]*)?"$/,
  elemOptionSelect
);

// ok
When(
  /^I (select|deselect) the (?:element|option|check box|toggle item|radio button) "([^"]*)?"$/,
  elemSelect
);

// ok
When(
  /^I scroll to the element "([^"]*)?"$/,
  elemScrollTo
);

// ok
When(
  /^I clear the (?:field|element) "([^"]*)?"$/,
  elemValueClear
);

// ok
When(
  /^I (type|append) "([^"]*)?" on the (?:field|element) "([^"]*)?"$/,
  elemValueSet
);

// ok
When(
  /^I (type|append) a multi-line value on the (?:field|element) "([^"]*)?":$/,
  elemValueSetMultiLine
);

// ok
When(
  /^I start to intercept (?:ajax|xhr) requests$/,
  windowAjaxIntercept
);

// ok
When(
  /^I close all except the parent (?:window|tab)$/,
  windowChildrenClose
);

When(
  /^I delete the cookie "([^"]*)?"$/,
  windowCookieDelete
);

When(
  /^I delete the cookies$/,
  windowCookiesDelete
);

When(
  /^I set the cookie "([^"]*)?" with the content "([^"]*)?"$/,
  windowCookieSet
);

// ok
When(
  /^I press the "([^"]*)?" key$/,
  windowKeyPress
);

// ok
When(
  /^I close the last opened (?:window|tab)$/,
  windowLastClose
);

// ok
When(
  /^I focus on the last opened (?:window|tab)$/,
  windowLastFocus
);

// ok
When(
  /^I (accept|dismiss) the (?:alert|confirm box|prompt)$/,
  windowModalHandle
);

// ok
When(
  /^I type "([^"]*)?" on the prompt$/,
  windowModalTextSet
);

// ok
When(
  /^I open the url (?:"([^"]*)?"|of the page "([^"]*)?") on a new window$/,
  windowOpen
);

// ok
When(
  /^I navigate (back|forward) from the current page(?: (\d+) times)?$/,
  windowPageNavigate
);

// n/a
When(
  /^I pause for (\d+)ms$/,
  windowPause
);

// ok
When(
  /^I focus on the parent (?:window|tab)$/,
  windowParentFocus
);

// ok
When(
  /^I refresh the page$/,
  windowRefresh
);

// ok
When(
  /^I scroll to the (top|bottom) of the page$/,
  windowScrollTo
);

// ok
When(
  /^I scroll to the coordinates (\d+).(\d+) of the page$/,
  windowScrollToCoordinates
);

// n/a
When(
  /^I have a screen that is maximized$/,
  windowSizeMaximize
);

// ok
When(
  /^I have a screen that is ([\d]+) by ([\d]+) pixels$/,
  windowSizeSet
);

// ok
When(
  /^I focus on the (?:iframe "([^"]*)?"|parent context)$/,
  windowSwitchFrame
);

// ok
When(
  /^I open the url (?:"([^"]*)?"|of the page "([^"]*)?")$/,
  windowUrlSet
);
