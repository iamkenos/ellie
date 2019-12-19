import * as logger from 'ellie/logger';

export default () => {
  logger.setLevel(browser.config.logLevel);
};
