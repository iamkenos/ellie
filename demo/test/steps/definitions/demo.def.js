import { Then, When } from 'cucumber';
import * as demo from '../glue/demo.glue';

When(
  /^I scroll to the section header "([^"]*)?"$/,
  demo.scrollToSectionHeader
);

When(
  /^I click the "([^"]*)?" navigation item$/,
  demo.clickNavigationItem
);

Then(
  /^I expect the section header "([^"]*)?" to( not)? exist$/,
  demo.checkSectionHeaderExists
);
