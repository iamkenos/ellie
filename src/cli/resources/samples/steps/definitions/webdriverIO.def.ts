import { Then, When } from "cucumber";
import * as webdrverIO from "../glue/webdriverIO.glue";

When(
  /^I open the WebdriverIO page's url$/,
  webdrverIO.navigate
);

When(
  /^I click the WebdriverIO page's Get Started button$/,
  webdrverIO.clickGetStarted
);

Then(
  /^I expect the window title to( not)? match the WebdriverIO page's title$/,
  webdrverIO.checkTitle
);

Then(
  /^I expect the WebdriverIO page's project title to( not)? be "([^"]*)?"$/,
  webdrverIO.checkProjectTitleText
);

Then(
  /^I expect the the WebdriverIO page's nav bar to( not)? be displayed$/,
  webdrverIO.checkNavBarDisplayed
);
