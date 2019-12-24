/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

const defaultPlatform = process.env.PLATFORM || 'ios';

// We run platform agnostic "*-test.js" only when running ios tests
const testRegex =
  defaultPlatform === 'ios'
    ? `.*-test(\\.${defaultPlatform})?\\.js$`
    : `.*-test\\.${defaultPlatform}\\.js$`;

module.exports = {
  preset: 'react-native',
  haste: {
    defaultPlatform,
    platforms: ['android', 'ios', 'native'],
  },
  setupFiles: ['./node_modules/react-native/jest/setup.js'],
  verbose: true,
  testRegex,
  testMatch: null,
  transformIgnorePatterns: [
    'node_modules/(?!react-native|bpk|@skyscanner|lodash-es)',
  ],
  transform: {
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
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
};
