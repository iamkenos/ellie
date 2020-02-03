exports.config = {
  baseUrl: 'http://localhost:8080',
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': { args: ['--disable-web-security', '--incognito', '--headless'] }
    }
  ],
  comparable: {
    ajaxRequest: { outputDir: '.comparable/ajax', skipCompare: false },
    httpResponse: { outputDir: '.comparable/http', skipCompare: false },
    imageCompare: { outputDir: '.comparable/image', skipCompare: false }
  },
  hooks: {
    before: './.hooks/before',
    afterScenario: './.hooks/afterScenario'
  },
  logLevel: 'error',
  specs: ['./features/**/*.feature'],
  steps: ['./steps/definitions/**/*.js'],
  pages: ['./pages/**/*.meta.js'],
  waitforTimeout: 8000
};
