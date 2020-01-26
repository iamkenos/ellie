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
        if (err) {} // Workaround for ts6133 & eslint handle-callback-err
        return strackTraces;
      };
      Error.captureStackTrace(this);
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
    const directory = path.dirname(element.getFileName());
    return `${path.basename(directory)}/${path.basename(element.getFileName())}[${element.getLineNumber()}]`;
  }

  public static getCaller(normalize? : boolean): string {
    const stack = new Stack().stack;
    const element = stack[STACK_TRACE_DEPTH];
    const functionName = element.getFunctionName();
    const caller = functionName ? `${element.getFunctionName().split(".").pop()}()` : "";
    return normalize ? normalizeFunctionName(caller) : caller;
  }
}
