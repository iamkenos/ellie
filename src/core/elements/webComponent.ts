import WebElement from "./webElement";
import { IComponentMeta, UnionToIntersection } from "../interfaces";
import { getMetaObject } from "../utils";

export default abstract class WebComponent<T extends IComponentMeta> extends WebElement {
  public readonly properties: UnionToIntersection<T[keyof T]> & T[keyof T];

  public readonly labels: UnionToIntersection<T[keyof T]["labels"]>;

  public readonly locators: UnionToIntersection<T[keyof T]["locators"]>;

  public readonly tag: keyof UnionToIntersection<T[keyof T]["locators"]>;

  public readonly nodename: string;

  public readonly parent: string;

  public constructor(tag: keyof UnionToIntersection<T[keyof T]["locators"]>, meta: T, parent = "", locale?: string) {
    super(parent);
    this.parent = parent;
    this.tag = (getMetaObject(meta, locale).locators as any)[tag];
    this.nodename = tag as string;
    this.properties = getMetaObject(meta, locale);
    this.labels = this.properties.labels as any;
    this.locators = this.properties.locators as any;
    this.selector = this.selector + this.tag;
  }
}
