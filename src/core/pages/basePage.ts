import { driver } from "../browser";
import { getMetaObject } from "../utils";
import { IPageMeta, UnionToIntersection } from "../interfaces";

export default abstract class BasePage<T extends IPageMeta> {
  protected properties: UnionToIntersection<T[keyof T]> & T[keyof T];

  protected url: string;

  protected title: string;

  protected locators: UnionToIntersection<T[keyof T]["locators"]>;

  public constructor(meta: T, locale?: string) {
    this.properties = getMetaObject(meta, locale);
    this.url = this.properties.url || "";
    this.title = this.properties.title || "";
    this.locators = this.properties.locators as any;
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
