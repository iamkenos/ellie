import { mkdirsSync, outputFileSync } from "fs-extra";
import { join } from "path";
import Launcher from "@wdio/cli";

import logger from "../logger";
import { CONFIG_WDIO_OUT_FILE, LOCAL_DATA_DIR } from "../cli/config";

export default (wdioConfFile: string): void => {
  const wdio = new Launcher(wdioConfFile, {}, false);
  const config: any = wdio.configParser.getConfig();
  logger.info("Starting WebdriverIO runner...");
  wdio.run().then(
    (code: number): void => {
      logger.info("Finished");
      mkdirsSync(LOCAL_DATA_DIR);
      outputFileSync(join(LOCAL_DATA_DIR, CONFIG_WDIO_OUT_FILE), JSON.stringify(config, null, 2));
      console.log("To launch the HTML report:");
      console.log("$ npx ellie report");
      process.exit(code);
    },
    (error: any): void => {
      logger.error("Error:\n%s", error);
      process.exit(1);
    }
  );
};
