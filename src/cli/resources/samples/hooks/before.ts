import { logger } from "ellie";

export default (): void => {
  logger.setLevel(browser.config.logLevel);
};
