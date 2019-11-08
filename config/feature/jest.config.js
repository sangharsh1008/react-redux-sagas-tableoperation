const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const globalSetup = path.resolve(__dirname, './setup');
const globalTeardown = path.resolve(__dirname, './teardown');
const setupTestFrameworkScriptFile = path.resolve(__dirname, './framework');
const { TestSetupConfig } = require('@cainc/ca-puppeteer');

const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';

module.exports = {
  rootDir,
  setupTestFrameworkScriptFile,
  transform: {
    '^.+\\.(js|jsx)$': path.resolve(
      rootDir,
      'node_modules/@craco/craco/lib/features/test/jest-babel-transform.js',
    ),
  },
  globals: {
    __DEVELOPMENT__,
    __TEST__: true,
  },
  testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]'],
  testRegex: '(\\.)(feature)\\.jsx?$',
  modulePaths: ['<rootDir>/node_modules', '<rootDir>/src'],
  transformIgnorePatterns: ['/node_modules/(?!(@cainc/ca-common))'],
  ...TestSetupConfig,
  globalSetup, // This uses the PuppeteerSetup from ca-puppeteer.
  globalTeardown, // This uses the PuppeteerTeardown from ca-puppeteer
};
