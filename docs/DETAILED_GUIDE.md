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

For simplicity, all the examples shown below will be the same ones you get from running the `whistle` command.

## CLI tool

Refer to the help menu for a quick overview of CLI usage and accepted commands

`npx ellie --help`

```txt
Usage:
  ellie init                        Launches the configuration helper
  ellie whistle                     Generate sample files to get started with
  ellie babygirl                    Endure and survive
  ellie [file]                      Launches the WebdriverIO test runner by feeding the default wdio.conf.js file
  ellie [file1] [file2]             Launches the WebdriverIO test runner by feeding the supplied secondary file
  ellie [file1] [file2]? [options]  Stdin overrides for certain config properties; See options list below

Complete list of properties:
* Inquired when running the config helper

  bail                   Threshold on the amount of tests allowed to fail before bailing out
  * baseUrl              The base url of the application under test
  capabilities           W3C browser capabilities. See https://www.w3.org/TR/webdriver1/#capabilities
  comparable             Object containing properties of comparable files. See defaults for more info.
  custom                 Object containing keys that you want to be accessible from the global browser scope
  hooks                  Object containing keys that correspond to supported hooks
  * logLevel             The level of logging verbosity
  locale                 Locale to use when looking for elements in your page meta files
  * maxInstances         The number of concurrent browser instances to run per feature
  * pages                Array of globs pointing to your page meta, relative to the config file
  * browserstackEnabled  Whether to enable the use of BrowserStack
  * browserstackLocal    Enable if you want to use BrowserStack to test local URLs
  * user                 BrowserStack username
  * key                  BrowserStack access key
  debugEnabled           Whether to enable debug mode
  reportOutDir           Directory to store the reports in, relative to the config file
  seleniumInstallArgs    The selenium standalone install and runtime arguments
  specFileRetries        The number of times to retry the entire spec file when it fails as a whole
  * specs                Array of globs pointing to your cucumber tests, relative to the config file
  * steps                Array of globs pointing to your cucumber steps, relative to the config file
  stepTimeout            Default timeout for WebdriverIO to wait for a single test step to finish in milliseconds
  tags                   Only execute the features or scenarios with tags matching the expression
  waitforTimeout         Default timeout for all browser 'waitFor' commands in milliseconds

Options:
  --help              Show help                                                                                [boolean]
  --version           Show version number                                                                      [boolean]
  --bail              Fail fast after hitting a threshold of failing tests                                      [number]
  --baseUrl           Shorten url command calls                                                                 [string]
  --logLevel, -l      Set the level of logging verbosity                                                        [string]
  --maxInstances      Set the number of concurrent browser instances running                                    [number]
  --user              BrowserStack username                                                                     [string]
  --key               BrowserStack access key                                                                   [string]
  --debugEnabled, -d  Run the tests in debug mode                                                              [boolean]
  --specs             Define which tests to run                                                                  [array]
  --tags              Set the cucumber tag to look for in the specs                                             [string]
```

The CLI tool supports a couple of commands, arguments, and options:

### Commands

- `init`:

  - `$ npx ellie init`
  - launches an inquirer prompt that generates a default configuration file `ellie.conf.ts` based on the answers provided; the file will be on the same directory as where the command is executed

- `whistle`:

  - `$ npx ellie whistle`
  - generates sample files to get you started with; the files will be generated inside on a `samples` directory, relative to where the command is executed

- `babygirl`:

  - `$ npx ellie babygirl`
  - to the edge of the universe and back, endure and survive; just because :)

### Arguments

- `[file]`:

  - `$ npx ellie ellie.conf.ts`
  - generates a `wdio.conf` file based on the contents parsed from the config file provided then starts the wdio test runner

- `[file1] [file2]`:

  - `$ npx ellie ellie.conf.ts overrides.conf.js`
  - generates a `wdio.conf` file based on the contents parsed from the `file1` provided
  - starts the wdio test runner by feeding in `file2` as the config to use
  - `file2` is expected to extend from the generated base `wdio.conf` file and export a merged version of the `config` object
  - this use case is suited if you feel restricted of all the other nifty features of wdio that isn't exposed by this abstraction

  ```js
  const base = require('./wdio.conf').config;
  const overrides = {
    // this hook isn't exposed
    onRefresh: () => {
      // do stuff here
    }
    // reporters are fixed to using junit and allure
    // here's a sample override
    reporters: [...base.reporters, 'dot']
  };

  exports.config = Object.assign({}, base, overrides);
  ```

### Options

