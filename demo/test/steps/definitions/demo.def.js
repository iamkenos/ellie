import { Then, When } from 'cucumber';
import * as demo from '../glue/demo.glue';

When(
  /^I scroll to the section header "([^"]*)?"$/,
  demo.scrollToSectionHeader
);

Then(
  /^I expect the section header "([^"]*)?" to( not)? exist$/,
  demo.checkSectionHeaderExists
);
