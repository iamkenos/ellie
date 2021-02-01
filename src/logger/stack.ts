import * as path from "path";

import { STACK_TRACE_DEPTH } from "./config";
import { normalizeFunctionName } from "./utils";

export default class Stack {
  private stackTrace: any;

  private constructor() {
    const stackTrace = Error.prepareStackTrace;
    const stackLimit = Error.stackTraceLimit;
    try {
      Error.stackTraceLimit = STACK_TRACE_DEPTH * 2;
      Error.prepareStackTrace = (err, strackTraces): any => {
        // eslint-disable-next-line
        if (err) {} // Workaround for ts6133 & eslint handle-callback-err
        return strackTraces;
      };
      Error.captureStackTrace(this, Stack);
      this.stackTrace = this.stack;
    } finally {
      Error.stackTraceLimit = stackLimit;
      Error.prepareStackTrace = stackTrace;
    }
  }

  private get stack(): any {
    return this.stackTrace;
  }

  public static getCallerFile(): any {
    const stack = new Stack().stack;
    const element = stack[STACK_TRACE_DEPTH];
    const directory = path.basename(path.dirname(element.getFileName()));
    const file = path.basename(element.getFileName(), ".js");
    const caller = Stack.getCaller(false, STACK_TRACE_DEPTH + 1);
    return `${directory}/${file}${caller ? "/" + caller : ""}:`;
  }

  public static getCaller(normalize? : boolean, depth? : number): string {
    const stack = new Stack().stack;
    const element = stack[depth || STACK_TRACE_DEPTH];
    const functionName = element.getFunctionName();
    const caller = functionName ? `${element.getFunctionName().split(".").pop()}()` : "";
    return normalize ? normalizeFunctionName(caller) : caller;
  }
}
