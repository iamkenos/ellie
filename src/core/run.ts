import Launcher from "@wdio/cli";

import * as logger from "../logger";

export default (wdioConfFile: string): void => {
  const wdio = new Launcher(wdioConfFile, {}, false);
  logger.info("WebDriverIO launcher initialized");
  wdio.run().then(
    (code: number): void => {
      logger.info("Finished");
      process.exit(code);
    },
    (error: any): void => {
      logger.error("Error:\n%s", error);
      process.exit(1);
    }
  );
};
