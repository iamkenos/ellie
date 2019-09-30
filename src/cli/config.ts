import { LEVELS } from "../logger/config";
import { IConfigProperty } from "./interfaces";

export const DEFAULT = {
  user: "ellie",
  key: "xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx",
  bail: 0,
  baseUrl: "http://localhost",
  browserstack: false,
  capabilities: {
    standalone:
    [
      {
        maxInstances: 10,
        browserName: "chrome",
        "goog:chromeOptions": {
          args: ["--disable-web-security", "--incognito", "--disable-gpu", "--headless"]
        }
      }
    ],
    browserstack:
    [
      {
        maxInstances: 10,
        browserName: "chrome",
        "bstack:options": {
          os: "Windows",
          osVersion: "10",
          resolution: "1920x1080",
          timezone: "Singapore"
        },
        "goog:chromeOptions": {
          args: ["--disable-web-security", "--incognito"]
        }
      }
    ]
  },
  comparableOptions: {
    ajaxRequests: {
      outputDir: ".comparable/ajax",
      skipCompare: false
    },
    visualRegression: {
      outputDir: ".comparable/image",
      skipCompare: false
    }
  },
  locale: "default",
  logLevel: "info",
  maxInstances: 10,
  pages: ["./pages/**/*.meta.js"],
  reportOutDir: ".reports",
  specFileRetries: 0,
  specs: ["./features/**/*.feature"],
  steps: ["./steps/definitions/**/*.js"],
  stepTimeout: 30000,
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

export const TLOU_QUOTES = {
  Ellie: [
    "After all we've been through. Everything that I've done. It can't be for nothing.",
    "Everyone I have cared for has either died, or left me. Everyone - fucking except for you!",
    "I'm gonna find and I'm gonna kill every last one of them.",
    "I'm just a girl, I'm not a threat.",
    "So don't tell me I would be safer with somebody else, because the truth is, I would just be more scared.",
    "Tell them that... Ellie is the little girl... that BROKE YOUR FUCKING FINGER!!!",
    "To the edge of the universe and back. Endure and survive.",
    "We're not murderers. We just survive.",
    "Well, maybe in all that research they turned into fucking monkeys."
  ],
  Joel: [
    "And just so we're clear about back there... It was either him or me.",
    "Endure and survive.",
    "I guess no matter how hard you try, you can't escape your past. Thank you.",
    "I struggled for a long time with survivin'. And you - No matter what, you keep finding something to fight for.",
    "Just one peaceful night... a clean conscience - all gone.",
    "Listen to me - if I get in trouble down there, you make every shot count. Yeah?",
    "What are you doin' kiddo?",
    "You have no idea what loss is.",
    "You really gonna go through with this?",
    "You think i'd let you do this on your own?",
    "You wanna know the best thing about my job? I don't gotta know why. Be honest with you, I could give two shits what you're up to.",
    "You're right. You're not my daughter - and I sure as hell ain't your dad. And we are going our separate ways.",
    "You're treading on some mighty thin ice here."
  ]
};

export const CORE_STEP_DEFS = "../core/steps/definitions/**/*.js";

export const PRETTIER_CONFIG = "/templates/.prettierrc";

export const LCL_CONFIG_TPL = "/templates/ellie.conf.tpl.ejs";

export const LCL_CONFIG_OUT = "ellie.conf.js";

export const SAMPLES_DIR = "/templates/samples";

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

export const SAMPLES_HELPER_SUCCESS_MESSAGE = `
Sample files created successfully!
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
    name: "browserstack",
    helptext: "Whether to enable the BrowserStack service.",
    inquiredOption: {
      enabled: true,
      type: "confirm",
      message: "Do you want to run your tests in BrowserStack?",
      default: DEFAULT.browserstack
    }
  },
  {
    name: "user",
    helptext: "BrowserStack username",
    overrideOption: {
      enabled: true,
      type: "string",
      description: "BrowserStack username"
    },
    inquiredOption: {
      enabled: true,
      type: "password",
      message: "What is your BrowserStack username?",
      default: DEFAULT.user,
      when: (answers): boolean => answers.browserstack === true
    }
  },
  {
    name: "key",
    helptext: "BrowserStack access key",
    overrideOption: {
      enabled: true,
      type: "string",
      description: "BrowserStack access key"
    },
    inquiredOption: {
      enabled: true,
      type: "password",
      message: "What is your BrowserStack access key?",
      default: DEFAULT.key,
      when: (answers): boolean => answers.browserstack === true
    }
  },
  {
    name: "capabilities",
    helptext: "W3C browser capabilities. See https://www.w3.org/TR/webdriver1/#capabilities"
  },
  {
    name: "comparableOptions",
    helptext: "Object containing properties of comparable files. See defaults for more info."
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
      default: DEFAULT.maxInstances
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
    helptext: "Directory to store the reports in, relative to the config file"
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

export const CONFIG_INQUIRY: IConfigProperty[] = CONFIG_PROPS
  .filter((i): boolean | undefined => i.inquiredOption && i.inquiredOption.enabled)
  .map((i): IConfigProperty => ({
    ...i.inquiredOption,
    name: i.name
  }));

export const SAMPLES_INQUIRY: any[] = [
  {
    name: "outDir",
    type: "input",
    message: "Where do you want to store the output files?",
    default: "./getstarted"
  }
];

export const USAGE = `
Usage:
  ellie init                   Launches the configuration helper
  ellie getstarted             Generate sample files to get started with
  ellie [file]                 Launches the WebdriverIO test runner
  ellie [file] [options]       Stdin overrides for certain config properties; See options list below
  ellie babygirl               Endure and survive

Complete list of properties:
* Inquired when running the config helper

${
  CONFIG_PROPS
  // create an array of config property objects containing only the name and helptext properties
    .map((i): IConfigProperty => ({ name: i.name, helptext: i.helptext }))
  // create an array of config property strings marking those inquired with an '*'
    .map((i): string => `  ${CONFIG_INQUIRY
      .filter((j): boolean => i.name === j.name)
      .map((): string => "* ")}${i.name}\t  ${i.helptext}`)
  // transform the array into a big string, each element separated by a line break
    .join("\n")
}`;
