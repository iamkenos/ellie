export interface IBrowserCondition {
  name: string;
  evaluate(): IExpectedConditionResult;
}
export interface IElementCondition {
  name: string;
  evaluate(selector: string): IExpectedConditionResult;
}

export interface IExpectedConditionResult {
  name: string;
  message: string;
  isSuccess: boolean;
}
