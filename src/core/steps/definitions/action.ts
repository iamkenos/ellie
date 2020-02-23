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
import windowPageNavigate from "../glue/action/windowPageNavigate";
import windowParentFocus from "../glue/action/windowParentFocus";
import windowPause from "../glue/action/windowPause";
import windowRefresh from "../glue/action/windowRefresh";
import windowScrollTo from "../glue/action/windowScrollTo";
import windowScrollToCoordinates from "../glue/action/windowScrollToCoordinates";
import windowSizeMaximize from "../glue/action/windowSizeMaximize";
import windowSizeSet from "../glue/action/windowSizeSet";
import windowSwitchFrame from "../glue/action/windowSwitchFrame";
import windowUrlOpen from "../glue/action/windowUrlOpen";
import windowUrlOpenNew from "../glue/action/windowUrlOpenNew";

When(
  /^I (?:(double|script|middle|right) )?click the(?: "([^"]*)?" page's)? "([^"]*)?" (link|button|element)(?: again)?$/,
  elemClick
);

When(
  /^I drag the(?: "([^"]*)?" page's)? "([^"]*)?" element to the "([^"]*)?" element$/,
  elemDragAndDrop
);

When(
  /^I upload the "([^"]*)?" file to the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)$/,
  elemFileUpload
);

When(
  /^I focus on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)$/,
  elemFocus
);

When(
  /^I move to the(?: "([^"]*)?" page's)? "([^"]*)?" element(?: with an offset of (\d+),(\d+))?$/,
  elemMoveTo
);

When(
  /^I select the option with (index|label|[^" ]*) "([^"]*)?" from the(?: "([^"]*)?" page's)? "([^"]*)?" dropdown$/,
  elemOptionSelect
);

When(
  /^I (select|deselect) the(?: "([^"]*)?" page's)? "([^"]*)?" (?:element|option|check box|toggle item|radio button)$/,
  elemSelect
);

When(
  /^I scroll to the(?: "([^"]*)?" page's)? "([^"]*)?" element$/,
  elemScrollTo
);

When(
  /^I clear the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)$/,
  elemValueClear
);

When(
  /^I (type|append) "([^"]*)?" on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)$/,
  elemValueSet
);

When(
  /^I (type|append) a multi-line value on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element):$/,
  elemValueSetMultiLine
);

When(
  /^I start to intercept (?:ajax|xhr) requests$/,
  windowAjaxIntercept
);

When(
  /^I close all except the parent (?:window|tab)$/,
  windowChildrenClose
);

When(
  /^I delete the "([^"]*)?" site cookie$/,
  windowCookieDelete
);

When(
  /^I delete the site cookies$/,
  windowCookiesDelete
);

When(
  /^I set the "([^"]*)?" site cookie value to "([^"]*)?"$/,
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
  /^I navigate (back|forward) from the current page(?: (\d+) times)?$/,
  windowPageNavigate
);

When(
  /^I pause for (\d+)ms$/,
  windowPause
);

When(
  /^I focus on the parent (?:window|tab)$/,
  windowParentFocus
);

When(
  /^I refresh the page$/,
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
  /^I focus on the(?: "([^"]*)?" page's)? (?:"([^"]*)?" iframe|parent context)$/,
  windowSwitchFrame
);

When(
  /^I open the (?:"([^"]*)?" page's url|url "([^"]*)?")$/,
  windowUrlOpen
);

When(
  /^I open the (?:"([^"]*)?" page's url|url "([^"]*)?") on a new window$/,
  windowUrlOpenNew
);
