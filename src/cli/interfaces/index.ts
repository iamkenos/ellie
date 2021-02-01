import { LogLevelDesc } from "loglevel";
import { ChoiceCollection, Question, QuestionMap } from "inquirer";
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
}

interface IComparable {
  outputDir: string;
  skipCompare: boolean;
}

interface IHooks {
  before?: string;
  beforeFeature?: string;
  beforeScenario?: string;
  beforeStep?: string;
  afterStep?: string;
  afterScenario?: string;
  afterFeature?: string;
  after?: string;
}

export interface IConfigProperty {
  name: keyof IConfig;
  helptext?: string;
  overrideOption?: IOverrideOption;
  inquiredOption?: IInquiredOption;
}

export interface IConfig {
  user?: string;
  key?: string;
  bail?: number;
  baseUrl?: string;
  capabilities?: object;
  comparable?: {
    ajaxRequest: IComparable;
    httpResponse: IComparable;
    imageCompare: IComparable;
  };
  debugEnabled?: boolean;
  locale?: string;
  logLevel?: LogLevelDesc;
  maxInstances?: number;
  pages?: string[];
  browserstackEnabled?: boolean;
  browserstackLocal?: boolean;
  reportOutDir?: string;
  seleniumInstallArgs?: {
    version?: string;
    drivers?: {}
  },
  specFileRetries?: number;
  specs?: string[];
  steps?: string[];
  tags?: string;
  stepTimeout?: number;
  implicitTimeout?: number;
  pageLoadimeout?: number;
  waitforTimeout?: number;
  hooks?: IHooks;
  custom?: object;
}
