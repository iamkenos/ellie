import { Then, When } from "@cucumber/cucumber";
import * as demo from "./demo.glue";

When(
  /^I click the "([^"]*)?" navigation item$/,
  demo.clickNavigationItem
);

Then(
  /^I expect the navigation item "([^"]*)?" to( not)? be selected$/,
  demo.checkNavigationItemSelected
);

Then(
  /^I expect the section header "([^"]*)?" to( not)? exist$/,
  demo.checkSectionHeaderExists
);
