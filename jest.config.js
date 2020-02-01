module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.ts'],
  coverageDirectory: './test/.coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  roots: ['<rootDir>/test'],
  setupFilesAfterEnv: ['./test/setup.ts'],
  transform: { '^.+\\.ts?$': 'ts-jest' }
};
