import { logger } from "@iamkenos/ellie";

export default (): void => {
  logger.setLevel(browser.config.logLevel);
};
