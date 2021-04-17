import { existsSync } from "fs";
import { join } from "path";
import { Arguments } from "yargs";

import logger from "../logger";
import { CONFIG_OPTIONS } from "./config";
import { endureAndSurvive } from "./commands/babygirl";
import { createLocalConfig, createWdioConfig } from "./commands/init";
import { allure } from "./commands/report";
import { generateSamples } from "./commands/whistle";
import { inspect } from "./utils";
require("ts-node/register");

export default (args: Arguments<any>): any => {
  // show help and exit if there are no arguments provided
  args.argv._.length === 0 && args.showHelp() && process.exit(0);

  // build the cli overrides object
  const overrides: any = CONFIG_OPTIONS
    .filter((i): boolean => args.argv[i.name])
    .reduce((i, j): object => ({ ...i, [j.name]: args.argv[j.name] }), {});
  logger.setLevel(overrides.logLevel);
  logger.debug("Started with args: \n%s", inspect(args.argv));
  logger.debug("Override options: \n%s", inspect(overrides));

  const firstArg = args.argv._[0];
  const localConfigFile = join(process.cwd(), firstArg);
  const extendedConfigFile = args.argv._[1] ? join(process.cwd(), args.argv._[1]) : false;

  // just because :P
  if (firstArg === "babygirl") {
    endureAndSurvive();
  }

  // if the first argument is "init"
  // then run the config helper
  if (firstArg === "init") {
    return createLocalConfig();
  }

  // if the first argument is "report"
  // then launch the allure reporter
  if (firstArg === "report") {
    return allure();
  }

  // if the first argument is "whistle"
  // then run the samples helper
  if (firstArg === "whistle") {
    return generateSamples();
  }

  // if the provided config file exists
  // then create the webdriverio config from it
  if (existsSync(localConfigFile)) {
    const config = createWdioConfig(firstArg, overrides);
    // since the primary config is 'refreshed' everytime, you can use a secondary config
    // extending from the primary that gets generated. this is for those who doesn't want
    // to be restricted by the 'simpler' configurations offered by this abstraction
    if (extendedConfigFile && existsSync(extendedConfigFile)) {
      return extendedConfigFile;
    } else {
      return config;
    }
  }

  // if the provided config file doesn't exist
  // then run the config helper
  if (!existsSync(localConfigFile)) {
    logger.warn("Config file '%s' not found", localConfigFile);
    return createLocalConfig();
  }
};
