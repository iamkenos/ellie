exports.config = {
  baseUrl: 'http://192.168.56.10:22676',
  comparableOptions: {
    ajaxRequests: { outputDir: '.comparable/ajax', skipCompare: false },
    visualRegression: { outputDir: '.comparable/image', skipCompare: false }
  },
  hooks: { afterScenario: './.hooks/afterScenario' },
  logLevel: 'error',
  maxInstances: 5,
  specs: ['./features/**/*.feature'],
  pages: ['./pages/**/*.meta.js'],
  waitforTimeout: 5000
};
