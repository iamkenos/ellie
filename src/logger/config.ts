import * as path from "path";
import * as winston from "winston";
import { TransformableInfo } from "logform";

const FORMAT = winston.format.combine(
  winston.format.printf((info): string => {
    return `${info.timestamp} ${info.level} ${info.message}`;
  })
);

const TRANSPORTS = [
  {
    enabled: true,
    transport: new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), FORMAT)
    })
  }
];

export const LEVELS = [
  { name: "error", level: 0 },
  { name: "warn", level: 1 },
  { name: "info", level: 2 },
  { name: "debug", level: 4 },
  { name: "trace", level: 5 }
];

export const LOGGER = {
  level: LEVELS[2].name,
  levels: LEVELS.reduce((i, j): object => ({ ...i, [j.name]: j.level }), {}),
  format: winston.format.combine(
    winston.format(
      (info): TransformableInfo => {
        info.level = info.level.toUpperCase();
        return info;
      }
    )(),
    winston.format.splat(),
    winston.format.timestamp()
  ),
  transports: TRANSPORTS.filter((i): boolean => i.enabled).map((i): any => i.transport),
  exceptionHandlers: TRANSPORTS,
  silent: false
};

export const INIT_MESSAGE = `Logger Initialized
Level: ${LOGGER.level},
Transports: ${LOGGER.transports.map((i): string => i.name)}
`;

export class Stack {
  private customStack: any;

  private constructor() {
    const stackTrace = Error.prepareStackTrace;
    const stackLimit = Error.stackTraceLimit;
    try {
      Error.stackTraceLimit = 6;
      Error.prepareStackTrace = (err, strackTraces): any => {
        if (err) {} // Fix for ts6133 & eslint handle-callback-err
        return strackTraces;
      };
      Error.captureStackTrace(this);
      this.customStack = this.stack;
    } finally {
      Error.stackTraceLimit = stackLimit;
      Error.prepareStackTrace = stackTrace;
    }
  }

  private get stack(): any {
    return this.customStack;
  }

  public static getCallerFile(callerIndex: number): any {
    const stack = new Stack().stack;
    const element = stack[callerIndex + 2];
    const directory = path.dirname(element.getFileName());
    return `${path.basename(directory)}/${path.basename(element.getFileName())}[${element.getLineNumber()}]`;
  }

  public static getCallerFunc(callerIndex: number): any {
    const stack = new Stack().stack;
    const element = stack[callerIndex + 2];
    const functionName = element.getFunctionName();
    return functionName ? `${element.getFunctionName().split(".").pop()}()` : undefined;
  }
}
