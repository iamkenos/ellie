exports.config = {
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': { args: ['--disable-web-security', '--incognito'] }
    }
  ],
  logLevel: 'error',
  pages: ['./pages/**/*.meta.js'],
  specs: ['./features/**/*.feature'],
  steps: ['./steps/definitions/**/*.js'],
  hooks: {
    before: './hooks/before',
    afterScenario: './hooks/afterScenario'
  }
};
