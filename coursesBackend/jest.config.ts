import 'jsdom-global/register'
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 20000,
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    modulePaths: [
        "<rootDir>"
      ],
      coveragePathIgnorePatterns: [
        "/node_modules/"
      ],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };