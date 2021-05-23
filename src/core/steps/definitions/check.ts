import { Then } from "@cucumber/cucumber";

import { RETRY } from "../../utils";
import elemAttributeContains from "../glue/check/elemAttributeContains";
import elemAttributeEquals from "../glue/check/elemAttributeEquals";
import elemAttributeExists from "../glue/check/elemAttributeExists";
import elemAxisLocationEquals from "../glue/check/elemAxisLocationEquals";
import elemCountEquals from "../glue/check/elemCountEquals";
import elemCountGreaterLess from "../glue/check/elemCountGreaterLess";
import elemCSSExists from "../glue/check/elemCSSExists";
import elemDisplayed from "../glue/check/elemDisplayed";
import elemDisplayedInViewport from "../glue/check/elemDisplayedInViewport";
import elemEnabled from "../glue/check/elemEnabled";
import elemExists from "../glue/check/elemExists";
import elemFocused from "../glue/check/elemFocused";
import elemHrefOpensOn from "../glue/check/elemHrefOpensOn";
import elemHrefOpensOnFrame from "../glue/check/elemHrefOpensOnFrame";
import elemHrefPointsTo from "../glue/check/elemHrefPointsTo";
import elemImageMatch from "../glue/check/elemImageMatch";
import elemSelected from "../glue/check/elemSelected";
import elemSelectedDdlOption from "../glue/check/elemSelectedDdlOption";
import elemSizeEquals from "../glue/check/elemSizeEquals";
import elemSizeSideEquals from "../glue/check/elemSizeSideEquals";
import elemTextContains from "../glue/check/elemTextContains";
import elemTextContainsArray from "../glue/check/elemTextContainsArray";
import elemTextEmpty from "../glue/check/elemTextEmpty";
import elemTextEquals from "../glue/check/elemTextEquals";
import elemTextEqualsArray from "../glue/check/elemTextEqualsArray";
import elemValueContains from "../glue/check/elemValueContains";
import elemValueEmpty from "../glue/check/elemValueEmpty";
import elemValueEquals from "../glue/check/elemValueEquals";
import windowAjaxRequestsMatch from "../glue/check/windowAjaxRequestsMatch";
import windowAjaxRequestsMatchExp from "../glue/check/windowAjaxRequestsMatchExp";
import windowCookieContains from "../glue/check/windowCookieContains";
import windowCookieEquals from "../glue/check/windowCookieEquals";
import windowCookieExists from "../glue/check/windowCookieExists";
import windowCountEquals from "../glue/check/windowCountEquals";
import windowCountGreaterLess from "../glue/check/windowCountGreaterLess";
import windowGAEntriesMatch from "../glue/check/windowGAEntriesMatch";
import windowHttpResponseMatch from "../glue/check/windowHttpResponseMatch";
import windowImageMatch from "../glue/check/windowImageMatch";
import windowModalExists from "../glue/check/windowModalExists";
import windowModalTextContains from "../glue/check/windowModalTextContains";
import windowModalTextEquals from "../glue/check/windowModalTextEquals";
import windowTitleContains from "../glue/check/windowTitleContains";
import windowTitleEquals from "../glue/check/windowTitleEquals";
import windowUrlContains from "../glue/check/windowUrlContains";
import windowUrlEquals from "../glue/check/windowUrlEquals";
import windowUrlPathContains from "../glue/check/windowUrlPathContains";
import windowUrlPathEquals from "../glue/check/windowUrlPathEquals";

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? contain "([^"]*)?"$/, RETRY,
  elemAttributeContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? be "([^"]*)?"$/, RETRY,
  elemAttributeEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? exist$/, RETRY,
  elemAttributeExists
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element location at (x|y) axis to( not)? be ([\d+.?\d*]+)$/, RETRY,
  elemAxisLocationEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element count to( not)? be "([^"]*)?"$/, RETRY,
  elemCountEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element count to( not)? be (greater|less) than "([^"]*)?"$/, RETRY,
  elemCountGreaterLess
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" css property to( not)? exist$/, RETRY,
  elemCSSExists
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be displayed$/, RETRY,
  elemDisplayed
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be displayed within the viewport$/, RETRY,
  elemDisplayedInViewport
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be enabled$/, RETRY,
  elemEnabled
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? exist$/, RETRY,
  elemExists
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? have focus$/, RETRY,
  elemFocused
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (link|link text) to( not)? open (?:on (?:a|the)? )?(new window|same frame|parent frame|top frame|without a target)$/, RETRY,
  elemHrefOpensOn
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (link|link text) to( not)? open on a named frame "([^"]*)?"$/, RETRY,
  elemHrefOpensOnFrame
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (link|link text) to( not)? point (?:to (?:a|an)? |to )?(?:(path|section|absolute url|mail|tel)? )?"([^"]*)?"$/, RETRY,
  elemHrefPointsTo
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element image to( not)? match the reference "([^"]*)?"$/, RETRY,
  elemImageMatch
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:element|option|check box|toggle item|radio button) to( not)? be (?:checked|selected)$/, RETRY,
  elemSelected
);

