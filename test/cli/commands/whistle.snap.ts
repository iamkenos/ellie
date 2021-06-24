// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`cli/commands/whistle should allow creating sample files from the demo files: tsconfig already existing 1`] = `
Array [
  Array [
    "You seem to have already created a tsconfig.json file.
Consider adding the following:",
  ],
  Array [
    "{
  \\"compilerOptions\\": {
    \\"baseUrl\\": \\"./\\",
    \\"module\\": \\"commonjs\\",
    \\"types\\": [
      \\"node\\",
      \\"webdriverio/sync\\",
      \\"@wdio/cucumber-framework\\",
      \\"wdio-intercept-service\\",
      \\"wdio-image-comparison-service\\"
    ]
  },
}
",
  ],
  Array [
    "Sample files created successfully!
To run your tests, execute:
$ npx ellie ./samples/ellie.conf.ts",
  ],
]
`;

exports[`cli/commands/whistle should allow creating sample files from the demo files: tsconfig not yet existing 1`] = `
Array [
  Array [
    "Sample files created successfully!
To run your tests, execute:
$ npx ellie ./samples/ellie.conf.ts",
  ],
]
`;
