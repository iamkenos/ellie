import { ChoiceCollection, Question, QuestionMap } from "inquirer";
import { Options } from "yargs";

interface IOverrideOption {
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
  before: string;
  beforeFeature: string;
  beforeScenario: string;
  beforeStep: string;
  afterStep: string;
  afterScenario: string;
  afterFeature: string;
  after: string;
}

export interface IConfigProperty {
  name: keyof IConfig;
  helptext?: string;
  overrideOption?: IOverrideOption;
  inquiredOption?: IInquiredOption;
}

export interface IConfig {
  user: string;
  key: string;
  bail: number;
  baseUrl: string;
  capabilities: object;
  comparable: {
    ajaxRequest: IComparable;
    httpResponse: IComparable;
    imageCompare: IComparable;
  };
  locale: string;
  logLevel: string;
  maxInstances: number;
  pages: string[];
  browserStackEnabled: boolean;
  browserstackLocal: boolean;
  reportOutDir: string;
  specFileRetries: number;
  specs: string[];
  steps: string[];
  stepTimeout: number;
  tags: string;
  waitforTimeout: number;
  hooks: IHooks;
  custom: object;
}
