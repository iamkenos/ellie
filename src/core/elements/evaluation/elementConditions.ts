import { AssertionError } from "chai";

import logger from "../../../logger";
import ElementConditionsResult from "./elementConditionsResult";
import {
  AttributeContains,
  AttributeEquals,
  AttributeExists,
  AxisLocationEquals,
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
  TextContains,
  TextContainsArray,
  TextEmpty,
  TextEquals,
  TextEqualsArray,
  ValueContains,
  ValueEmpty,
  ValueEquals
} from "../conditions";
import { IElementCondition, IImageCompareOptions } from "../../interfaces";

const WAIT_TIMEOUT: number = (browser as any).config.waitforTimeout;

export default class ElementConditions {
  private readonly conditions: IElementCondition[];

  private readonly name: string;

  private readonly result: ElementConditionsResult;

  private readonly selector: string;

  public constructor(selector: string, name? : string) {
    this.conditions = [];
    this.name = name || logger.getCaller();
    this.result = new ElementConditionsResult(selector);
    this.selector = selector;
  }

  public attributeContains(attribute: string, expected: string, reverse = false): ElementConditions {
    this.conditions.push(new AttributeContains(attribute, expected, reverse));
    return this;
  }

  public axisLocationEquals(axis: WebdriverIO.LocationParam, expected: number, reverse = false): ElementConditions {
    this.conditions.push(new AxisLocationEquals(axis, expected, reverse));
    return this;
  }

  public attributeExists(attribute: string, reverse = false): ElementConditions {
    this.conditions.push(new AttributeExists(attribute, reverse));
    return this;
  }

  public attributeEquals(attribute: string, expected: string, reverse = false): ElementConditions {
    this.conditions.push(new AttributeEquals(attribute, expected, reverse));
    return this;
  }

  public countEquals(expected: number, reverse = false): ElementConditions {
    this.conditions.push(new CountEquals(expected, reverse));
    return this;
  }

  public countGreaterThan(expected: number, reverse = false): ElementConditions {
    this.conditions.push(new CountGreaterThan(expected, reverse));
    return this;
  }

  public countLessThan(expected: number, reverse = false): ElementConditions {
    this.conditions.push(new CountLessThan(expected, reverse));
    return this;
  }

  public cssPropertyExists(cssProperty: string, reverse = false): ElementConditions {
    this.conditions.push(new CSSPropertyExists(cssProperty, reverse));
    return this;
  }

  public displayed(reverse = false): ElementConditions {
    this.conditions.push(new Displayed(reverse));
    return this;
  }

  public displayedInVewport(reverse = false): ElementConditions {
    this.conditions.push(new DisplayedInViewport(reverse));
    return this;
  }

  public enabled(reverse = false): ElementConditions {
    this.conditions.push(new Enabled(reverse));
    return this;
  }

  public existing(reverse = false): ElementConditions {
    this.conditions.push(new Existing(reverse));
    return this;
  }

  public focused(reverse = false): ElementConditions {
    this.conditions.push(new Focused(reverse));
    return this;
  }

  public imageMatch(filename: string, reverse = false, options?: IImageCompareOptions): ElementConditions {
    this.conditions.push(new ImageMatch(filename, reverse, options));
    return this;
  }

  public selected(reverse = false): ElementConditions {
    this.conditions.push(new Selected(reverse));
    return this;
  }

  public sizeEquals(width: number, height: number, reverse = false): ElementConditions {
    this.conditions.push(new SizeEquals(width, height, reverse));
    return this;
  }

  public sizeHeightEquals(expected: number, reverse = false): ElementConditions {
    this.conditions.push(new SizeHeightEquals(expected, reverse));
    return this;
  }

  public sizeWidthEquals(expected: number, reverse = false): ElementConditions {
    this.conditions.push(new SizeWidthEquals(expected, reverse));
    return this;
  }

  public textContains(expected: string, reverse = false): ElementConditions {
    this.conditions.push(new TextContains(expected, reverse));
    return this;
  }

  public textEmpty(reverse = false): ElementConditions {
    this.conditions.push(new TextEmpty(reverse));
    return this;
  }

  public textEquals(expected: string, reverse = false): ElementConditions {
    this.conditions.push(new TextEquals(expected, reverse));
    return this;
  }

  public textEqualsArray(expected: string[], reverse = false): ElementConditions {
    this.conditions.push(new TextEqualsArray(expected, reverse));
    return this;
  }

  public textContainsArray(expected: string[], reverse = false): ElementConditions {
    this.conditions.push(new TextContainsArray(expected, reverse));
    return this;
  }

  public valueContains(expected: string, reverse = false): ElementConditions {
    this.conditions.push(new ValueContains(expected, reverse));
    return this;
  }

  public valueEmpty(reverse = false): ElementConditions {
    this.conditions.push(new ValueEmpty(reverse));
    return this;
  }

  public valueEquals(expected: string, reverse = false): ElementConditions {
    this.conditions.push(new ValueEquals(expected, reverse));
    return this;
  }

  public run(timeout: number = WAIT_TIMEOUT): ElementConditionsResult {
    try {
      return this.runStrict(timeout);
    } catch (e) {
      logger.warn(e.message);
      return this.result;
    }
  }

  public runStrict(timeout: number = WAIT_TIMEOUT): ElementConditionsResult {
    try {
      logger.debug("Evaluating %s...", this.name);
      browser.waitUntil(
        (): boolean => {
          this.conditions.forEach(condition => {
            const evaluation = condition.evaluate(this.selector);
            this.result.setResult(evaluation.name, evaluation);
          });
          this.result.isSuccess() || logger.debug("Retrying...");
          return this.result.isSuccess();
        },
        timeout
      );
      return this.result;
    } catch (e) {
      throw new AssertionError(this.result.getErrorMessage(this.name, this.conditions, timeout));
    }
  }
}
