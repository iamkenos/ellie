interface IOverrideOption {
  enabled: boolean;
  type: string;
  description: string;
}

interface IInquiredOption {
  enabled: boolean;
  type: string;
  message: string;
  default: string;
  choices?: string[];
}

export interface IConfigProperty {
  name: string;
  helptext?: string;
  overrideOption?: IOverrideOption;
  inquiredOption?: IInquiredOption;
}
