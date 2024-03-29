import { ExpectedConditionsError } from "../../../exceptions";
import { WdioCheckElementMethodOptions } from "wdio-image-comparison-service";
import { Selector } from "webdriverio";

import logger from "../../../logger";
import ElementConditionsResult from "./elementConditionsResult";
import {
  AttributeContains,
  AttributeEquals,
  AttributeExists,
  AxisLocationEquals,
  Clickable,
  CountEquals,
  CountGreaterThan,
  CountLessThan,
  CSSPropertyExists,
  Displayed,
  DisplayedInViewport,
  Enabled,
  Existing,
  Focused,
  ImageMatch,
  Selected,
  SizeEquals,
  SizeHeightEquals,
  SizeWidthEquals,
  StylePropContains,
  StylePropEquals,
  StylePropExists,
  TextContains,
  TextContainsArray,
  TextEmpty,
  TextEquals,
  TextEqualsArray,
  ValueContains,
  ValueEmpty,
  ValueEquals
} from "../conditions";
import { IElementCondition, TElementCoordinates } from "../../interfaces";

// @ts-ignore
const WAIT_TIMEOUT: number = browser.config.waitforTimeout;

export default class ElementConditions {
  private readonly conditions: IElementCondition[];

  private readonly result: ElementConditionsResult;

  private readonly selector: Selector;

  public name: string;

  public timeout?: number;

  public constructor(selector: Selector, name? : string) {
    this.conditions = [];
    this.name = name || logger.getCaller();
    this.result = new ElementConditionsResult(selector);
    this.selector = selector;
  }

  public setTimeout(timeout: number) {
    this.timeout = timeout;
    return this;
  }

  public attributeContains(attribute: string, expected: string, preferred: boolean): ElementConditions {
    this.conditions.push(new AttributeContains(attribute, expected, preferred));
    return this;
  }

  public axisLocationEquals(axis: TElementCoordinates, expected: number, preferred: boolean): ElementConditions {
    this.conditions.push(new AxisLocationEquals(axis, expected, preferred));
    return this;
  }

  public attributeExists(attribute: string, preferred: boolean): ElementConditions {
    this.conditions.push(new AttributeExists(attribute, preferred));
    return this;
  }

  public attributeEquals(attribute: string, expected: string, preferred: boolean): ElementConditions {
    this.conditions.push(new AttributeEquals(attribute, expected, preferred));
    return this;
  }

  public clickable(preferred: boolean): ElementConditions {
    this.conditions.push(new Clickable(preferred));
    return this;
  }

  public countEquals(expected: number, preferred: boolean): ElementConditions {
    this.conditions.push(new CountEquals(expected, preferred));
    return this;
  }

  public countGreaterThan(expected: number, preferred: boolean): ElementConditions {
    this.conditions.push(new CountGreaterThan(expected, preferred));
    return this;
  }

  public countLessThan(expected: number, preferred: boolean): ElementConditions {
    this.conditions.push(new CountLessThan(expected, preferred));
    return this;
  }

  public cssPropertyExists(cssProperty: string, preferred: boolean): ElementConditions {
    this.conditions.push(new CSSPropertyExists(cssProperty, preferred));
    return this;
  }

  public displayed(preferred: boolean): ElementConditions {
    this.conditions.push(new Displayed(preferred));
    return this;
  }

  public displayedInVewport(preferred: boolean): ElementConditions {
    this.conditions.push(new DisplayedInViewport(preferred));
    return this;
  }

  public enabled(preferred: boolean): ElementConditions {
    this.conditions.push(new Enabled(preferred));
    return this;
  }

  public existing(preferred: boolean): ElementConditions {
    this.conditions.push(new Existing(preferred));
    return this;
  }

  public focused(preferred: boolean): ElementConditions {
    this.conditions.push(new Focused(preferred));
    return this;
  }

  public imageMatch(filename: string, preferred: boolean, options?: WdioCheckElementMethodOptions): ElementConditions {
    this.conditions.push(new ImageMatch(filename, preferred, options));
    return this;
  }

  public selected(preferred: boolean): ElementConditions {
    this.conditions.push(new Selected(preferred));
    return this;
  }

  public sizeEquals(width: number, height: number, preferred: boolean): ElementConditions {
    this.conditions.push(new SizeEquals(width, height, preferred));
    return this;
  }

  public sizeHeightEquals(expected: number, preferred: boolean): ElementConditions {
    this.conditions.push(new SizeHeightEquals(expected, preferred));
    return this;
  }

  public sizeWidthEquals(expected: number, preferred: boolean): ElementConditions {
    this.conditions.push(new SizeWidthEquals(expected, preferred));
    return this;
  }

  public stylePropContains(prop: string, expected: string, preferred: boolean): ElementConditions {
    this.conditions.push(new StylePropContains(prop, expected, preferred));
    return this;
  }

  public stylePropEquals(prop: string, expected: string, preferred: boolean): ElementConditions {
    this.conditions.push(new StylePropEquals(prop, expected, preferred));
    return this;
  }

  public stylePropExists(prop: string, preferred: boolean): ElementConditions {
    this.conditions.push(new StylePropExists(prop, preferred));
    return this;
  }

  public textContains(expected: string, preferred: boolean): ElementConditions {
    this.conditions.push(new TextContains(expected, preferred));
    return this;
  }

  public textEmpty(preferred: boolean): ElementConditions {
    this.conditions.push(new TextEmpty(preferred));
    return this;
  }

  public textEquals(expected: string, preferred: boolean): ElementConditions {
    this.conditions.push(new TextEquals(expected, preferred));
    return this;
  }

  public textEqualsArray(expected: string[], preferred: boolean): ElementConditions {
    this.conditions.push(new TextEqualsArray(expected, preferred));
    return this;
  }

  public textContainsArray(expected: string[], preferred: boolean): ElementConditions {
    this.conditions.push(new TextContainsArray(expected, preferred));
    return this;
  }

  public valueContains(expected: string, preferred: boolean): ElementConditions {
    this.conditions.push(new ValueContains(expected, preferred));
    return this;
  }

  public valueEmpty(preferred: boolean): ElementConditions {
    this.conditions.push(new ValueEmpty(preferred));
    return this;
  }

  public valueEquals(expected: string, preferred: boolean): ElementConditions {
    this.conditions.push(new ValueEquals(expected, preferred));
    return this;
  }

  public run(action?: Function, timeout?: number): ElementConditionsResult {
    try {
      return this.runStrict(action, timeout);
    } catch (e) {
      logger.warn(e.message);
      return this.result;
    }
  }

  public runStrict(action?: Function, timeout?: number): ElementConditionsResult {
    timeout = timeout || this.timeout || WAIT_TIMEOUT;
    try {
      logger.debug("Evaluating %s...", this.name);
      browser.waitUntil(
        (): boolean => {
          // optional action to perform while retrying, useful for cases like click until something is met
          // the action function here is supposed to be an anonymous function assigned to a variable
          // e.g const action = () => { element.click() }
          action !== undefined && action();
          this.conditions.forEach(condition => {
            const evaluation = condition.evaluate(this.selector);
            this.result.setResult(evaluation.name, evaluation);
          });
          this.result.isSuccess() || logger.debug("Retrying...");
          return this.result.isSuccess();
        },
        {
          timeout: timeout,
          interval: 1000
        }
      );
      return this.result;
    } catch (e) {
      throw new ExpectedConditionsError(this.result.getErrorMessage(this.name, timeout, e));
    }
  }
}
