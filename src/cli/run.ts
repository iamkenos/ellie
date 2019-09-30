import { existsSync } from "fs";
import { join } from "path";
import { Arguments } from "yargs";

import * as logger from "../logger";
import { OVERRIDE_OPTS, TLOU_QUOTES } from "./config";
import { createLocalConfig, createWdioConfig, generateSamples } from "./setup";
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

  // just because :P
  if (firstArg === "babygirl") {
    const toons = Object.keys(TLOU_QUOTES);
    const toon = toons[Math.floor(Math.random() * toons.length)];
    const quotes = TLOU_QUOTES[toon];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(`\n${toon}: ${quote}\n`);
    process.exit(0);
  }

  // if the first argument is "init"
  // then run the config helper
  if (firstArg === "init") {
    return createLocalConfig();
  }

  // if the first argument is "getstarted"
  // then run the samples helper
  if (firstArg === "getstarted") {
    return generateSamples();
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
