import { defineParameterType } from "@cucumber/cucumber";

defineParameterType({
  name: "click",
  regexp: /(?:(double|script|middle|right) )?click/,
  transformer: arg1 => arg1
});
