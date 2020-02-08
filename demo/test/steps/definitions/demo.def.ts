import { Then, When } from "cucumber";
import * as demo from "../glue/demo.glue";

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
