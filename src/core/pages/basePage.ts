import { driver } from "../browser";
import { getPageObject } from "../utils";
import { IPageMeta } from "../interfaces";

export default class BasePage {
  protected properties: any;

  protected url: string;

  protected title: string;

  protected locators: {
    [key: string]: string;
  };

  public constructor(meta: IPageMeta, locale?: string) {
    this.properties = getPageObject(meta, locale);
    this.url = this.properties.url;
    this.title = this.properties.title;
    this.locators = this.properties.locators;
  }

  public navigate(): void {
    driver.url(this.url);
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
