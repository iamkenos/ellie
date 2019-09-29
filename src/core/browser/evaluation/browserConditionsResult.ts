import { IBrowserCondition, IExpectedConditionResult } from "../../interfaces";

export default class BrowserConditionsResult {
  private results: Map<string, IExpectedConditionResult>;

  public constructor() {
    this.results = new Map();
  }

  public setResult(key: string, value: IExpectedConditionResult): void {
    this.results.set(key, value);
  }

  public isSuccess(): boolean {
    return Array.from(this.results.values()).every(result => result.isSuccess && true);
  }

  public getErrorMessage(expression: string, conditions: IBrowserCondition[], timeout: number): string {
    const results = Array.from(this.results.values());
    const success = results.filter(result => result.isSuccess === true).length;
    const total = conditions.length;

    return `
  Browser expected conditions not met after waiting for ${timeout}ms
  Expression: ${expression}
  Session: ${browser.sessionId}
  Evaluation Summary: ${success}/${total}
  ${results.map(result => result.message).join("------------------------------")}`;
  }
}
