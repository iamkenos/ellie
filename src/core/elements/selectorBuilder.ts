import { Selector } from "webdriverio";

export default class SelectorBuilder {
  private readonly ANY = "*";

  private readonly ESCAPE_PATTERN = /'/g;

  private readonly conditionals: string[];

  private readonly selector: Selector;

  public constructor(selector?: Selector) {
    this.conditionals = [];
    this.selector = selector || `//${this.ANY}`;
  }

  private wrap(condition: string, preferred = true): string {
    return preferred ? `[${condition}]` : `[not(${condition})]`;
  }

  private unslash(string: string): string {
    return string.replace(/^\/+/, "");
  }

  private xpathConcat(string: string): string {
    if (string.match(this.ESCAPE_PATTERN)) {
    // handle special cases where string passed contains either a ' or "
      const sqIndices: any[] = Array.from(string.matchAll(this.ESCAPE_PATTERN))
        .map(i => i.index).concat(string.length) || [];
      const parts: string[] = [];
      let start = 0;
      sqIndices.forEach((i) => {
        const prev = string.substring(start, i).replace(this.ESCAPE_PATTERN, "");
        const next = string[i];
        parts.push(prev ? `'${prev}'` : "", next ? `"${next}"` : "");
        start = i;
      });
      return `concat(${parts.filter(Boolean).join()})`;
    } else return `'${string}'`;
  }

  private index(selector: string, index: number): string {
    return `(${selector})[${index || 1}]`;
  }

  public or(): SelectorBuilder {
    this.conditionals.push("|");
    return this;
  }

  public position(position: number): SelectorBuilder {
    this.conditionals.push(`[position()=${position}]`);
    return this;
  }

  public previous(levels = 1): SelectorBuilder {
    this.conditionals.push("/..".repeat(levels));
    return this;
  }

  public next(levels = 1, tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/${this.ANY}`.repeat(levels).replace(/\/(?:.(?!\/))+$/, `/${tag}`));
    return this;
  }

  public hasExactAttribute(attribute: string, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`attribute::*[local-name()='${attribute}']`, preferred));
    return this;
  }

  public hasPartialAttribute(attribute: string, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`attribute::*[contains(local-name(),'${attribute}')]`, preferred));
    return this;
  }

  public attributeContains(attribute: string, value: string, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`contains(@${attribute},'${value}')`, preferred));
    return this;
  }

  public attributeEquals(attribute: string, value: string, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`@${attribute}='${value}'`, preferred));
    return this;
  }

  public nameContains(value: string, preferred?: boolean): SelectorBuilder {
    this.attributeContains("name", value, preferred);
    return this;
  }

  public nameEquals(value: string, preferred?: boolean): SelectorBuilder {
    this.attributeEquals("name", value, preferred);
    return this;
  }

  public idContains(value: string, preferred?: boolean): SelectorBuilder {
    this.attributeContains("id", value, preferred);
    return this;
  }

  public idEquals(value: string, preferred?: boolean): SelectorBuilder {
    this.attributeEquals("id", value, preferred);
    return this;
  }

  public classContains(value: string, preferred?: boolean): SelectorBuilder {
    this.attributeContains("class", value, preferred);
    return this;
  }

  public classOrTagContains(value: string, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`contains(@class,${value}) or contains(name(),${value})`, preferred));
    return this;
  }

  public classEquals(value: string, preferred?: boolean): SelectorBuilder {
    this.attributeEquals("class", value, preferred);
    return this;
  }

  public textContains(value: string, preferred?: boolean): SelectorBuilder {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`contains(text(),${value}) or text()[contains(.,${value})]`, preferred));
    return this;
  }

  public textEquals(value: string, preferred?: boolean): SelectorBuilder {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`text()=${value}`, preferred));
    return this;
  }

  public innerHtmlContains(value: string, preferred?: boolean): SelectorBuilder {
    value = this.xpathConcat(value);
    this.conditionals.push(this.wrap(`contains(.,${value})`, preferred));
    return this;
  }

  public ancestor(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/ancestor::${this.unslash(tag)}`);
    return this;
  }

  public hasAncestor(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`ancestor::${this.unslash(tag)}`, preferred));
    return this;
  }

  public ancestorOrSelf(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/ancestor-or-self::${this.unslash(tag)}`);
    return this;
  }

  public hasAncestorOrSelf(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`ancestor-or-self::${this.unslash(tag)}`, preferred));
    return this;
  }

  public child(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/child::${this.unslash(tag)}`);
    return this;
  }

  public hasChild(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`child::${this.unslash(tag)}`, preferred));
    return this;
  }

  public descendant(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/descendant::${this.unslash(tag)}`);
    return this;
  }

  public hasDescendant(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`descendant::${this.unslash(tag)}`, preferred));
    return this;
  }

  public descendantOrSelf(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/descendant-or-self::${this.unslash(tag)}`);
    return this;
  }

  public hasDescendantOrSelf(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`descendant-or-self::${this.unslash(tag)}`, preferred));
    return this;
  }

  public following(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/following::${this.unslash(tag)}`);
    return this;
  }

  public hasFollowing(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`following::${this.unslash(tag)}`, preferred));
    return this;
  }

  public followingSibling(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/following-sibling::${this.unslash(tag)}`);
    return this;
  }

  public hasFollowingSibling(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`following-sibling::${this.unslash(tag)}`, preferred));
    return this;
  }

  public namespace(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/namespace::${this.unslash(tag)}`);
    return this;
  }

  public hasNamespace(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`namespace::${this.unslash(tag)}`, preferred));
    return this;
  }

  public parent(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/parent::${this.unslash(tag)}`);
    return this;
  }

  public hasParent(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`parent::${this.unslash(tag)}`, preferred));
    return this;
  }

  public preceding(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/preceding::${this.unslash(tag)}`);
    return this;
  }

  public hasPreceding(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`preceding::${this.unslash(tag)}`, preferred));
    return this;
  }

  public precedingSibling(tag = this.ANY): SelectorBuilder {
    this.conditionals.push(`/preceding-sibling::${this.unslash(tag)}`);
    return this;
  }

  public hasPrecedingSibling(tag = this.ANY, preferred?: boolean): SelectorBuilder {
    this.conditionals.push(this.wrap(`preceding-sibling::${this.unslash(tag)}`, preferred));
    return this;
  }

  public build(index?: number): string {
    const selector = this.selector + this.conditionals.join("");
    return index === undefined ? selector : this.index(selector, index);
  }
}
