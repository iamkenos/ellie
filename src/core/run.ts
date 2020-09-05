import Launcher from "@wdio/cli";

import logger from "../logger";

export default (wdioConfFile: string): void => {
  const wdio = new Launcher(wdioConfFile, {}, false);
  const config: any = wdio.configParser.getConfig();
  logger.info("Starting WebdriverIO runner...");
  wdio.run().then(
    (code: number): void => {
      logger.info("Finished");
      console.log("To launch the HTML report:");
      console.log(`$ npx allure open '${config.allureHtmlDir}'`);
      process.exit(code);
    },
    (error: any): void => {
      logger.error("Error:\n%s", error);
      process.exit(1);
    }
  );
};
