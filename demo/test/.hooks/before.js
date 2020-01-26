import { logger } from '../../../build';

export default () => {
  logger.setLevel(browser.config.logLevel);
};
