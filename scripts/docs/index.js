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

/* eslint-disable no-console */
const { execSync } = require('child_process');
const fs = require('fs');
const util = require('util');

const glob = require('glob');
const documentation = require('documentation');
const { get } = require('lodash');
const colors = require('colors');

const pkg = require('../../package.json');

const docTemplate = require('./template-reference');
const reactDocGen = require('./react-docgen');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const globP = util.promisify(glob);

const packagesToRun = get(pkg, ['documentation', 'packages']) || [];

if (packagesToRun.length === 0) {
  process.exit(0);
}

console.log('[documentation]', 'Generating docs...');

const root = process.cwd();
const destRoot = `${root}/docs`;

execSync(`mkdir -p ${destRoot} &2>/dev/null`);

const getComponents = pkgDef => pkgDef.components || [];

const getPkgName = pkgDef =>
  typeof pkgDef === 'string' ? pkgDef : pkgDef.name;

Promise.all(
  packagesToRun.map(async pkgDef => {
    const pkgName = getPkgName(pkgDef);
    const components = getComponents(pkgDef);
    const pkgRoot = `${root}/lib/${pkgName}`;

    // Generate API docs (JSDocs)
    const apiDocsPromise = globP(
      // All files except components and common-types, as those are documented in the Props section
      `${pkgRoot}/**/*.js`,
      {
        ignore: [
          ...components.map(component => `${pkgRoot}/${component}`),
          `${pkgRoot}/src/common-types.js`,
        ],
      },
    )
      .then(apiEntryPoints =>
        documentation.build(apiEntryPoints, {
          requireExtension: '.ios.js', // resolve .ios files when a file with platform extension is used
          shallow: true,
        }),
      )
      .then(content => {
        if (content.length === 0) {
          return null;
        }
        return documentation.formats.md(content, { markdownToc: true });
      });

    // Generate prop docs
    const propsDocsPromise = Promise.all(
      components.map(component => {
        const fileName = `${root}/lib/${pkgName}/${component}`;
        return readFile(fileName)
          .then(buffer => buffer.toString('utf8'))
          .then(data => reactDocGen(data, fileName));
      }),
    );

    return Promise.all([apiDocsPromise, propsDocsPromise])
      .then(([api, props]) => docTemplate({ props, api }))
      .then(docs => writeFile(`${destRoot}/${pkgName}.md`, docs));
  }),
)
  .then(() => {
    console.log('[documentation]', colors.green('All done!'));
  })
  .catch(e => {
    console.error(colors.red('[documentation] Something wrong.\n\n', e));
  });
