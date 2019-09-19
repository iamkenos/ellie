import { LEVELS } from "../logger/config";
import { IConfigProperty } from "./interfaces";

export const DEFAULT = {
  bail: 0,
  baseUrl: "http://localhost",
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--disable-web-security", "--disable-gpu", "--headless"]
      }
    }
  ],
  locale: "default",
  logLevel: "info",
  maxInstances: 10,
  pages: ["./pages/**/*.meta.js"],
  reportOutDir: ".reports",
  specFileRetries: 0,
  specs: ["./features/**/*.feature"],
  steps: ["./steps/definitions/**/*.js"],
  stepTimeout: 15000,
  waitforTimeout: 5000,
  hooks: {
    before: "",
    beforeFeature: "",
    beforeScenario: "",
    beforeStep: "",
    afterStep: "",
    afterScenario: "",
    afterFeature: "",
    after: ""
  },
  custom: {}
};

export const CORE_STEP_DEFS = "../core/steps/definitions/**/*.js";

export const PRETTIER_CONFIG = "/templates/.prettierrc";

export const LCL_CONFIG_TPL = "/templates/ellie.conf.tpl.ejs";

export const LCL_CONFIG_OUT = "ellie.conf.js";

export const WDIO_CONFIG_TPL = "/templates/wdio.conf.tpl.ejs";

export const WDIO_CONFIG_OUT = "wdio.conf.js";

export const CONFIG_HELPER_INTRO = `
--------------------
Configuration Helper
--------------------`;

export const CONFIG_HELPER_SUCCESS_MESSAGE = `
Configuration file was created successfully!
To run your tests, execute:
$ ellie ellie.conf.js
`;

const CONFIG_PROPS: IConfigProperty[] = [
  {
    name: "bail",
    helptext: "Threshold on the amount of tests allowed to fail before bailing out",
    overrideOption: {
      enabled: true,
      type: "string",
      description: "Fail fast after hitting a threshold of failing tests"
    }
  },
  {
    name: "baseUrl",
    helptext: "The base url of the application under test",
    overrideOption: {
      enabled: true,
      type: "string",
      description: "Shorten url command calls"
    },
    inquiredOption: {
      enabled: true,
      type: "input",
      message: "What is the base url of your application?",
      default: DEFAULT.baseUrl
    }
  },
  {
    name: "capabilities",
    helptext: "W3C browser capabilities. See https://www.w3.org/TR/webdriver1/#capabilities"
  },
  {
    name: "custom",
    helptext: "Object containing keys that you want to be accessible from the global browser scope"
  },
  {
    name: "hooks",
    helptext: "Object containing keys that correspond to supported hooks"
  },
  {
    name: "logLevel",
    helptext: "The the level of logging verbosity",
    overrideOption: {
      enabled: true,
      type: "string",
      description: "Set the level of logging verbosity"
    },
    inquiredOption: {
      enabled: true,
      type: "list",
      message: "What level of logging verbosity would you like?",
      choices: LEVELS.map((i): string => i.name),
      default: DEFAULT.logLevel
    }
  },
  {
    name: "locale",
    helptext: "Locale to use when looking for elements in your page meta files"
  },
  {
    name: "maxInstances",
    helptext: "The the number of concurrent browser instances to run per feature",
    overrideOption: {
      enabled: true,
      description: "Set the number of concurrent browser instances running",
      type: "number"
    },
    inquiredOption: {
      enabled: true,
      type: "input",
      message: "How many concurrent features would you like running during the test?",
      default: DEFAULT.maxInstances.toString()
    }
  },
  {
    name: "pages",
    helptext: "Array of globs pointing to your page meta, relative to the config file",
    inquiredOption: {
      enabled: true,
      type: "input",
      message: "Where are your page meta located?",
      default: DEFAULT.pages.join(",")
    }
  },
  {
    name: "reportOutDir",
    helptext: "Directory to store the reports, relative to the config file"
  },
  {
    name: "specFileRetries",
    helptext: "The number of times to retry the entire specfile when it fails as a whole"
  },
  {
    name: "specs",
    helptext: "Array of globs pointing to your cucumber tests, relative to the config file",
    overrideOption: {
      enabled: true,
      type: "array",
      description: "Define which tests to run"
    },
    inquiredOption: {
      enabled: true,
      type: "input",
      message: "Where are your feature files located?",
      default: DEFAULT.specs.join(",")
    }
  },
  {
    name: "steps",
    helptext: "Array of globs pointing to your cucumber steps, relative to the config file",
    inquiredOption: {
      enabled: true,
      type: "input",
      message: "Where are your step definitions located?",
      default: DEFAULT.steps.join(",")
    }
  },
  {
    name: "stepTimeout",
    helptext: "Default timeout for WebdriverIO to wait for a single test step to finish in milliseconds"
  },
  {
    name: "waitforTimeout",
    helptext: "Default timeout for all browser 'waitFor' commands in milliseconds"
  }
];

export const OVERRIDE_OPTS: IConfigProperty[] = CONFIG_PROPS
  .filter((i): boolean | undefined => i.overrideOption && i.overrideOption.enabled)
  .map((i): IConfigProperty => ({
    ...i.overrideOption,
    name: i.name
  }));

export const QUESTIONNAIRE: IConfigProperty[] = CONFIG_PROPS
  .filter((i): boolean | undefined => i.inquiredOption && i.inquiredOption.enabled)
  .map((i): IConfigProperty => ({
    ...i.inquiredOption,
    name: i.name
  }));

export const USAGE = `
Usage:
  ellie config                  Launches the configuration helper
  ellie [configFile]            Launches the WebdriverIO test runner
  ellie [configFile] [options]  Stdin overrides for certain config properties; See options list below

Complete list of properties:
* Inquired when running the config helper

${
  CONFIG_PROPS
  // create an array of config property objects containing only the name and helptext properties
    .map((i): IConfigProperty => ({ name: i.name, helptext: i.helptext }))
  // create an array of config property strings marking those inquired with an '*'
    .map((i): string => `  ${QUESTIONNAIRE
      .filter((j): boolean => i.name === j.name)
      .map((): string => "* ")}${i.name}\t  ${i.helptext}`)
  // transform the array into a big string, each element separated by a line break
    .join("\n")
}`;
