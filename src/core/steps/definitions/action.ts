import { When } from "cucumber";

import elemClick from "../glue/action/elemClick";
import elemDragAndDrop from "../glue/action/elemDragAndDrop";
import elemFileUpload from "../glue/action/elemFileUpload";
import elemMoveTo from "../glue/action/elemMoveTo";
import elemOptionSelect from "../glue/action/elemOptionSelect";
import elemScrollTo from "../glue/action/elemScrollTo";
import elemValueClear from "../glue/action/elemValueClear";
import elemValueSet from "../glue/action/elemValueSet";
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
import windowPause from "../glue/action/windowPause";
import windowRefresh from "../glue/action/windowRefresh";
import windowScrollTo from "../glue/action/windowScrollTo";
import windowScrollToCoordinates from "../glue/action/windowScrollToCoordinates";
import windowSizeMaximize from "../glue/action/windowSizeMaximize";
import windowSizeSet from "../glue/action/windowSizeSet";
import windowSwitchFrame from "../glue/action/windowSwitchFrame";
import windowUrlSet from "../glue/action/windowUrlSet";

When(
  /^I (click|double click) the (link|button|element) "([^"]*)?"$/,
  elemClick
);

When(
  /^I drag the element "([^"]*)?" to the element "([^"]*)?"$/,
  elemDragAndDrop
);

When(
  /^I upload the file "([^"]*)?" to the (?:field|element) "([^"]*)?"$/,
  elemFileUpload
);

When(
  /^I move to the element "([^"]*)?"(?: with an offset of (\d+),(\d+))?$/,
  elemMoveTo
);

When(
  /^I select the option with (?:(index|label|value) "([^"]*)?"|attribute "([^"]*)?" as "([^"]*)?") from the element "([^"]*)?"$/,
  elemOptionSelect
);

When(
  /^I scroll to the element "([^"]*)?"$/,
  elemScrollTo
);

When(
  /^I clear the (?:field|element) "([^"]*)?"$/,
  elemValueClear
);

When(
  /^I (type|append) "([^"]*)?" on the (?:field|element) "([^"]*)?"$/,
  elemValueSet
);

When(
  /^I start to intercept ajax requests$/,
  windowAjaxIntercept
);

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

When(
  /^I press the "([^"]*)?" key$/,
  windowKeyPress
);

When(
  /^I close the last opened (?:window|tab)$/,
  windowLastClose
);

When(
  /^I focus on the last opened (?:window|tab)$/,
  windowLastFocus
);

When(
  /^I (accept|dismiss) the (?:alert|confirm box|prompt)$/,
  windowModalHandle
);

When(
  /^I type "([^"]*)?" on the prompt$/,
  windowModalTextSet
);

When(
  /^I open the url (?:"([^"]*)?"|of the page "([^"]*)?") on a new window$/,
  windowOpen
);

When(
  /^I navigate to the (previous|next) page(?: (\d+) times)?$/,
  windowPageNavigate
);

When(
  /^I pause for (\d+)ms$/,
  windowPause
);

When(
  /^I refesh the page$/,
  windowRefresh
);

When(
  /^I scroll to the (top|bottom) of the page$/,
  windowScrollTo
);

When(
  /^I scroll to the coordinates (\d+).(\d+) of the page$/,
  windowScrollToCoordinates
);

When(
  /^I have a screen that is maximized$/,
  windowSizeMaximize
);

When(
  /^I have a screen that is ([\d]+) by ([\d]+) pixels$/,
  windowSizeSet
);

When(
  /^I focus on the (?:iframe "([^"]*)?"|parent context)/,
  windowSwitchFrame
);

When(
  /^I open the url (?:"([^"]*)?"|of the page "([^"]*)?")$/,
  windowUrlSet
);
