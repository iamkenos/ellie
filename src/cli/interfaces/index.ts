import { PreFilterFunction } from "deep-diff";
import { LogLevelDesc } from "loglevel";
import { ChoiceCollection, Question, QuestionMap } from "inquirer";
import { WdioCheckElementMethodOptions, WdioCheckFullPageMethodOptions, WdioCheckScreenMethodOptions } from "wdio-image-comparison-service";
import { Options } from "yargs";

interface IOverrideOption {
  alias?: Options["alias"];
  enabled: boolean;
  type: Options["type"];
  description: Options["description"];
}

interface IInquiredOption extends Question {
  enabled: boolean;
  type: keyof QuestionMap;
  message: Question["message"];
  default: Question["default"];
  choices?: ChoiceCollection;
  when?: (answers: any) => boolean | Promise<boolean>;
  validate?: (input: any, answers?: any) => boolean | string | Promise<boolean>;
}

export interface IComparable {
  /** Directory to store the output of this comparable object in, relative to the config file */
  outputDir?: string;
  /** (READONLY) Directory under `outputDir` where actual files are stored for comparison */
  readonly actualDir?: string;
  /** (READONLY) Directory under `outputDir` where baseline files are stored for comparison */
  readonly baselineDir?: string;
  /** (READONLY) Directory under `outputDir` where differences between files are stored for reference */
  readonly diffDir?: string;
  /** Skip comparison, just save the actual files */
  skipCompare?: boolean;
}

interface IComparableImage extends IComparable {
  /** If true, uses config 'locale' value instead of platform e.g. mac, lin, win, when searching for comparable images */
  overridePlatform?: boolean;
  /** If true, omits version number e.g. _v69 on the browser directory */
  overrideVersion?: boolean;
  /** Global options to use when comparing images */
  options?: WdioCheckElementMethodOptions | WdioCheckFullPageMethodOptions | WdioCheckScreenMethodOptions;
}
export interface IJSONDiffOptions {
  /** Conditional diffing based on [jsonpath](https://www.npmjs.com/package/jsonpath) and regex  */
  regex?: {
    paths: string[],
    expressions: string[]
  };
  /** Same as `deep-diff`'s [prefilter](https://www.npmjs.com/package/deep-diff#pre-filtering-object-properties) function */
  prefilter?: PreFilterFunction;
  /** Whether to apply sort before diffing */
  sort?: boolean;
}

interface IComparableHTTPResponse extends IComparable {
  /** Global options to use when comparing http response json files */
  options?: Omit<IJSONDiffOptions, "sort">
}

interface IComparableXHR extends IComparable {
  /** Global options to use when comparing xhr json file */
  options?: IJSONDiffOptions
}

interface IHooks {
  /** File path, relative to the config file that exports a default function; Follows the `before` hook signature;
   * @see [before](https://webdriver.io/docs/options/#before)
   **/
  before?: string;
  /** File path, relative to the config file that exports a default function; Follows the `beforeFeature` hook signature;
   * @see [beforeFeature](https://webdriver.io/docs/options/#beforefeature)
   **/
  beforeFeature?: string;
  /** File path, relative to the config file that exports a default function; Follows the `beforeScenario` hook signature;
   * @see [beforeScenario](https://webdriver.io/docs/options/#beforescenario)
   **/
  beforeScenario?: string;
  /** File path, relative to the config file that exports a default function; Follows the `beforeScenario` hook signature;
   * @see [beforeScenario](https://webdriver.io/docs/options/#beforescenario)
   **/
  beforeStep?: string;
  /** File path, relative to the config file that exports a default function; Follows the `afterStep` hook signature;
   * @see [afterStep](https://webdriver.io/docs/options/#afterstep)
   **/
  afterStep?: string;
  /** File path, relative to the config file that exports a default function; Follows the `afterScenario` hook signature;
   * @see [afterScenario](https://webdriver.io/docs/options/#afterscenario)
   **/
  afterScenario?: string;
  /** File path, relative to the config file that exports a default function; Follows the `afterFeature` hook signature;
   * @see [afterFeature](https://webdriver.io/docs/options/#afterfeature)
   **/
  afterFeature?: string;
  /** File path, relative to the config file that exports a default function; Follows the `after` hook signature;
   * @see [after](https://webdriver.io/docs/options/#after)
   **/
  after?: string;
}

export interface IConfigProperty {
  name: keyof IConfig;
  helptext?: string;
  overrideOption?: IOverrideOption;
  inquiredOption?: IInquiredOption;
}

export interface IConfig {
  /** BrowserStack username */
  user: string;
  /** BrowserStack access key */
  key: string;
  /** Threshold on the amount of tests allowed to fail before bailing out */
  bail: number;
  /** The base url of the application under test */
  baseUrl: string;
  /** W3C browser capabilities. See https://www.w3.org/TR/webdriver1/#capabilities */
  capabilities: object;
  /** Object containing properties of comparable files. See defaults for more info. */
  comparable: {
    /** Settings used for comparing intercepted XHRs  */
    ajaxRequest: IComparableXHR;
    /** Settings used for comparing http responses  */
    httpResponse: IComparableHTTPResponse;
    /** Settings used for comparing images */
    imageCompare: IComparableImage;
  };
  /** Whether to enable debug mode */
  debugEnabled: boolean;
  /** Locale to use when looking for elements in your meta files */
  locale: string;
  /** The level of logging verbosity */
  logLevel: LogLevelDesc;
  /** The number of concurrent browser instances to run per feature */
  maxInstances: number;
  /** Array of globs pointing to your meta files, relative to the config file */
  meta: string[];
  /** Whether to enable the use of BrowserStack */
  browserstackEnabled: boolean;
  /** Enable if you want to use BrowserStack to test local URLs */
  browserstackLocal: boolean;
  /** Directory to store the reports in, relative to the config file */
  reportOutDir: string;
  /** The selenium standalone install and runtime arguments */
  seleniumInstallArgs: {
    /** Selenium version to install */
    version?: string;
    /** Use a chrome driver version that fits your current browser version;
     * @see [W3C Capabilities](https://www.browserstack.com/automate/capabilities?tag=selenium-4)
     * */
    drivers: {}
  },
  /** The number of times to retry the entire spec file when it fails as a whole */
  specFileRetries: number;
  /** The number of times to retry a failing step */
  stepRetries: number;
  /** Array of globs pointing to your cucumber tests, relative to the config file */
  specs: string[];
  /** Array of globs pointing to your cucumber steps, relative to the config file */
  steps: string[];
  /** Only execute the features or scenarios with tags matching the expression */
  tags: string;
  /** Default timeout for WebdriverIO to wait for a single test step to finish in milliseconds */
  stepTimeout: number;
  /** Specifies the time to wait for the implicit element location strategy when locating elements */
  implicitTimeout: number;
  /** Session page load timeout that specifies a time to wait for the page loading to complete */
  pageLoadimeout: number;
  /** Default timeout for all browser 'waitFor' commands in milliseconds */
  waitforTimeout: number;
  /** Object containing keys that correspond to supported hooks */
  hooks: IHooks;
  /** Object containing keys that you want to be accessible from the global browser scope */
  custom: object;
}
