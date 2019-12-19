import * as logger from '../../../build/logger';

export default () => {
  logger.setLevel(browser.config.logLevel);
};
