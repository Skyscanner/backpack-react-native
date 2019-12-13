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

/* eslint-disable no-console */

const { execSync } = require('child_process');

const { get } = require('lodash');
const colors = require('colors');

const pkg = require('../../package.json');

const packagesToRun = get(pkg, ['documentation', 'packages']) || [];

if (packagesToRun.length === 0) {
  process.exit(0);
}

console.log('Generating API docs...\n');

const lernaScope = packagesToRun.map(pkgName => `--scope ${pkgName}`).join(' ');

execSync(
  // TODO: --re=.ios.js will always resolve ios file when generating docs, we need a way to include both
  `npx lerna exec ${lernaScope} -- npx documentation readme index.js --section=API --re=.ios.js`,
);

console.log(colors.green('\nAll good!\n'));
