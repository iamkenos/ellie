import { defineParameterType } from "@cucumber/cucumber";
import { transformToken } from "../../../";

defineParameterType({
  name: "transforming-string",
  regexp: /"([^"]*)?"/,
  transformer: arg1 => transformToken(arg1)
});

defineParameterType({
  name: "opt-page",
  regexp: /(?: "([^"]*)?" page's)?/,
  transformer: arg1 => arg1
});

defineParameterType({
  name: "locator",
  regexp: /"([^"]*)?"/,
  transformer: arg1 => arg1
});

defineParameterType({
  name: "webelement",
  regexp: /(link|button|element|field|component|widget)/,
  transformer: arg1 => arg1
});
