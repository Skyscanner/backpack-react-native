/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {
  getIOSPreset,
  getAndroidPreset,
} = require('jest-expo/config/getPlatformPreset');
const { withWatchPlugins } = require('jest-expo/config/withWatchPlugins');

const getConfig = (baseConfig) => ({
  ...baseConfig,
  verbose: true,
  testMatch: null,
  snapshotResolver: '<rootDir>/jest/snapshotResolver.js',
  transformIgnorePatterns: [
    'node_modules/(?!react-native|bpk|@skyscanner|lodash-es)',
  ],
  transform: {
    ...baseConfig.transform,
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 70,
      functions: 75,
      lines: 75,
    },
  },
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
});

module.exports = withWatchPlugins({
  projects: [
    {
      ...getConfig(getIOSPreset()),
      testRegex: '.*-test(\\.ios)?\\.js$',
    },
    {
      ...getConfig(getAndroidPreset()),
      testRegex: '.*-test\\.android\\.js$',
    },
  ],
});
