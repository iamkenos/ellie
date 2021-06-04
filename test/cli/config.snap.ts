// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`cli/config should expose a config helper intro message 1`] = `
"
----------------------------------
Configuration Helper
----------------------------------"
`;

exports[`cli/config should expose a config helper success message 1`] = `
"
Configuration file was created successfully!
To run your tests, execute:
$ npx ellie ellie.conf.ts
"
`;

exports[`cli/config should expose a core step defs glob 1`] = `"../../core/steps/definitions/**/*.js"`;

exports[`cli/config should expose a default config 1`] = `
Object {
  "bail": 0,
  "baseUrl": "http://localhost",
  "browserstackEnabled": false,
  "browserstackLocal": false,
  "capabilities": Array [
    Object {
      "browserName": "chrome",
      "goog:chromeOptions": Object {
        "args": Array [
          "--disable-web-security",
          "--incognito",
        ],
      },
      "maxInstances": 5,
    },
  ],
  "comparable": Object {
    "ajaxRequest": Object {
      "outputDir": ".comparable/ajax",
      "skipCompare": false,
    },
    "httpResponse": Object {
      "outputDir": ".comparable/http",
      "skipCompare": false,
    },
    "imageCompare": Object {
      "outputDir": ".comparable/image",
      "skipCompare": false,
    },
  },
  "custom": Object {},
  "debugEnabled": false,
  "hooks": Object {
    "after": "",
    "afterFeature": "",
    "afterScenario": "",
    "afterStep": "",
    "before": "",
    "beforeFeature": "",
    "beforeScenario": "",
    "beforeStep": "",
  },
  "implicitTimeout": 0,
  "key": "xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx",
  "locale": "default",
  "logLevel": "warn",
  "maxInstances": 5,
  "meta": Array [
    "./fixtures/**/*.meta.ts",
  ],
  "pageLoadimeout": 300000,
  "reportOutDir": ".reports",
  "seleniumInstallArgs": Object {
    "drivers": Object {
      "chrome": Object {
        "version": "latest",
      },
    },
  },
  "specFileRetries": 0,
  "specs": Array [
    "./features/**/*.feature",
  ],
  "stepRetries": 0,
  "stepTimeout": 30000,
  "steps": Array [
    "./fixtures/**/*.def.ts",
  ],
  "tags": "",
  "user": "ellie",
  "waitforTimeout": 5000,
}
`;

exports[`cli/config should expose a local config template file 1`] = `"/resources/ellie.conf.tpl.ejs"`;

exports[`cli/config should expose a local data directory 1`] = `"/Users/iamkenos/.ellie"`;

exports[`cli/config should expose a local output template file 1`] = `"ellie.conf.ts"`;

exports[`cli/config should expose a prettier config file 1`] = `"/resources/.prettierrc"`;

exports[`cli/config should expose a resources directory 1`] = `"/resources"`;

exports[`cli/config should expose a samples directory 1`] = `"/samples"`;

exports[`cli/config should expose a samples helper success message 1`] = `
"
Sample files created successfully!
To run your tests, execute:
$ npx ellie ./samples/ellie.conf.ts
"
`;

exports[`cli/config should expose a samples helper tsconfig exists message 1`] = `
"
You seem to have already created a tsconfig.json file.
Consider adding the following:
"
`;

exports[`cli/config should expose a samples tsconfig file 1`] = `"tsconfig.json"`;

exports[`cli/config should expose a wdio config template file 1`] = `"/resources/wdio.conf.tpl.ejs"`;

exports[`cli/config should expose a wdio output template file 1`] = `"wdio.conf.js"`;

exports[`cli/config should expose fancy quotes 1`] = `
Object {
  "Ellie": Array [
    "After all we've been through. Everything that I've done. It can't be for nothing.",
    "Everyone I have cared for has either died, or left me. Everyone - fucking except for you!",
    "I'm gonna find and I'm gonna kill every last one of them.",
    "I'm just a girl, I'm not a threat.",
    "So don't tell me I would be safer with somebody else, because the truth is, I would just be more scared.",
    "Tell them that... Ellie is the little girl... that BROKE YOUR FUCKING FINGER!!!",
    "To the edge of the universe and back. Endure and survive.",
    "We're not murderers. We just survive.",
    "Well, maybe in all that research they turned into fucking monkeys.",
  ],
  "Joel": Array [
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
    "You're treading on some mighty thin ice here.",
  ],
}
`;

exports[`cli/config should expose the cli inquirer questions 1`] = `
Array [
  Object {
    "default": "http://localhost",
    "enabled": true,
    "message": "What is the base url of your application?",
    "name": "baseUrl",
    "type": "input",
  },
  Object {
    "choices": Array [
      "silent",
      "error",
      "warn",
      "info",
      "debug",
      "trace",
    ],
    "default": "warn",
    "enabled": true,
    "message": "What level of logging verbosity would you like?",
    "name": "logLevel",
    "type": "list",
  },
  Object {
    "default": 5,
    "enabled": true,
    "message": "How many concurrent features would you like running during the test?",
    "name": "maxInstances",
    "type": "input",
    "validate": [Function],
  },
  Object {
    "default": "./fixtures/**/*.meta.ts",
    "enabled": true,
    "message": "Where are your meta files located?",
    "name": "meta",
    "type": "input",
  },
  Object {
    "default": false,
    "enabled": true,
    "message": "Would you like to enable BrowserStack?",
    "name": "browserstackEnabled",
    "type": "confirm",
  },
  Object {
    "default": false,
    "enabled": true,
    "message": "Would you be testing local URLs in BrowserStack?",
    "name": "browserstackLocal",
    "type": "confirm",
    "when": [Function],
  },
  Object {
    "default": "ellie",
    "enabled": true,
    "message": "What is your BrowserStack username?",
    "name": "user",
    "type": "password",
    "when": [Function],
  },
  Object {
    "default": "xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx",
    "enabled": true,
    "message": "What is your BrowserStack access key?",
    "name": "key",
    "type": "password",
    "when": [Function],
  },
  Object {
    "default": "./features/**/*.feature",
    "enabled": true,
    "message": "Where are your feature files located?",
    "name": "specs",
    "type": "input",
  },
  Object {
    "default": "./fixtures/**/*.def.ts",
    "enabled": true,
    "message": "Where are your step definitions located?",
    "name": "steps",
    "type": "input",
  },
]
`;

exports[`cli/config should expose the cli options 1`] = `
Array [
  Object {
    "description": "Fail fast after hitting a threshold of failing tests",
    "enabled": true,
    "name": "bail",
    "type": "number",
  },
  Object {
    "description": "Shorten url command calls",
    "enabled": true,
    "name": "baseUrl",
    "type": "string",
  },
  Object {
    "alias": "l",
    "description": "Set the level of logging verbosity",
    "enabled": true,
    "name": "logLevel",
    "type": "string",
  },
  Object {
    "description": "Set the number of concurrent browser instances running",
    "enabled": true,
    "name": "maxInstances",
    "type": "number",
  },
  Object {
    "description": "BrowserStack username",
    "enabled": true,
    "name": "user",
    "type": "string",
  },
  Object {
    "description": "BrowserStack access key",
    "enabled": true,
    "name": "key",
    "type": "string",
  },
  Object {
    "alias": "d",
    "description": "Run the tests in debug mode",
    "enabled": true,
    "name": "debugEnabled",
    "type": "boolean",
  },
  Object {
    "description": "Define which tests to run",
    "enabled": true,
    "name": "specs",
    "type": "array",
  },
  Object {
    "description": "Set the cucumber tag to look for in the specs",
    "enabled": true,
    "name": "tags",
    "type": "string",
  },
]
`;

exports[`cli/config should expose the cli usage message 1`] = `
"
Usage:
  npx ellie init                        Launches the configuration helper
  npx ellie whistle                     Generate sample files to get started with
  npx ellie babygirl                    Endure and survive
  npx ellie report                      Launches the allure reporter; takes the data from the latest test run
  npx ellie [file]                      Launches the WebdriverIO test runner by feeding the default wdio.conf.js file
  npx ellie [file1] [file2]             Launches the WebdriverIO test runner by feeding the overrides js file
  npx ellie [file1] [file2]? [options]  Stdin overrides for certain config properties; See options list below

