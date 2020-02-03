[Home](../../README.md) >> [Detailed Usage](../DETAILED_USAGE.md)

<br/>

## Configuration

---

### Configuration Options

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
|                          |    maxInstances: 5                       | See https://www.w3.org/TR/webdriver1/#capabilities        |
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
|                          |      outputDir: ".comparable/ajax",      |                                                           |
|                          |      skipCompare: false                  |                                                           |
|                          |    },                                    |                                                           |
|                          |    imageCompare: {                       |                                                           |
|                          |      outputDir: ".comparable/ajax",      |                                                           |
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
| logLevel                 | warn                                     | The the level of logging verbosity                        |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| locale                   | default                                  | Locale to use when looking for elemens                    |
|                          |                                          | in your page meta files                                   |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
| maxInstances             | 5                                        | The the number of concurrent browser instances            |
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
| waitforTimeout           |                                          | Default timeout for all browser                           |
|                          |                                          | 'waitFor' commands in milliseconds                        |
+--------------------------+------------------------------------------+-----------------------------------------------------------+
```

### Configuration Overrides

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
