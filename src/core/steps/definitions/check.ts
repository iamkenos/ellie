import { Then } from "cucumber";

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
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? contain "([^"]*)?"$/,
  elemAttributeContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? be "([^"]*)?"$/,
  elemAttributeEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? exist$/,
  elemAttributeExists
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element location at (x|y) axis to( not)? be ([\d+.?\d*]+)$/,
  elemAxisLocationEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element count to( not)? be "([^"]*)?"$/,
  elemCountEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element count to( not)? be (greater|less) than "([^"]*)?"$/,
  elemCountGreaterLess
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) "([^"]*)?" css property to( not)? exist$/,
  elemCSSExists
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be displayed$/,
  elemDisplayed
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be displayed within the viewport$/,
  elemDisplayedInViewport
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be enabled$/,
  elemEnabled
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? exist$/,
  elemExists
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? have focus$/,
  elemFocused
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element image to( not)? match the reference "([^"]*)?"$/,
  elemImageMatch
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:element|option|check box|toggle item|radio button) to( not)? be (?:checked|selected)$/,
  elemSelected
);

Then(
  /^I expect the option with (index|label|[^" ]*) "([^"]*)?" from the(?: "([^"]*)?" page's)? "([^"]*)?" dropdown to( not)? be selected$/,
  elemSelectedDdlOption
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be ([\d]+)px broad and ([\d]+)px tall$/,
  elemSizeEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element to( not)? be ([\d]+)px (broad|tall)$/,
  elemSizeSideEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? contain "([^"]*)?"$/,
  elemTextContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? contain:$/,
  elemTextContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" elements text array to( not)? contain:$/,
  elemTextContainsArray
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? be empty$/,
  elemTextEmpty
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? be "([^"]*)?"$/,
  elemTextEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" element text to( not)? match:$/,
  elemTextEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" elements text array to( not)? match:$/,
  elemTextEqualsArray
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? contain "([^"]*)?"$/,
  elemValueContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? contain:$/,
  elemValueContains
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? be empty$/,
  elemValueEmpty
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? be "([^"]*)?"$/,
  elemValueEquals
);

Then(
  /^I expect the(?: "([^"]*)?" page's)? "([^"]*)?" (?:field|element) value to( not)? match:$/,
  elemValueEquals
);

Then(
  /^I expect the (?:ajax|xhr) requests to( not)? match the reference "([^"]*)?"$/,
  windowAjaxRequestsMatch
);

Then(
  /^I expect the "([^"]*)?" site cookie value to( not)? contain "([^"]*)?"$/,
  windowCookieContains
);

Then(
  /^I expect the "([^"]*)?" site cookie value to( not)? be "([^"]*)?"$/,
  windowCookieEquals
);

Then(
  /^I expect the "([^"]*)?" site cookie value to( not)? exist$/,
  windowCookieExists
);

Then(
  /^I expect the (?:window|tab) count to( not)? be "([^"]*)?"$/,
  windowCountEquals
);

Then(
  /^I expect the (?:window|tab) count to( not)? be (greater|less) than "([^"]*)?"$/,
  windowCountGreaterLess
);

Then(
  /^I expect the captured google analytics(?: event "([^"]*)?" )? to( not)? match the reference "([^"]*)?"$/,
  windowGAEntriesMatch
);

Then(
  /^I expect the response to the following request to( not)? match the reference "([^"]*)?":$/,
  windowHttpResponseMatch
);

Then(
  /^I expect the (viewport|page) image to( not)? match the reference "([^"]*)?"$/,
  windowImageMatch
);

Then(
  /^I expect (?:a|an) (?:alert|confirm box|prompt) to( not)? be opened$/,
  windowModalExists
);

Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? contain "([^"]*)?"$/,
  windowModalTextContains
);

Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? be "([^"]*)?"$/,
  windowModalTextEquals
);

Then(
  /^I expect the (?:window|page) title to( not)? contain (?:"([^"]*)?"|the "([^"]*)?" page's title)$/,
  windowTitleContains
);

Then(
  /^I expect the (?:window|page) title to( not)? (?:be|match) (?:"([^"]*)?"|the "([^"]*)?" page's title)$/,
  windowTitleEquals
);

Then(
  /^I expect the url to( not)? contain (?:"([^"]*)?"|the "([^"]*)?" page's url)$/,
  windowUrlContains
);

Then(
  /^I expect the url to( not)? (?:be|match) (?:"([^"]*)?"|the "([^"]*)?" page's url)$/,
  windowUrlEquals
);

Then(
  /^I expect the url path to( not)? contain "([^"]*)?"$/,
  windowUrlPathContains
);

Then(
  /^I expect the url path to( not)? be "([^"]*)?"$/,
  windowUrlPathEquals
);
