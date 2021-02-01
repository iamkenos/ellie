import { Then, When } from "cucumber";
import { RETRY } from "@iamkenos/ellie";
import * as webdrverIO from "./webdriverIO.glue";

When(
  /^I open the WebdriverIO page's url$/, RETRY,
  webdrverIO.navigate
);

When(
  /^I click the WebdriverIO page's Get Started button$/, RETRY,
  webdrverIO.clickGetStarted
);

Then(
  /^I expect the window title to( not)? match the WebdriverIO page's title$/, RETRY,
  webdrverIO.checkTitle
);

Then(
  /^I expect the WebdriverIO page's project title to( not)? be "([^"]*)?"$/, RETRY,
  webdrverIO.checkProjectTitleText
);

Then(
  /^I expect the the WebdriverIO page's nav bar to( not)? be displayed$/, RETRY,
  webdrverIO.checkNavBarDisplayed
);