- apart from the options `--help` and `--version`, all the other options are intended to be used as runtime overrides — hence, a config file is required; see the [configuration overrides](##overrides) section below for usage

## How to write tests

Tests are written in a `.feature` file — a collection of behaviors you want to simulate. Scenarios are formed in BDD style, using Cucumber's Gherkin language in order to make tests less code-like and more human readable.

It would be advisable to go through the following links if you're new to Cucumber and Gherkin:

- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [Step Definitions](https://cucumber.io/docs/cucumber/step-definitions/)
- [Tag Expressions](https://docs.cucumber.io/tag-expressions/)

_`webdriverIO.feature`_

```gherkin
@sample
Feature: WebDriverIO

  Next-gen WebDriver test framework for Node.js
  WebdriverIO is:
  - Extendable
  Adding helper functions, or more complicated sets and combinations of existing commands is simple and really useful
  - Compatible
  WebdriverIO has 1st class support for the WebDriver specification as well as to Appium and allows to run tests on desktop and mobile
  - Feature Rich
  It implements all Webdriver protocol commands and provides useful integrations with other tools

  ellie is an abstraction of WebdriverIO. It aims to get you started quickly on writing
  browser and devices automated tests using cucumber and page object model

  Background:
    Given I have a screen that is 1600 by 1024 pixels

  # These are tags
  @sample @boilerplate-style
  Scenario: Cucumber boilerplate style
    This is an example of writing tests following the cucumber boilerplate fashion.
    Element locators and page URLs are directly supplied from the built-in steps.
    Ideal when you want to get started quickly and run tests just by writing gherkin statements without additional code.
    It works but element locators will be harder to maintain as the number of tests grow.
    # This is a comment below the scenario description

    When I open the url "https://webdriver.io/"
    Then I expect the ".projectTitle" element text to be "WEBDRIVER I/O"
      And I expect the page title to be "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    When I click the "//a[text()='Get Started']" element
    Then I expect the "#docsNav" element to be displayed

  Scenario: Page object model: meta style
    This is an example of writing tests using page object model.
    Element locators and other page properties are defined in a meta file e.g. webdrverIO.meta.ts.
    Use the optional page name parameter on applicable built-in steps to access the page meta properties

    When I open the "WebdriverIO" page's url
    Then I expect the "WebdriverIO" page's "Project title" element text to be "WEBDRIVER I/O"
      And I expect the window title to match the "WebdriverIO" page's title
    When I click the "WebdriverIO" page's "Button: Get Started" element
    Then I expect the "WebdriverIO" page's "navBar" element to be displayed

  # Scenario outlines run multiple iterations of the same test. This is cucumber's take on data driven testing
  Scenario Outline: Page object model: classes style <ITER>
    This is another example of writing tests using page object model.
    Unlike the previous example, this one makes use page object classes e.g. webdrverIO.page.ts.
    This approach is more suitable for implementing custom and more complex steps.

    When I open the WebdriverIO page's url
    Then I expect the WebdriverIO page's project title to be "WEBDRIVER I/O"
      And I expect the window title to match the WebdriverIO page's title
    When I click the WebdriverIO page's Get Started button
    Then I expect the the WebdriverIO page's nav bar to be displayed

    Examples:
      | ITER       |
      | iteration1 |
      | iteration2 |
```

To write a single test, you need the bare minimum parts of a feature file:

### Feature

- described by a title and an optional narrative

  ```gherkin
  Feature: WebDriverIO

    Next-gen WebDriver test framework for Node.js
    WebdriverIO is:
    .
    .
    .
  ```

### Scenario

- described by a summary and an optional narrative

  ```gherkin
  Scenario: Cucumber boilerplate style
    This is an example of writing tests following the cucumber boilerplate fashion.
    .
    .
    .
  ```

### Steps

- denoted by keywords
  - `Given` — a condition
  - `When` — an action
  - `Then` — an outcome
  - `And` / `But` — used to conjugate successive `Given`s, `When`s, `Then`s to make the statements aesthetically pleasing
- has to map to a step definition

  ```gherkin
  When I open the url "https://webdriver.io/"
  Then I expect the ".projectTitle" element text to be "WEBDRIVER I/O"
    And I expect the page title to be "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
  When I click the "//a[text()='Get Started']" element
  Then I expect the "#docsNav" element to be displayed
  ```

- seeded step definitions are available [here](./SEEDED_STEPS.md)
- when using the seeded steps, arguments that correspond to an element locator can either be fed a selector directly or a selector identifier from an existing page meta — read more about meta files [below](#page-object-model)

  - this step will look for an element with the xpath `//a[text()='Get Started']`

    ```gherkin
    When I click the "//a[text()='Get Started']" element
    ```

  - this step will look for a locator identified by the key `"Button: Get Started"` inside a meta file named `WebdriverIO`

    ```gherkin
    When I click the "WebdriverIO" page's "Button: Get Started" element
    ```

    - meta name supplied in the steps is case-insensitive; this is being transformed to lowercase internally

## How to run tests

Open your configuration file and modify the property `specs` so that it provides a glob that includes the tests you want to run.

_`ellie.conf.ts`_

```ts
export default {
  .
  .
  specs: [
    "./features/path/to/my/feature/file1.feature",
    "./features/path/to/my/feature/file2.feature",
    "./features/path/to/**/*.feature", // providing a glob like this covers the other 2 above
  ],
  .
  .
}
```

From here, call the binary and provide the path to your configuration file

`$ ellie ellie.conf.ts`

## Page object model

Page object model is a design pattern where web pages are represented as classes. Web elements found on the said page are stored in the the same class, accessed using getters.

The actual selectors for these elements are stored in another reference file called the `meta`.

Although going with this approach is purely optional for you to write automated tests, learning how to use this will allow you to write more complex steps and make full use of the framework's features.

In most cases, ideally you would create the following files for each page you want to interact with:

- meta file — holds the locators
- page object file — interface between the meta file and the glue file
- glue file — holds functions that correspond to different actions you can do in the page; interface between the page object file and the step definition file
- step definition file — holds the regex matching functions for all your gherkin steps; interface between the glue file and feature file

_`webdriverIO.meta.ts`_

```ts
export default {
  default: {
    url: "https://webdriver.io/",
    title: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js",
    locators: {
      // locator keys can be enclosed in quotes
      "Project title": ".projectTitle",
      "Button: Get Started": "//a[text()='Get Started']",

      // or directly as a property
      navBar: "#docsNav"
    }
  }
};
```

A meta file should have the following parts:

### Default export

- denoted by `export default`

  ```ts
  export default {
    .
    .
    .
  }
  ```

### Default locale

- denoted by the `default` property

  ```ts
  default: {
    .
    .
    .
  }
  ```

### Default Url, Title, and Locators

- `url` — can either be a full url or a path; if a path is used, it will be resolved relative to the config file's `baseUrl` property
- `title` — the window title that is applied when the page is active
- `locators` — an object containing the selectors to various web elements found on the page
- these properties must be existing but not necessarily given a value when creating a meta file

  ```ts
  default: {
    url: "https://webdriver.io/",
    title: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js",
    locators: {
      // locator keys can be enclosed in quotes
      "Project title": ".projectTitle",
      "Button: Get Started": "//a[text()='Get Started']",

      // or directly as a property
      navBar: "#docsNav"
  }
  ```

It is also possible to add various locales which is specially useful for managing element selectors of pages that renders in different languages.

```ts
export default {
  default: {
    url: "https://webdriver.io/",
    title: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js",
    locators: {
      // locator keys can be enclosed in quotes
      "Project title": ".projectTitle",
      "Button: Get Started": "//a[text()='Get Started']",

      // or directly as a property
      navBar: "#docsNav"
    }
  },
  chinese: {
    url: "https://webdriver.io/zh",
    title: "Some title in chinese",
    locators: {
      "Button: Get Started": "//a[text()='开始使用']"
    }
  }
};
```

Given the meta file above and by modifying the configuration property `locale`, you can instruct the runner to pick values from the specific locale instead of the default.

_`ellie.conf.ts`_

```ts
export default {
  .
  .
  locale: "chinese",
  .
  .
}
```

_`webdriverIO.feature`_

```gherkin
When I open the "WebdriverIO" page's url
```

- this step will yield `https://webdriver.io/zh`

```gherkin
Then I expect the "WebdriverIO" page's "Project title" element text to be "WEBDRIVER I/O"
```

- since the `"Project title"` property is not defined in the `chinese` locale, the `default` value will be used

```gherkin
And I expect the window title to match the "WebdriverIO" page's title
```

- this step will yield `Some title in chinese`

```gherkin
When I click the "WebdriverIO" page's "Button: Get Started" element
```

- this step will yield `//a[text()='开始使用']`

_`webdriverIO.page.ts`_

```ts
import { BasePage, WebElement } from "@iamkenos/ellie";
import meta from "../meta/webdriverIO.meta";

export default class WebdriverIOPage extends BasePage<typeof meta> {
  constructor() {
    super(meta);
  }

  public projectTitle(): WebElement {
    return new WebElement(this.locators["Project title"]);
  }

  public getStarted(): WebElement {
    return new WebElement(this.locators["Button: Get Started"]);
  }

  public navBar(): WebElement {
    return new WebElement(this.locators.navBar);
  }
}
```

A page object file should have the following parts:

### BasePage import

- use member imports to take just what you need to

  ```ts
  import { BasePage, WebElement } from "@iamkenos/ellie";
  ```

### Meta file import

- use default import from the corresponding meta file

  ```ts
  import meta from "../meta/webdriverIO.meta";
  ```

### Default class export

- extend the imported `BasePage`, indicate the type argument simply as `typeof (your meta file)` which will help with typescript intellisense

  ```ts
  export default class WebdriverIOPage extends BasePage<typeof meta> {
    ...
  }
  ```

### Default constructor

- call the parent class' constructor and feed the imported meta

  ```ts
  constructor() {
    super(meta);
  }
  ```

### Element getters

- to allow you to interact with said elements from another file
- the use of `this.locators` is mainly for handling other locales

  ```ts
  public projectTitle(): WebElement {
    return new WebElement(this.locators["Project title"]);
  }

  public getStarted(): WebElement {
    return new WebElement(this.locators["Button: Get Started"]);
  }

  public navBar(): WebElement {
    return new WebElement(this.locators.navBar);
  }
  ```

## Adding custom steps

For better maintenance, separate your step definitions from the actual step implementations / glue code.

_`webdriverIO.glue.ts`_

```ts
import WebdriverIOPage from "../../pages/objects/webdriverIO.page";
import { driver } from "@iamkenos/ellie";

const wdioPage = new WebdriverIOPage();

export function navigate(): void {
  wdioPage.navigate();
}

export function checkTitle(preferred: boolean): void {
  wdioPage.checkTitle(!preferred);
}

export function clickGetStarted(): void {
  wdioPage.getStarted().click();
}

export function checkProjectTitleText(preferred: boolean, value: string): void {
  // you can create anonymous functions that encloses a single function which
  // returns a truthy value. this is useful when you want to create custom assertions
  // and still make use of the framework's internal retry mechanism
  const isProjectTitleTextEquals = (): boolean => wdioPage.projectTitle().isTextEquals(value, !preferred);
  driver.checkCustomTruthy(isProjectTitleTextEquals);

  // the check above is for illustration purposes and can be simplified by
  // using the statement below
  // wdioPage.projectTitle().checkTextEquals(value, !preferred);
}

export function checkNavBarDisplayed(preferred: boolean): void {
  wdioPage.navBar().checkDisplayed(!preferred);
}
```

A step glue file should have the following parts:

### Page object import

- use default import from the corresponding page object file

  ```ts
  import WebdriverIOPage from "../../pages/objects/webdriverIO.page";
  ```

### Page object instance

- use typescript class instances

  ```ts
  const wdioPage = new WebdriverIOPage();
  ```

### Exported functions

- you would ideally have action and assertion functions

  ```ts
  export function clickGetStarted(): void {
    wdioPage.getStarted().click();
  }

  .
  .
  .

  export function checkNavBarDisplayed(preferred: boolean): void {
    wdioPage.navBar().checkDisplayed(!preferred);
  }
  ```

_`webdriverIO.def.ts`_

```ts
import { Then, When } from "cucumber";
import * as webdrverIO from "../glue/webdriverIO.glue";

When(/^I open the WebdriverIO page's url$/, webdrverIO.navigate);

When(/^I click the WebdriverIO page's Get Started button$/, webdrverIO.clickGetStarted);

Then(/^I expect the window title to( not)? match the WebdriverIO page's title$/, webdrverIO.checkTitle);

Then(/^I expect the WebdriverIO page's project title to( not)? be "([^"]*)?"$/, webdrverIO.checkProjectTitleText);

Then(/^I expect the the WebdriverIO page's nav bar to( not)? be displayed$/, webdrverIO.checkNavBarDisplayed);
```

A step definition file should have the following parts:

### Cucumber keyword imports

- use member imports to take just what you need to

  ```ts
  import { Then, When } from "cucumber";
  ```

### Glue file import

- use multi import to access all exports from the corresponding glue file

  ```ts
  import * as webdrverIO from "../glue/webdriverIO.glue";
  ```

### Step functions

- you would ideally have action and assertion functions
- it is important to bear in mind that step definitions should be _**unique**_ across all the definition files
- you cannot have a feature step that matches to 2 step defintions as cucumber will be confused on which one to use

  ```ts
  When(
    /^I click the WebdriverIO page's Get Started button$/,
    webdrverIO.clickGetStarted
  );

  .
  .
  .

  Then(
    /^I expect the the WebdriverIO page's nav bar to( not)? be displayed$/,
    webdrverIO.checkNavBarDisplayed
  );
  ```

## Configurations

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
| seleniumInstallArgs      | {}                                       | The selenium standalone install and runtime arguments     |
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
| debugEnabled | d     | Run the tests in debug mode                            |
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
