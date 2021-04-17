import { Then, When } from "@cucumber/cucumber";
import { RETRY } from "@iamkenos/ellie";
import * as fn from "./webdriverIO.glue";

When(
  /^I open the WebdriverIO page's url$/, RETRY,
  fn.navigate
);

When(
  /^I click the WebdriverIO page's Get Started button$/, RETRY,
  fn.clickGetStarted
);

Then(
  /^I expect the window title to( not)? match the WebdriverIO page's title$/, RETRY,
  fn.checkTitle
);

Then(
  /^I expect the WebdriverIO page's project title to( not)? contain "([^"]*)?"$/, RETRY,
  fn.checkProjectTitleTextContains
);

Then(
  /^I expect the the WebdriverIO page's nav bar to( not)? be displayed$/, RETRY,
  fn.checkNavBarDisplayed
);
