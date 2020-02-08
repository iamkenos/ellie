import { Then, When } from "cucumber";
import * as webdrverIO from "../glue/webdriverIO.glue";

When(
  /^I navigate on the WDIO page$/,
  webdrverIO.navigate
);

When(
  /^I click the Get Started buttton on the WDIO page$/,
  webdrverIO.clickGetStarted
);

Then(
  /^I expect the title to( not)? match the value on the WDIO page$/,
  webdrverIO.checkTitle
);

Then(
  /^I expect the project title to( not)? be "([^"]*)?" on the WDIO page$/,
  webdrverIO.checkProjectTitleText
);

Then(
  /^I expect the nav bar to( not)? be displayed on the WDIO page$/,
  webdrverIO.checkNavBarDisplayed
);
