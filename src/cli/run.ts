import { existsSync } from "fs";
import { join } from "path";
import { Arguments } from "yargs";

import * as logger from "../logger";
import { OVERRIDE_OPTS } from "./config";
import { createLocalConfig, createWdioConfig } from "./setup";
import { inspect } from "./utils";

export default (args: Arguments<any>): any => {
  // show help and exit if there are no arguments provided
  args.argv._.length === 0 && args.showHelp() && process.exit(0);

  // build the cli overrides object
  const overrides: any = OVERRIDE_OPTS
    .filter((i): boolean => args.argv[i.name])
    .reduce((i, j): object => ({ ...i, [j.name]: args.argv[j.name] }), {});
  logger.setLevel(overrides.logLevel);
  logger.trace("Started with args: \n%s", inspect(args.argv));
  logger.debug("Override options: \n%s", inspect(overrides));

  const firstArg = args.argv._[0];
  const userConf = join(process.cwd(), firstArg);

  // if the first argument is "config"
  // then run the config helper
  if (firstArg === "config") {
    return createLocalConfig();
  }

  // if the provided config file exists
  // then create the webdriverio config from it
  if (existsSync(userConf)) {
    return createWdioConfig(firstArg, overrides);
  }

  // if the provided config file doesn't exist
  // then run the config helper
  if (!existsSync(userConf)) {
    logger.warn("Config file '%s' not found", userConf);
    return createLocalConfig();
  }
};
