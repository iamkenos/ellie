import chalk from "chalk";
import loglevel from "loglevel";
import prefix from "loglevel-plugin-prefix";

import Stack from "./stack";
import { DEFAULT_LEVEL, DEFAULT_LOG_COLORS, DEFAULT_NAME, LEVELS } from "./config";

class Log {
  private static instance: Log;
  private logger: loglevel.Logger;
  public getCaller: Function;
  public getCallerFile: Function;

  private constructor() {
    this.getCaller = Stack.getCaller;
    this.getCallerFile = Stack.getCallerFile;
    this.logger = loglevel.getLogger(DEFAULT_NAME);
    this.logger.setLevel(DEFAULT_LEVEL);

    this.applyFormatter();
  }

  private applyFormatter(): void {
    prefix.reg(loglevel);
    prefix.apply(this.logger, {
      template: "%t %l %n",
      timestampFormatter: (date) => chalk.gray(date.toISOString()),
      // @ts-ignore
      levelFormatter: (level) => chalk[DEFAULT_LOG_COLORS[level]](level.toUpperCase()),
      nameFormatter: (name) => chalk.whiteBright(name)
    });
  }

  public static getLogger(): Log {
    if (!Log.instance) Log.instance = new Log();
    return Log.instance;
  }

  public setLevel(level: loglevel.LogLevelDesc): void {
    if (level) {
      if (LEVELS.includes(level.toString())) {
        this.logger.setLevel(level);
      } else {
        this.warn("Logging level %s isn't supported. Use any one of %s", level, LEVELS);
      }
    }
  }

  public error(message: any, ...args: any[]): void {
    this.logger.error(`${this.getCallerFile()} ${message}`, ...args);
  }

  public warn(message: any, ...args: any[]): void {
    this.logger.warn(`${this.getCallerFile()} ${message}`, ...args);
  }

  public info(message: any, ...args: any[]): void {
    this.logger.info(`${this.getCallerFile()} ${message}`, ...args);
  }

  public debug(message: any, ...args: any[]): void {
    this.logger.debug(`${this.getCallerFile()} ${message}`, ...args);
  }

  public trace(message: any, ...args: any[]): void {
    this.logger.trace(`${this.getCallerFile()} ${message}`, ...args);
  }
}

export default Log.getLogger();
