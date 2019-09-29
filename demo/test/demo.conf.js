exports.config = {
  baseUrl: 'http://192.168.56.10:22676',
  logLevel: 'error',
  maxInstances: 10,
  specs: ['./features/**/*.feature'],
  pages: ['./pages/**/*.meta.js'],
  waitforTimeout: 10000
};
