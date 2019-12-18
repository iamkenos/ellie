import * as winston from "winston";
import { INIT_MESSAGE, LEVELS, LOGGER } from "./config";

let logger: winston.Logger;
let loggerStackIndex: number;
let initialized = false;

function init(): void {
  loggerStackIndex = 2;
  logger = winston.createLogger(LOGGER);

  logger.log(LEVELS[4].name, INIT_MESSAGE);
}

export function getLogger(): winston.Logger {
  if (!initialized) {
    init();
    initialized = true;
  }
  return logger;
}

export function getLoggerStackIndex(): number {
  return loggerStackIndex;
}
