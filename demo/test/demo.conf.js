exports.config = {
  baseUrl: 'http://192.168.56.10:22676',
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': { args: ['--disable-web-security', '--disable-gpu', '--headless'] }
    }
  ],
  logLevel: 'error',
  maxInstances: 10,
  reportOutDir: '.reports',
  specFileRetries: 0,
  specs: ['./features/**/*.feature'],
  pages: ['./pages/**/*.meta.js'],
  steps: ['./steps/**/*.js'],
  stepTimeout: 15000,
  waitforTimeout: 2000,
  hooks: {
    // beforeStep: './hooks/beforeStep'
  }
};
