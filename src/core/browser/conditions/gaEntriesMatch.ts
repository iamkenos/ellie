import qs from "query-string";

import logger from "../../../logger";
import { IBrowserCondition, IBrowserPerformanceEntry, IExpectedConditionResult, IJSONDiffOptions } from "../../interfaces";
import { getJSONDiff } from "../../utils";
import { JS_WINDOW_GET_ENTRIES } from "../scripts";

export default class GoogleAnalyticsEntriesMatch implements IBrowserCondition {
  readonly name: string;

  private readonly url: string;

  private readonly initiatorTypes: string[];

  private readonly filename: string;

  private readonly event: string;

  private readonly preferred: boolean;

  private readonly options: IJSONDiffOptions;

  public constructor(filename: string, event: string, preferred: boolean, options: IJSONDiffOptions) {
    this.name = logger.getCaller(true);
    this.url = "www.google-analytics.com";
    this.initiatorTypes = ["xmlhttprequest", "img", "beacon"];
    this.filename = filename;
    this.preferred = preferred;
    this.options = options;
    this.event = event;
    this.options = options;
  }

  private filterGA(entries: IBrowserPerformanceEntry[]) {
    const filtered = entries
      .filter(e => e.name.includes(this.url) && this.initiatorTypes.includes(e.initiatorType))
      .map(e => qs.parseUrl(e.name))
      .map((e: qs.ParsedUrl) => ({
        url: e.url,
        query: e.query
      }));
    if (this.event) {
      return filtered.filter(e => e.query.ec === this.event);
    }
    return filtered;
  }

  public evaluate(): IExpectedConditionResult {
    let entries: any[];
    let result: boolean;
    let actual: string;

    try {
      entries = this.filterGA(browser.execute(JS_WINDOW_GET_ENTRIES));
      actual = getJSONDiff("ajaxRequest", this.filename, entries, this.options);
      result = this.preferred ? !actual : !!actual;
    } catch (e) {
      actual = e.message;
      result = false;
    }

    return {
      name: this.name,
      message:
  `
  Condition: ${this.preferred ? "" : "(Reversed) "}${this.name}
  Result: ${result ? "Success" : "Failed"}
  Expected: ${this.preferred ? "Match" : "Different"}
  Actual: ${actual}
  `,
      isSuccess: result
    };
  }
}
