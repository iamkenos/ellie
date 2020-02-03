import { Then } from "cucumber";

import checkAjaxRequestsMatch from "../glue/check/checkAjaxRequestsMatch";
import checkAttributeContains from "../glue/check/checkAttributeContains";
import checkAttributeEquals from "../glue/check/checkAttributeEquals";
import checkAttributeExists from "../glue/check/checkAttributeExists";
import checkAxisLocationEquals from "../glue/check/checkAxisLocationEquals";
import checkCookieContains from "../glue/check/checkCookieContains";
import checkCookieEquals from "../glue/check/checkCookieEquals";
import checkCookieExists from "../glue/check/checkCookieExists";
import checkCountEquals from "../glue/check/checkCountEquals";
import checkCountGreaterLess from "../glue/check/checkCountGreaterLess";
import checkCSSExists from "../glue/check/checkCSSExists";
import checkDisplayed from "../glue/check/checkDisplayed";
import checkDisplayedInViewport from "../glue/check/checkDisplayedInViewport";
import checkElementImageMatch from "../glue/check/checkElementImageMatch";
import checkEnabled from "../glue/check/checkEnabled";
import checkExists from "../glue/check/checkExists";
import checkFocused from "../glue/check/checkFocused";
import checkHttpResponseMatch from "../glue/check/checkHttpResponseMatch";
import checkModalExists from "../glue/check/checkModalExists";
import checkModalTextContains from "../glue/check/checkModalTextContains";
import checkModalTextEquals from "../glue/check/checkModalTextEquals";
import checkOptionDdlSelected from "../glue/check/checkOptionDdlSelected";
import checkSelected from "../glue/check/checkSelected";
import checkSizeEquals from "../glue/check/checkSizeEquals";
import checkSizeSideEquals from "../glue/check/checkSizeSideEquals";
import checkTextContains from "../glue/check/checkTextContains";
import checkTextContainsArray from "../glue/check/checkTextContainsArray";
import checkTextEmpty from "../glue/check/checkTextEmpty";
import checkTextEquals from "../glue/check/checkTextEquals";
import checkTextEqualsArray from "../glue/check/checkTextEqualsArray";
import checkTitleContains from "../glue/check/checkTitleContains";
import checkTitleEquals from "../glue/check/checkTitleEquals";
import checkUrlContains from "../glue/check/checkUrlContains";
import checkUrlEquals from "../glue/check/checkUrlEquals";
import checkUrlPathContains from "../glue/check/checkUrlPathContains";
import checkUrlPathEquals from "../glue/check/checkUrlPathEquals";
import checkValueContains from "../glue/check/checkValueContains";
import checkValueEmpty from "../glue/check/checkValueEmpty";
import checkValueEquals from "../glue/check/checkValueEquals";
import checkWindowCountEquals from "../glue/check/checkWindowCountEquals";
import checkWindowCountGreaterLess from "../glue/check/checkWindowCountGreaterLess";
import checkWindowImageMatch from "../glue/check/checkWindowImageMatch";

Then(
  /^I expect the ajax requests to( not)? match the reference "([^"]*)?"$/,
  checkAjaxRequestsMatch
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? contain "([^"]*)?"$/,
  checkAttributeContains
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? be "([^"]*)?"$/,
  checkAttributeEquals
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? exist$/,
  checkAttributeExists
);

// ok
Then(
  /^I expect the element "([^"]*)?" location at (x|y) axis to( not)? be ([\d+.?\d*]+)$/,
  checkAxisLocationEquals
);

Then(
  /^I expect the cookie "([^"]*)?" value to( not)? contain "([^"]*)?"$/,
  checkCookieContains
);

Then(
  /^I expect the cookie "([^"]*)?" value to( not)? be "([^"]*)?"$/,
  checkCookieEquals
);

Then(
  /^I expect the cookie "([^"]*)?" value to( not)? exist$/,
  checkCookieExists
);

// ok
Then(
  /^I expect the element "([^"]*)?" count to( not)? be "([^"]*)?"$/,
  checkCountEquals
);

// ok
Then(
  /^I expect the element "([^"]*)?" count to( not)? be (greater|less) than "([^"]*)?"$/,
  checkCountGreaterLess
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" css property "([^"]*)?" to( not)? exist$/,
  checkCSSExists
);

// ok
Then(
  /^I expect the element "([^"]*)?" to( not)? be displayed$/,
  checkDisplayed
);

// ok
Then(
  /^I expect the element "([^"]*)?" to( not)? be displayed within the viewport$/,
  checkDisplayedInViewport
);

Then(
  /^I expect the element "([^"]*)?" image to( not)? match the reference "([^"]*)?"$/,
  checkElementImageMatch
);

// ok
Then(
  /^I expect the element "([^"]*)?" to( not)? be enabled$/,
  checkEnabled
);

