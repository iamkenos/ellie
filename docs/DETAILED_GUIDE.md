# Detailed Guide

➤ [Home](../README.md)

---

## Table of contents

1. [CLI tool](#cli-tool)
2. [How to write tests](#how-to-write-tests)
3. [How to run tests](#how-to-run-tests)
4. [Page object model](#page-object-model)
5. [Adding custom steps](#adding-custom-steps)
6. [Configurations](#configurations)
7. [Debugging](#debugging)

## CLI tool

## How to write tests

## How to run tests

## Page object model

## Adding custom steps

## Configurations

### Helper

Launch the configuration helper by running the `init` command:

`ellie init`

This will generate a default configuration file `ellie.conf.ts` on the same directory as where the command is executed.

Refer the help menu for a quick overview of the properties supported:

`ellie --help`

### Properties

```txt
+==========================+==========================================+===========================================================+
| Option                   | Default                                  | Description                                               |
+==========================+==========================================+===========================================================+
| bail                     | 0                                        | Threshold on the amount of tests allowed                  |
|                          |                                          | to fail before bailing out                                |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| baseUrl                  | http://localhost                         | The base url of the application under test                |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| capabilities             | [{                                       | W3C browser capabilities.                                 |
|                          |    maxInstances: 5,                      | See https://www.w3.org/TR/webdriver1/#capabilities        |
|                          |    browserName: "chrome",                |                                                           |
|                          |    "goog:chromeOptions": {               |                                                           |
|                          |      args: [                             |                                                           |
|                          |        "--disable-web-security"          |                                                           |
|                          |        "--incognito"                     |                                                           |
|                          |      ]                                   |                                                           |
|                          |    }                                     |                                                           |
|                          | }]                                       |                                                           |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| comparable               | {                                        | Object containing properties of comparable files.         |
|                          |    ajaxRequest: {                        | See defaults for more info.                               |
|                          |      outputDir: ".comparable/ajax",      |                                                           |
|                          |      skipCompare: false                  |                                                           |
|                          |    },                                    |                                                           |
|                          |    httpResponse: {                       |                                                           |
|                          |      outputDir: ".comparable/http",      |                                                           |
|                          |      skipCompare: false                  |                                                           |
|                          |    },                                    |                                                           |
|                          |    imageCompare: {                       |                                                           |
|                          |      outputDir: ".comparable/image",     |                                                           |
|                          |      skipCompare: false                  |                                                           |
|                          |    }                                     |                                                           |
|                          | }                                        |                                                           |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| custom                   | {}                                       | Object containing keys that you want to be accessible     |
|                          |                                          |                                                           |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| hooks                    | {                                        | Object containing keys that correspond to                 |
|                          |    before: "",                           | supported hooks                                           |
|                          |    beforeFeature: "",                    |                                                           |
|                          |    beforeScenario: "",                   |                                                           |
|                          |    beforeStep: "",                       |                                                           |
|                          |    afterStep: "",                        |                                                           |
|                          |    afterScenario: "",                    |                                                           |
|                          |    afterFeature: "",                     |                                                           |
|                          |    after: ""                             |                                                           |
|                          | }                                        |                                                           |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| logLevel                 | warn                                     | The level of logging verbosity                            |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| locale                   | default                                  | Locale to use when looking for elemens                    |
|                          |                                          | in your page meta files                                   |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| maxInstances             | 5                                        | The number of concurrent browser instances                |
|                          |                                          | to run per feature                                        |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| pages                    | ["./pages/**/*.meta.js"]                 | Array of globs pointing to your page meta,                |
|                          |                                          | relative to the config file                               |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| browserstackEnabled      | false                                    | Whether to enable the use of BrowserStack                 |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| browserstackLocal        | false                                    | Enable if you want to use BrowserStack to test local URLs |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| user                     | ellie                                    | BrowserStack username                                     |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| key                      | xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx  | BrowserStack access key                                   |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| debugEnabled             | false                                    | Whether to enable debug mode                              |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| reportOutDir             | .reports                                 | Directory to store the reports in,                        |
|                          |                                          | relative to the config file                               |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| specFileRetries          | 0                                        | The number of times to retry the entire spec file         |
|                          |                                          | when it fails as a whole                                  |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| specs                    | ["./features/**/*.feature"]              | Array of globs pointing to your cucumber tests,           |
|                          |                                          | relative to the config file                               |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| steps                    | ["./steps/definitions/**/*.js"]          | Array of globs pointing to your cucumber steps,           |
|                          |                                          | relative to the config file                               |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| stepTimeout              | 30000                                    | Default timeout for WebdriverIO to wait for               |
|                          |                                          | a single test step to finish in milliseconds              |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| tags                     | ""                                       | Only execute the features or scenarios with tags          |
|                          |                                          | matching the expression                                   |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| waitforTimeout           | 5000                                     | Default timeout for all browser                           |
|                          |                                          | 'waitFor' commands in milliseconds                        |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
```

### Overrides

Certain configuration properties can be overriden from the command line by passing in the keys as options.

For instance, to run a single feature file and set the logging level to debug:

`ellie ellie.conf.ts --specs ./path/to/feature/file.feature --l debug`

| Key          | Alias | Description                                            |
| ------------ | ----- | ------------------------------------------------------ |
| bail         |       | Fail fast after hitting a threshold of failing tests   |
| baseUrl      |       | Shorten url command calls                              |
| logLevel     | l     | Set the level of logging verbosity                     |
| maxInstances |       | Set the number of concurrent browser instances running |
| user         |       | BrowserStack username                                  |
| key          |       | BrowserStack access key                                |
| debugEnabled |       | Run the tests in debug mode                            |
| specs        |       | Define which tests to run                              |
| tags         |       | Set the cucumber tag to look for in the specs          |

### Extending the configurations

You can extend your configuration files using typescript imports. This is specially useful when you want to create different config files for various test sets or even test environments.

`ellie.component.conf.ts`

```js
import config from "./ellie.conf";

config.specs = ["./features/component/*.feature"];

export default config;
```

From here you can run the tests as you would have done with any other config file:

`ellie ellie.component.conf.ts`

## Debugging