Complete list of properties:
* Inquired when running the config helper

  bail	  Threshold on the amount of tests allowed to fail before bailing out
  * baseUrl	  The base url of the application under test
  capabilities	  W3C browser capabilities. See https://www.w3.org/TR/webdriver1/#capabilities
  comparable	  Object containing properties of comparable files. See defaults for more info.
  custom	  Object containing keys that you want to be accessible from the global browser scope
  hooks	  Object containing keys that correspond to supported hooks
  * logLevel	  The level of logging verbosity
  locale	  Locale to use when looking for elements in your meta files
  * maxInstances	  The number of concurrent browser instances to run per feature
  * meta	  Array of globs pointing to your meta files, relative to the config file
  * browserstackEnabled	  Whether to enable the use of BrowserStack
  * browserstackLocal	  Enable if you want to use BrowserStack to test local URLs
  * user	  BrowserStack username
  * key	  BrowserStack access key
  debugEnabled	  Whether to enable debug mode
  reportOutDir	  Directory to store the reports in, relative to the config file
  seleniumInstallArgs	  The selenium standalone install and runtime arguments
  specFileRetries	  The number of times to retry the entire spec file when it fails as a whole
  stepRetries	  The number of times to retry a failing step
  * specs	  Array of globs pointing to your cucumber tests, relative to the config file
  * steps	  Array of globs pointing to your cucumber steps, relative to the config file
  stepTimeout	  Default timeout for WebdriverIO to wait for a single test step to finish in milliseconds
  tags	  Only execute the features or scenarios with tags matching the expression
  implicitTimeout	  Specifies the time to wait for the implicit element location strategy when locating elements
  pageLoadimeout	  Session page load timeout that specifies a time to wait for the page loading to complete
  waitforTimeout	  Default timeout for all browser 'waitFor' commands in milliseconds"
`;
