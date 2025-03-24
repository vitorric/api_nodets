import type { Config } from 'jest';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env.test',
});

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',

  detectOpenHandles: true,

  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFiles: ['./jest.setup.ts'],
  testRegex: '.*\\.(spec|test)\\.ts$',

  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@tests/(.*)$': '<rootDir>/src/__tests__/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  collectCoverage: true,
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  coverageReporters: [
    'json-summary',
    'clover',
    'json',
    'lcov',
    ['text', { skipFull: true }],
  ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  clearMocks: true,
};

export default config;