// ok
Then(
  /^I expect the element "([^"]*)?" to( not)? exist$/,
  checkExists
);

// ok
Then(
  /^I expect the element "([^"]*)?" to( not)? have focus$/,
  checkFocused
);

Then(
  /^I expect the response the following request to( not)? match the reference "([^"]*)?":$/,
  checkHttpResponseMatch
);

// ok
Then(
  /^I expect (?:a|an) (?:alert|confirm box|prompt) to( not)? be opened$/,
  checkModalExists
);

// ok
Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? contain "([^"]*)?"$/,
  checkModalTextContains
);

// ok
Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? be "([^"]*)?"$/,
  checkModalTextEquals
);

// ok
Then(
  /^I expect the option with (index|label|[^" ]*) "([^"]*)?" from the dropdown "([^"]*)?" to( not)? be selected$/,
  checkOptionDdlSelected
);

// ok
Then(
  /^I expect the (?:element|option|check box|toggle item|radio button) "([^"]*)?" to( not)? be (?:checked|selected)$/,
  checkSelected
);

// ok
Then(
  /^I expect the element "([^"]*)?" to( not)? be ([\d]+)px broad and ([\d]+)px tall$/,
  checkSizeEquals
);

// ok
Then(
  /^I expect the element "([^"]*)?" to( not)? be ([\d]+)px (broad|tall)$/,
  checkSizeSideEquals
);

// ok
Then(
  /^I expect the element "([^"]*)?" text to( not)? contain "([^"]*)?"$/,
  checkTextContains
);

// ok
Then(
  /^I expect the element "([^"]*)?" text to( not)? contain:$/,
  checkTextContains
);

// ok
Then(
  /^I expect the elements "([^"]*)?" texts to( not)? contain:$/,
  checkTextContainsArray
);

// ok
Then(
  /^I expect the element "([^"]*)?" text to( not)? be empty$/,
  checkTextEmpty
);

// ok
Then(
  /^I expect the element "([^"]*)?" text to( not)? be "([^"]*)?"$/,
  checkTextEquals
);

// ok
Then(
  /^I expect the element "([^"]*)?" text to( not)? match:$/,
  checkTextEquals
);

// ok
Then(
  /^I expect the elements "([^"]*)?" texts to( not)? match:$/,
  checkTextEqualsArray
);

// ok: I expect the page title to contain ""
// ok: I expect the page title to contain that of the page ""
// ok: I expect the page title to not contain ""
// ok: I expect the page title to not contain that of the page ""
Then(
  /^I expect the (?:window|page) title to( not)? contain (?:"([^"]*)?"|that of the page "([^"]*)?")$/,
  checkTitleContains
);

// ok: I expect the page title to be ""
// ok: I expect the page title to be that of the page ""
// ok: I expect the page title to not be ""
// ok: I expect the page title to not be that of the page ""
Then(
  /^I expect the (?:window|page) title to( not)? be (?:"([^"]*)?"|that of the page "([^"]*)?")$/,
  checkTitleEquals
);

// ok: I expect the url to contain ""
// ok: I expect the url to contain that of the page ""
// ok: I expect the url to not contain ""
// ok: I expect the url to not contain that of the page ""
Then(
  /^I expect the url to( not)? contain (?:"([^"]*)?"|that of the page "([^"]*)?")$/,
  checkUrlContains
);

// ok: I expect the url to be ""
// ok: I expect the url to be that of the page ""
// ok: I expect the url to not be ""
// ok: I expect the url to not be that of the page ""
Then(
  /^I expect the url to( not)? be (?:"([^"]*)?"|that of the page "([^"]*)?")$/,
  checkUrlEquals
);

// ok
Then(
  /^I expect the url path to( not)? contain "([^"]*)?"$/,
  checkUrlPathContains
);

// ok
Then(
  /^I expect the url path to( not)? be "([^"]*)?"$/,
  checkUrlPathEquals
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? contain "([^"]*)?"$/,
  checkValueContains
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? contain:$/,
  checkValueContains
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? be empty$/,
  checkValueEmpty
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? be "([^"]*)?"$/,
  checkValueEquals
);

// ok
Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? match:$/,
  checkValueEquals
);

// ok
Then(
  /^I expect the (?:window|tab) count to( not)? be "([^"]*)?"$/,
  checkWindowCountEquals
);

// ok
Then(
  /^I expect the (?:window|tab) count to( not)? be (greater|less) than "([^"]*)?"$/,
  checkWindowCountGreaterLess
);

Then(
  /^I expect the (viewport|page) image to( not)? match the reference "([^"]*)?"$/,
  checkWindowImageMatch
);
