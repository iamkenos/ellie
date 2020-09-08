import { driver } from "../browser";
import { getPageObject } from "../utils";
import { IPageMeta } from "../interfaces";

export default class BasePage<T extends IPageMeta> {
  protected properties: T;

  protected url: string;

  protected title: string;

  protected locators: T["default"]["locators"]

  public constructor(meta: T, locale?: string) {
    this.properties = getPageObject(meta, locale);
    this.url = this.properties.default.url;
    this.title = this.properties.default.title;
    this.locators = this.properties.default.locators;
  }

  public navigate(): void {
    driver.url(this.url);
  }

  public getProperties(): T {
    return this.properties;
  }

  public getTitle(): string {
    return this.title;
  }

  public getUrl(): string {
    return this.url;
  }

  public checkTitle(reverse?: boolean): void {
    driver.checkTitleEquals(this.title, reverse);
  }

  public checkUrl(reverse?: boolean): void {
    driver.checkUrlEquals(this.url, reverse);
  }
}
