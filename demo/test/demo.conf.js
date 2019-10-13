exports.config = {
  baseUrl: 'http://192.168.56.10:22676',
  comparableOptions: {
    ajaxRequests: { outputDir: '.comparable/ajax', skipCompare: false },
    httpRequests: { outputDir: '.comparable/http', skipCompare: false },
    visualRegression: { outputDir: '.comparable/image', skipCompare: false }
  },
  hooks: { afterScenario: './.hooks/afterScenario' },
  logLevel: 'error',
  maxInstances: 5,
  specs: ['./features/**/*.feature'],
  steps: ['./steps/definitions/**/*.js'],
  pages: ['./pages/**/*.meta.js'],
  waitforTimeout: 8000
};
