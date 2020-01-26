
import { LogLevelDesc } from "loglevel";
import { ForegroundColor } from "chalk";

export const STACK_TRACE_DEPTH = 3;

export const DEFAULT_NAME = "ellie";

export const DEFAULT_LEVEL: LogLevelDesc = "info";

export const DEFAULT_LOG_COLORS: { [key in LogLevelDesc]?: typeof ForegroundColor } = {
  silent: "white",
  error: "red",
  warn: "yellow",
  info: "cyanBright",
  debug: "green",
  trace: "cyan"
};

export const LEVELS = Object.keys(DEFAULT_LOG_COLORS);
