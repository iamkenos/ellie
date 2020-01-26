import yargs from "yargs";

import runCore from "../core/run";
import runCLI from "./run";
import { CONFIG_OPTIONS, USAGE } from "./config";

export async function start(): Promise<any> {
  try {
    let args = yargs.usage(USAGE.trim()).wrap(120);
    for (const opt of CONFIG_OPTIONS) {
      args = args.option(opt.name, opt as yargs.Options);
    }

    const config = await runCLI(args);
    runCore(config);
  } catch (e) {
    process.exit(1);
  }
}
