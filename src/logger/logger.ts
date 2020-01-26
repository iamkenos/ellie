import chalk from "chalk";
import loglevel from "loglevel";
import prefix from "loglevel-plugin-prefix";

import Stack from "./stack";
import { DEFAULT_LEVEL, DEFAULT_LOG_COLORS, DEFAULT_NAME, LEVELS } from "./config";

export default class Logger {
  private static instance: Logger;
  private logger: loglevel.Logger;
  public getCaller: Function;
  public getCallerFile: Function;

  private constructor() {
    this.getCaller = Stack.getCaller;
    this.getCallerFile = Stack.getCallerFile;
    this.logger = loglevel.getLogger(DEFAULT_NAME);
    this.logger.setLevel(DEFAULT_LEVEL);

    Logger.applyFormatter(this.logger);
  }

  private static applyFormatter(logger: loglevel.Logger): void {
    prefix.reg(loglevel);
    prefix.apply(logger, {
      template: "%t %l %n:",
      timestampFormatter: (date) => chalk.gray(date.toISOString()),
      levelFormatter: (level) => chalk[DEFAULT_LOG_COLORS[level]](level.toUpperCase()),
      nameFormatter: (name) => chalk.whiteBright(name)
    });
  }

  public static getLogger(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
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

  public error(message: string, ...args: any[]): void {
    this.logger.error(`${this.getCallerFile()} ${message}`, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    this.logger.warn(`${this.getCallerFile()} ${message}`, ...args);
  }

  public info(message: string, ...args: any[]): void {
    this.logger.info(`${this.getCallerFile()} ${message}`, ...args);
  }

  public debug(message: string, ...args: any[]): void {
    this.logger.debug(`${this.getCallerFile()} ${message}`, ...args);
  }

  public trace(message: string, ...args: any[]): void {
    this.logger.trace(`${this.getCallerFile()} ${message}`, ...args);
  }
}
