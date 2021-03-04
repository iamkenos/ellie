import { Selector } from "webdriverio/build";
import { IExpectedConditionResult } from "../../interfaces";

export default class ElementConditionsResult {
  private results: Map<string, IExpectedConditionResult>;

  private readonly selector: Selector;

  public constructor(selector: Selector) {
    this.results = new Map();
    this.selector = selector;
  }

  public setResult(key: string, value: IExpectedConditionResult): void {
    this.results.set(key, value);
  }

  public isSuccess(): boolean {
    return Array.from(this.results.values()).every(result => result.isSuccess && true);
  }

  public getErrorMessage(expression: string, timeout: number): string {
    const results = Array.from(this.results.values());
    const success = results.filter(result => result.isSuccess === true).length;
    const total = results.length;

    return `
  Element expected conditions not met after waiting for ${timeout}ms
  Expression: ${expression}
  Selector: ${this.selector}
  Evaluation Summary: ${success}/${total}
  ${results.map(result => result.message).join("------------------------------")}`;
  }

  public getElement(): WebdriverIO.Element {
    return $(this.selector);
  }

  public getElements(): WebdriverIO.Element[] {
    return $$(this.selector);
  }
}
