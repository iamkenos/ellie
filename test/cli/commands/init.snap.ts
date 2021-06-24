// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`cli/commands/init should allow creating a local config file: {
  browserstackEnabled: true,
  browserstackLocal: false,
  user: 'foo',
  key: 'bar'
} 1`] = `
Array [
  Array [
    "----------------------------------
Configuration Helper
----------------------------------",
  ],
  Array [
    "Configuration file was created successfully!
To run your tests, execute:
$ npx ellie ellie.conf.ts",
  ],
]
`;

exports[`cli/commands/init should allow creating a local config file: {
  browserstackEnabled: true,
  browserstackLocal: false,
  user: 'foo',
  key: 'bar'
} 2`] = `
"import { IConfig } from \\"@iamkenos/ellie\\";

const config: Partial<IConfig> = {
  user: \\"foo\\",
  key: \\"bar\\",
  bail: 0,
  baseUrl: \\"foo-bar.com\\",
  capabilities: [
    {
      maxInstances: 5,
      browserName: \\"chrome\\",
      \\"goog:chromeOptions\\": { args: [\\"--disable-web-security\\", \\"--incognito\\"] }
    }
  ],
  comparable: {
    ajaxRequest: { outputDir: \\".comparable/ajax\\", skipCompare: false },
    httpResponse: { outputDir: \\".comparable/http\\", skipCompare: false },
    imageCompare: { outputDir: \\".comparable/image\\", skipCompare: false }
  },
  debugEnabled: false,
  locale: \\"default\\",
  logLevel: \\"info\\",
  maxInstances: 69,
  meta: [\\"./demo/test/**/*.meta.ts\\"],
  browserstackEnabled: true,
  browserstackLocal: false,
  reportOutDir: \\".reports\\",
  seleniumInstallArgs: { drivers: { chrome: { version: \\"latest\\" } } },
  specFileRetries: 0,
  stepRetries: 0,
  specs: [\\"./demo/test/**/*.feature\\"],
  steps: [\\"./demo/test/**/*.def.ts\\"],
  tags: \\"\\",
  stepTimeout: 30000,
  implicitTimeout: 0,
  pageLoadimeout: 300000,
  waitforTimeout: 5000,
  hooks: {
    before: \\"\\",
    beforeFeature: \\"\\",
    beforeScenario: \\"\\",
    beforeStep: \\"\\",
    afterStep: \\"\\",
    afterScenario: \\"\\",
    afterFeature: \\"\\",
    after: \\"\\"
  },
  custom: {}
};

export default config;
"
`;

exports[`cli/commands/init should allow creating a local config file: {
  browserstackEnabled: true,
  browserstackLocal: true,
  user: 'foo',
  key: 'bar'
} 1`] = `
Array [
  Array [
    "----------------------------------
Configuration Helper
----------------------------------",
  ],
  Array [
    "Configuration file was created successfully!
To run your tests, execute:
$ npx ellie ellie.conf.ts",
  ],
]
`;

exports[`cli/commands/init should allow creating a local config file: {
  browserstackEnabled: true,
  browserstackLocal: true,
  user: 'foo',
  key: 'bar'
} 2`] = `
"import { IConfig } from \\"@iamkenos/ellie\\";

const config: Partial<IConfig> = {
  user: \\"foo\\",
  key: \\"bar\\",
  bail: 0,
  baseUrl: \\"foo-bar.com\\",
  capabilities: [
    {
      maxInstances: 5,
      browserName: \\"chrome\\",
      \\"goog:chromeOptions\\": { args: [\\"--disable-web-security\\", \\"--incognito\\"] }
    }
  ],
  comparable: {
    ajaxRequest: { outputDir: \\".comparable/ajax\\", skipCompare: false },
    httpResponse: { outputDir: \\".comparable/http\\", skipCompare: false },
    imageCompare: { outputDir: \\".comparable/image\\", skipCompare: false }
  },
  debugEnabled: false,
  locale: \\"default\\",
  logLevel: \\"info\\",
  maxInstances: 69,
  meta: [\\"./demo/test/**/*.meta.ts\\"],
  browserstackEnabled: true,
  browserstackLocal: true,
  reportOutDir: \\".reports\\",
  seleniumInstallArgs: { drivers: { chrome: { version: \\"latest\\" } } },
  specFileRetries: 0,
  stepRetries: 0,
  specs: [\\"./demo/test/**/*.feature\\"],
  steps: [\\"./demo/test/**/*.def.ts\\"],
  tags: \\"\\",
  stepTimeout: 30000,
  implicitTimeout: 0,
  pageLoadimeout: 300000,
  waitforTimeout: 5000,
  hooks: {
    before: \\"\\",
    beforeFeature: \\"\\",
    beforeScenario: \\"\\",
    beforeStep: \\"\\",
    afterStep: \\"\\",
    afterScenario: \\"\\",
    afterFeature: \\"\\",
    after: \\"\\"
  },
  custom: {}
};

export default config;
"
`;
