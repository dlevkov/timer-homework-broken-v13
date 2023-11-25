import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default jestConfig;
