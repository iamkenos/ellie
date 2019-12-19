exports.config = {
  baseUrl: 'http://localhost:8080',
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': { args: ['--disable-web-security', '--incognito', '--headless'] }
    }
  ],
  comparableOptions: {
    ajaxRequests: { outputDir: '.comparable/ajax', skipCompare: false },
    httpRequests: { outputDir: '.comparable/http', skipCompare: false },
    visualRegression: { outputDir: '.comparable/image', skipCompare: false }
  },
  hooks: {
    before: './.hooks/before',
    afterScenario: './.hooks/afterScenario'
  },
  logLevel: 'error',
  maxInstances: 10,
  specs: ['./features/**/*.feature'],
  steps: ['./steps/definitions/**/*.js'],
  pages: ['./pages/**/*.meta.js'],
  waitforTimeout: 8000
};
