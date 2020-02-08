import { logger } from "../../../build";

export default (): void => {
  logger.setLevel(browser.config.logLevel);
};
