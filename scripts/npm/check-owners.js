/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

/* @flow */

/* eslint-disable no-console */

const https = require('https');

const pkg = require('../../lib/package.json');
const meta = require('../../meta.json');

let failures = false;

const owners = meta.maintainers.map(maintainer => maintainer.npm).sort();

const getPackageMaintainers = pkgName =>
  new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${pkgName}/`, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', d => {
        body += d;
      });
      res.on('error', reject);
      res.on('end', () => {
        const pkgData = JSON.parse(body);

        if (pkgData.maintainers) {
          resolve({
            name: pkgName,
            maintainers: pkgData.maintainers.map(m => m.name),
            new: false,
          });
        } else {
          resolve({
            name: pkgName,
            new: true,
          });
        }
      });
    });
  });

const verifyMaintainers = data => {
  if (data.new) {
    console.log(
      `${data.name} ⁇\n  Package does not seem to be in NPM registry (yet)`,
    );
    return;
  }

  // Filter mattface as panel and touchable-overlay still have Matt as maintainer
  // and it fails to remove
  const sortedMaintainers = data.maintainers
    .filter(u => u !== 'mattface')
    .sort();

  if (sortedMaintainers.join('') === owners.join('')) {
    console.log(`${data.name} ✔︎`);
  } else {
    console.log(
      `${data.name}\n  Expected\n    ${owners.join(
        ', ',
      )}\n  but got\n    ${sortedMaintainers.join(', ')}`,
    );
    process.exitCode = 1;
    failures = true;
  }
};

console.log(`Maintainers are:\n  ${owners.join('\n  ')}\n`);

getPackageMaintainers(pkg.name)
  .then(verifyMaintainers)
  .then(() => {
    if (failures) {
      console.log(
        '\nPlease fix your maintainer list before publishing. Link: https://www.npmjs.com/settings/skyscanner/teams/team/backpack/access',
      );
      process.exit(1);
    } else {
      console.log('\nAll good 👍');
      process.exit(0);
    }
  })
  .catch(error => {
    console.error(
      'An unknown error occured. Please check your network connection and try again.',
    );
    if (error) {
      console.error(error);
    }
    process.exit(1);
  });
