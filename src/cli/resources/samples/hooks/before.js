import logger from 'ellie';

export default () => {
  logger.setLevel(browser.config.logLevel);
};
