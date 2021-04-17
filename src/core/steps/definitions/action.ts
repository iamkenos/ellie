import { When } from "@cucumber/cucumber";

import { RETRY } from "../../utils";
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
import utilSetCurrentMeta from "../glue/action/utilSetCurrentMeta";
import utilSetCurrentMetaChild from "../glue/action/utilSetCurrentMetaChild";
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
  /^I (?:(double|script|middle|right) )?click the(?: "([^"]*)?" page's)? "([^"]*)?" (link|button|element)(?: again)?$/, RETRY,
  elemClick
);

When(
  /^I drag the(?: "([^"]*)?" page's)? "([^"]*)?" element to the "([^"]*)?" element$/, RETRY,
  elemDragAndDrop
);

When(
  /^I upload the "([^"]*)?" file to the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)$/, RETRY,
  elemFileUpload
);

When(
  /^I focus on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)$/, RETRY,
  elemFocus
);

When(
  /^I move to the(?: "([^"]*)?" page's)? "([^"]*)?" element(?: with an offset of (\d+),(\d+))?$/, RETRY,
  elemMoveTo
);

When(
  /^I select the option with (index|label|[^" ]*) "([^"]*)?" from the(?: "([^"]*)?" page's)? "([^"]*)?" dropdown$/, RETRY,
  elemOptionSelect
);

When(
  /^I (select|deselect) the(?: "([^"]*)?" page's)? "([^"]*)?" (?:element|option|check box|toggle item|radio button)$/, RETRY,
  elemSelect
);

When(
  /^I scroll to the(?: "([^"]*)?" page's)? "([^"]*)?" element$/, RETRY,
  elemScrollTo
);

When(
  /^I clear the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)$/, RETRY,
  elemValueClear
);

When(
  /^I (type|append) "([^"]*)?" on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element)$/, RETRY,
  elemValueSet
);

When(
  /^I (type|append) a multi-line value on the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element):$/, RETRY,
  elemValueSetMultiLine
);

When(
  /^I (land on|start using|stop using) the "([^"]*)?" (?:page|component|widget)$/, RETRY,
  utilSetCurrentMeta
);

When(
  /^I (start using|stop using) the (?:page|component|widget)'s "([^"]*)?" child element$/, RETRY,
  utilSetCurrentMetaChild
);

When(
  /^I start to intercept (?:ajax|xhr) requests$/, RETRY,
  windowAjaxIntercept
);

When(
  /^I close all except the parent (?:window|tab)$/, RETRY,
  windowChildrenClose
);

When(
  /^I delete the "([^"]*)?" site cookie$/, RETRY,
  windowCookieDelete
);

When(
  /^I delete the site cookies$/, RETRY,
  windowCookiesDelete
);

When(
  /^I set the "([^"]*)?" site cookie value to "([^"]*)?"$/, RETRY,
  windowCookieSet
);

When(
  /^I press the "([^"]*)?" key$/, RETRY,
  windowKeyPress
);

When(
  /^I close the last opened (?:window|tab)$/, RETRY,
  windowLastClose
);

When(
  /^I focus on the last opened (?:window|tab)$/, RETRY,
  windowLastFocus
);

When(
  /^I (accept|dismiss) the (?:alert|confirm box|prompt)$/, RETRY,
  windowModalHandle
);

When(
  /^I type "([^"]*)?" on the prompt$/, RETRY,
  windowModalTextSet
);

When(
  /^I navigate (back|forward) from the current page(?: (\d+) times)?$/, RETRY,
  windowPageNavigate
);

When(
  /^I pause for (\d+)ms$/, RETRY,
  windowPause
);

When(
  /^I focus on the parent (?:window|tab)$/, RETRY,
  windowParentFocus
);

When(
  /^I refresh the page$/, RETRY,
  windowRefresh
);

When(
  /^I scroll to the (top|bottom) of the page$/, RETRY,
  windowScrollTo
);

When(
  /^I scroll to the coordinates (\d+).(\d+) of the page$/, RETRY,
  windowScrollToCoordinates
);

When(
  /^I have a screen that is maximized$/, RETRY,
  windowSizeMaximize
);

When(
  /^I have a screen that is ([\d]+) by ([\d]+) pixels$/, RETRY,
  windowSizeSet
);

When(
  /^I focus on the(?: "([^"]*)?" page's)? (?:"([^"]*)?" iframe|parent context)$/, RETRY,
  windowSwitchFrame
);

When(
  /^I open the (?:"([^"]*)?" page's url|url "([^"]*)?")$/, RETRY,
  windowUrlOpen
);

When(
  /^I open the (?:"([^"]*)?" page's url|url "([^"]*)?") on a new window$/, RETRY,
  windowUrlOpenNew
);
