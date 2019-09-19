import * as yargs from "yargs";

import { OVERRIDE_OPTS, USAGE } from "./config";
import runCore from "../core/run";
import runCLI from "./run";

export async function start(): Promise<any> {
  try {
    let args = yargs.usage(USAGE.trim()).wrap(120);
    for (const opt of OVERRIDE_OPTS) {
      args = args.option(opt.name, opt as any);
    }

    const config = await runCLI(args);
    runCore(config);
  } catch (e) {
    process.exit(1);
  }
}
