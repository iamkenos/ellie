import WebElement from "./webElement";
import { IComponentMeta, UnionToIntersection } from "../interfaces";
import { getPageObject } from "../utils";

export default abstract class WebComponent<T extends IComponentMeta> extends WebElement {
  protected properties: UnionToIntersection<T[keyof T]> & T[keyof T];

  protected locators: UnionToIntersection<T[keyof T]["locators"]>;

  public constructor(selector: keyof UnionToIntersection<T[keyof T]["locators"]>, meta: T, locale?: string) {
    super((getPageObject(meta, locale).locators as any)[selector]);
    this.properties = getPageObject(meta, locale);
    this.locators = this.properties.locators as any;
  }
}
