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
  /^I expect the (?:ajax|xhr) requests to( not)? match the reference "([^"]*)?"$/,
  checkAjaxRequestsMatch
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? contain "([^"]*)?"$/,
  checkAttributeContains
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? be "([^"]*)?"$/,
  checkAttributeEquals
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" attribute "([^"]*)?" to( not)? exist$/,
  checkAttributeExists
);

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

Then(
  /^I expect the element "([^"]*)?" count to( not)? be "([^"]*)?"$/,
  checkCountEquals
);

Then(
  /^I expect the element "([^"]*)?" count to( not)? be (greater|less) than "([^"]*)?"$/,
  checkCountGreaterLess
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" css property "([^"]*)?" to( not)? exist$/,
  checkCSSExists
);

Then(
  /^I expect the element "([^"]*)?" to( not)? be displayed$/,
  checkDisplayed
);

Then(
  /^I expect the element "([^"]*)?" to( not)? be displayed within the viewport$/,
  checkDisplayedInViewport
);

Then(
  /^I expect the element "([^"]*)?" image to( not)? match the reference "([^"]*)?"$/,
  checkElementImageMatch
);

Then(
  /^I expect the element "([^"]*)?" to( not)? be enabled$/,
  checkEnabled
);

Then(
  /^I expect the element "([^"]*)?" to( not)? exist$/,
  checkExists
);

Then(
  /^I expect the element "([^"]*)?" to( not)? have focus$/,
  checkFocused
);

Then(
  /^I expect the response the following request to( not)? match the reference "([^"]*)?":$/,
  checkHttpResponseMatch
);

Then(
  /^I expect (?:a|an) (?:alert|confirm box|prompt) to( not)? be opened$/,
  checkModalExists
);

Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? contain "([^"]*)?"$/,
  checkModalTextContains
);

Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? be "([^"]*)?"$/,
  checkModalTextEquals
);

Then(
  /^I expect the option with (index|label|[^" ]*) "([^"]*)?" from the dropdown "([^"]*)?" to( not)? be selected$/,
  checkOptionDdlSelected
);

Then(
  /^I expect the (?:element|option|check box|toggle item|radio button) "([^"]*)?" to( not)? be (?:checked|selected)$/,
  checkSelected
);

Then(
  /^I expect the element "([^"]*)?" to( not)? be ([\d]+)px broad and ([\d]+)px tall$/,
  checkSizeEquals
);

Then(
  /^I expect the element "([^"]*)?" to( not)? be ([\d]+)px (broad|tall)$/,
  checkSizeSideEquals
);

Then(
  /^I expect the element "([^"]*)?" text to( not)? contain "([^"]*)?"$/,
  checkTextContains
);

Then(
  /^I expect the element "([^"]*)?" text to( not)? contain:$/,
  checkTextContains
);

Then(
  /^I expect the elements "([^"]*)?" texts to( not)? contain:$/,
  checkTextContainsArray
);

Then(
  /^I expect the element "([^"]*)?" text to( not)? be empty$/,
  checkTextEmpty
);

Then(
  /^I expect the element "([^"]*)?" text to( not)? be "([^"]*)?"$/,
  checkTextEquals
);

Then(
  /^I expect the element "([^"]*)?" text to( not)? match:$/,
  checkTextEquals
);

Then(
  /^I expect the elements "([^"]*)?" texts to( not)? match:$/,
  checkTextEqualsArray
);

Then(
  /^I expect the (?:window|page) title to( not)? contain (?:"([^"]*)?"|that of the page "([^"]*)?")$/,
  checkTitleContains
);

Then(
  /^I expect the (?:window|page) title to( not)? be (?:"([^"]*)?"|that of the page "([^"]*)?")$/,
  checkTitleEquals
);

Then(
  /^I expect the url to( not)? contain (?:"([^"]*)?"|that of the page "([^"]*)?")$/,
  checkUrlContains
);

Then(
  /^I expect the url to( not)? be (?:"([^"]*)?"|that of the page "([^"]*)?")$/,
  checkUrlEquals
);

Then(
  /^I expect the url path to( not)? contain "([^"]*)?"$/,
  checkUrlPathContains
);

Then(
  /^I expect the url path to( not)? be "([^"]*)?"$/,
  checkUrlPathEquals
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? contain "([^"]*)?"$/,
  checkValueContains
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? contain:$/,
  checkValueContains
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? be empty$/,
  checkValueEmpty
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? be "([^"]*)?"$/,
  checkValueEquals
);

Then(
  /^I expect the (?:field|element) "([^"]*)?" value to( not)? match:$/,
  checkValueEquals
);

Then(
  /^I expect the (?:window|tab) count to( not)? be "([^"]*)?"$/,
  checkWindowCountEquals
);

Then(
  /^I expect the (?:window|tab) count to( not)? be (greater|less) than "([^"]*)?"$/,
  checkWindowCountGreaterLess
);

Then(
  /^I expect the (viewport|page) image to( not)? match the reference "([^"]*)?"$/,
  checkWindowImageMatch
);
