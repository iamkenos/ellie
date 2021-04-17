export const JS_MOUSE_SCROLL = `
var __extends =
(this && this.__extends) ||
function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
};
var scrollTo;
(function (scrollTo) {
  function simulate(list, xOffset, yOffset) {
    var wheelEvent = new WheelEvent("wheel", {
      deltaY: yOffset,
      deltaX: xOffset,
    });
    list.dispatchEvent(wheelEvent);
  }
  scrollTo.simulate = simulate;
})(scrollTo || (scrollTo = {}));
`;

export const JS_MOUSE_SCROLL_BY_QS = `
(function (qs, xOffset, yOffset) {
  ${JS_MOUSE_SCROLL};
  var list = document.querySelector(qs);
  scrollTo.simulate(list, xOffset, yOffset);
})(arguments[0], arguments[1], arguments[2]);
`;

export const JS_MOUSE_SCROLL_BY_XPATH = `
(function (listXpath, xOffset, yOffset) {
  ${JS_MOUSE_SCROLL};
  var list = document
    .evaluate(
      listXpath,
      document,
      null,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null
    )
    .iterateNext();
  scrollTo.simulate(list, xOffset, yOffset);
})(arguments[0], arguments[1], arguments[2]);
`;

export const JS_GET_PROP = "return arguments[0][arguments[1]];";

export const JS_MOUSE_CLICK = "arguments[0].click();";

export const JS_ELEM_EXEC_FUNC = (funcName: string, await: boolean) => `return ${await ? "await " : ""}arguments[0]['${funcName}']();`;

export const JS_ELEM_SET_ATTRIB = (key: string, value: string) => `arguments[0].setAttribute('${key}','${value}');`;

export const JS_GET_ABSOLUTE_XPATH = `
function absoluteXPath(element) {
  const parent = null;
  const comps = [];
  let xpath = '';
  let comp;

  function getPos(element) {
    let position = 1;
    let curNode;

    if (element.nodeType === Node.ATTRIBUTE_NODE) {
      return null;
    }

    for (curNode = element.previousSibling; curNode; curNode = curNode.previousSibling) {
      curNode.nodeName === element.nodeName && ++position;
    }

    return position;
  }

  if (element instanceof Document) {
    return '/';
  }

  for (; element && !(element instanceof Document);
    element = element.nodeType === Node.ATTRIBUTE_NODE ? element.ownerElement : element.parentNode) {
    comp = comps[comps.length] = {};

    switch (element.nodeType) {
      case Node.TEXT_NODE: comp.name = 'text()';
        break;
      case Node.ATTRIBUTE_NODE:
        comp.name = '@' + element.nodeName;
        break;
      case Node.PROCESSING_INSTRUCTION_NODE: comp.name = 'processing-instruction()';
        break;
      case Node.COMMENT_NODE:
        comp.name = 'comment()';
        break;
      case Node.ELEMENT_NODE:comp.name = element.nodeName;
        break;
    }

    comp.position = getPos(element);
  }

  for (let i = comps.length - 1; i >= 0; i--) {
    comp = comps[i]; xpath += '/' + comp.name.toLowerCase(); if (comp.position !== null) {
      xpath += '[' + comp.position + ']';
    }
  }
  return xpath;
} return absoluteXPath(arguments[0]);
`;

export const JS_WINDOW_SCROLL_TO_BOTTOM = "window.scrollTo(0, document.body.scrollHeight);";

export const JS_WINDOW_GET_ENTRIES = "return window.performance.getEntries();";

export const JS_IS_DOC_READY = "return document.readyState;";
