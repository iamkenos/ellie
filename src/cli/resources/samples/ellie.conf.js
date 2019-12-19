exports.config = {
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': { args: ['--disable-web-security', '--incognito'] }
    }
  ],
  logLevel: 'error',
  maxInstances: 5,
  pages: ['./pages/**/*.meta.js'],
  specs: ['./features/**/*.feature'],
  steps: ['./steps/definitions/**/*.js'],
  hooks: {
    before: './.hooks/before',
    afterScenario: './.hooks/afterScenario'
  }
};
