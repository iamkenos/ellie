import { LEVELS, Stack } from "./config";
import { getLogger, getLoggerStackIndex } from "./setup";
import { normalizeFunctionName } from "./utils";

function log(level: string, message: string, ...args: any[]): void {
  getLogger().log(level, `${Stack.getCallerFile(getLoggerStackIndex())}: ${message}`, ...args);
}

export function error(message: string, ...args: any[]): void {
  log(LEVELS[0].name, message, ...args);
}

export function warn(message: string, ...args: any[]): void {
  log(LEVELS[1].name, message, ...args);
}

export function info(message: string, ...args: any[]): void {
  log(LEVELS[2].name, message, ...args);
}

export function debug(message: string, ...args: any[]): void {
  log(LEVELS[3].name, message, ...args);
}

export function trace(message: string, ...args: any[]): void {
  log(LEVELS[4].name, message, ...args);
}

export function getCallerFunc(normalize? : boolean): string {
  const caller = Stack.getCallerFunc(2);
  return normalize ? normalizeFunctionName(caller) : caller;
}

export function setLevel(level: string): void {
  const levels = LEVELS.map((i): string => i.name);

  if (level && getLogger().level !== level) {
    if (levels.includes(level)) {
      getLogger().level = level;
      info("Logging level override to %s", level);
    } else {
      warn("Logging level %s isn't supported. Use any one of %s", level, levels);
    }
  }
}