Then(
  /^I expect the option with (index|label|[^" ]*) "([^"]*)?" from the(?: "([^"]*)?" page's)? "([^"]*)?" dropdown to( not)? be selected$/, RETRY,
  elemSelectedDdlOption
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be ([\d]+)px broad and ([\d]+)px tall$/, RETRY,
  elemSizeEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be ([\d]+)px (broad|tall)$/, RETRY,
  elemSizeSideEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? contain "([^"]*)?"$/, RETRY,
  elemTextContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? contain:$/, RETRY,
  elemTextContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" elements text array to( not)? contain:$/, RETRY,
  elemTextContainsArray
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? be empty$/, RETRY,
  elemTextEmpty
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? be "([^"]*)?"$/, RETRY,
  elemTextEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? match:$/, RETRY,
  elemTextEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" elements text array to( not)? match:$/, RETRY,
  elemTextEqualsArray
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? contain "([^"]*)?"$/, RETRY,
  elemValueContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? contain:$/, RETRY,
  elemValueContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? be empty$/, RETRY,
  elemValueEmpty
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? be "([^"]*)?"$/, RETRY,
  elemValueEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? match:$/, RETRY,
  elemValueEquals
);

Then(
  /^I expect the (?:ajax|xhr) requests to( not)? match the reference "([^"]*)?"$/, RETRY,
  windowAjaxRequestsMatch
);

Then(
  /^I expect the (?:ajax|xhr) requests to( not)? match the reference "([^"]*)?" with expressions:$/, RETRY,
  windowAjaxRequestsMatchExp
);

Then(
  /^I expect the "([^"]*)?" site cookie value to( not)? contain "([^"]*)?"$/, RETRY,
  windowCookieContains
);

Then(
  /^I expect the "([^"]*)?" site cookie value to( not)? be "([^"]*)?"$/, RETRY,
  windowCookieEquals
);

Then(
  /^I expect the "([^"]*)?" site cookie value to( not)? exist$/, RETRY,
  windowCookieExists
);

Then(
  /^I expect the (?:window|tab) count to( not)? be "([^"]*)?"$/, RETRY,
  windowCountEquals
);

Then(
  /^I expect the (?:window|tab) count to( not)? be (greater|less) than "([^"]*)?"$/, RETRY,
  windowCountGreaterLess
);

Then(
  /^I expect the captured google analytics(?: event "([^"]*)?" )? to( not)? match the reference "([^"]*)?"$/, RETRY,
  windowGAEntriesMatch
);

Then(
  /^I expect the response to the following request to( not)? match the reference "([^"]*)?":$/, RETRY,
  windowHttpResponseMatch
);

Then(
  /^I expect the (viewport|page) image to( not)? match the reference "([^"]*)?"$/, RETRY,
  windowImageMatch
);

Then(
  /^I expect (?:a|an) (?:alert|confirm box|prompt) to( not)? be opened$/, RETRY,
  windowModalExists
);

Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? contain "([^"]*)?"$/, RETRY,
  windowModalTextContains
);

Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? be "([^"]*)?"$/, RETRY,
  windowModalTextEquals
);

Then(
  /^I expect the (?:window|page) title to( not)? contain (?:"([^"]*)?"|the "([^"]*)?" page's title)$/, RETRY,
  windowTitleContains
);

Then(
  /^I expect the (?:window|page) title to( not)? (?:be|match) (?:"([^"]*)?"|the "([^"]*)?" page's title)$/, RETRY,
  windowTitleEquals
);

Then(
  /^I expect the url to( not)? contain (?:"([^"]*)?"|the "([^"]*)?" page's url|the base url)$/, RETRY,
  windowUrlContains
);

Then(
  /^I expect the url to( not)? (?:be|match) (?:"([^"]*)?"|the "([^"]*)?" page's url|the base url)$/, RETRY,
  windowUrlEquals
);

Then(
  /^I expect the url path to( not)? contain "([^"]*)?"$/, RETRY,
  windowUrlPathContains
);

Then(
  /^I expect the url path to( not)? be "([^"]*)?"$/, RETRY,
  windowUrlPathEquals
);
