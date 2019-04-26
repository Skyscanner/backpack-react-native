/*
 *
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
 *
 */

/* eslint-disable no-console */

/**
 * Helper script to publish native Android bridges when the
 * RN package is published.
 *
 * This scripts works in two phases:
 *
 * 1. Prepare
 * Should be called before the release to validade the environment and store
 * the list of native packages to be published
 *
 * 2. Publish
 * Should be called after the RN packages have been released to publish the native
 * bridges
 *
 * Example:
 *
 *    "node native-bridges.js prepare && npm run publish && node native-bridges.js publish"
 */

const { promisify } = require('util');
const fs = require('fs');
const { spawn } = require('child_process');

const { red, yellow, green } = require('colors');
const lernaChanged = require('@lerna/changed');
const tmp = require('tmp');

const access = promisify(fs.access);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const RELEASE_FILE = '.native-release-info.json';
const ERRORS = {
  invalidEnv: (
    packages,
    cmd,
  ) => `Your local envirnment is not ready to publish native Android bridges.
As part of this release the following bridges need to be published:

${JSON.stringify(packages.map(p => p.name))}

Check CONTRIBUTION.md to learn how to configure your local environment.

For more details about this error execute:
  ${yellow(`(cd android && ./gradlew ${cmd})`)}\n`,

  cantPublish: (
    pkgName,
    cmd,
    logFileName,
  ) => `Unable to publish native bridge for ${pkgName}.
To publish it manually execute:
  ${yellow(`(cd android && ./gradlew ${cmd})`)}

Check CONTRIBUTION.md to learn how to configure your local environment.

For a complete log check:
  ${yellow(`${logFileName}`)}\n`,
};

const disableOutput = () => {
  const origLog = console.log;
  console.log = () => {};
  return () => {
    console.log = origLog;
  };
};

const filterPromise = (array, callback) =>
  new Promise((resolve, reject) => {
    const results = [];
    let resolved = 0;
    const toResolve = array.length;

    const resolveItem = () => {
      resolved += 1;
      if (resolved === toResolve) {
        resolve(results);
      }
    };

    array.forEach((item, idx) => {
      callback(item)
        .then(include => {
          if (include) results.push(item);
          resolveItem(item, idx);
        })
        .catch(reject);
    });
  });

const hasAndroidBridge = ({ location }) =>
  access(`${location}/src/android/build.gradle`)
    .then(() => true)
    .catch(() => false);

const getStaleAndroidBridges = () => {
  const cfg = {
    cwd: process.cwd(),
    _: [],
    json: true,
    loglevel: 'error',
  };

  const restoreLog = disableOutput();
  const command = lernaChanged(cfg);

  return command
    .then(() => JSON.parse(command.result.text))
    .then(pkgs => {
      restoreLog();
      return filterPromise(pkgs, pkg =>
        Promise.resolve(!pkg.private && hasAndroidBridge(pkg)),
      );
    });
};

const gradleExec = (cmd, stdout = null, stderr = null) => {
  const gradleScript = `${process.cwd()}/android/gradlew`;
  const gradle = spawn(gradleScript, cmd, {
    cwd: `${process.cwd()}/android`,
  });

  if (stdout) gradle.stdout.pipe(stdout);
  if (stderr) gradle.stderr.pipe(stderr);

  return new Promise((resolve, reject) => {
    gradle.on('close', code => {
      if (code !== 0) {
        reject(code);
      } else {
        resolve();
      }
    });
  });
};

const checkEnv = packages => {
  const { name } = packages[0]; // We check only for the first one as it should be the same for all
  const cmd = `:${name}:checkMavenCredentials`;
  return gradleExec([`:${name}:checkMavenCredentials`]).catch(() => {
    throw new Error(ERRORS.invalidEnv(packages, cmd));
  });
};

const createReleaseInfo = packages => {
  const file = fs.createWriteStream(RELEASE_FILE);
  file.write(JSON.stringify(packages));
  file.end();
};

const readReleaseInfo = () =>
  readFile(RELEASE_FILE)
    .then(json => {
      if (!json || `${json}` === '') return [];
      return JSON.parse(json);
    })
    .catch(e => {
      throw new Error(
        'Release info file not found. Did you call `native-bridges.js prepare` before the release?',
        e,
      );
    });

const deleteReleaseInfo = () =>
  access(RELEASE_FILE)
    .then(() => unlink(RELEASE_FILE))
    .catch(() => {}); // We don't care if the file doesn't exist

const publishBridges = packages =>
  Promise.all(
    packages.map(({ name }) => {
      console.log(`Publishing native Android bridge for ${yellow(name)}`);

      const logFileName = tmp.tmpNameSync();
      const logFile = fs.createWriteStream(logFileName);

      const cmd = `:${name}:publish`;
      return gradleExec([cmd], logFile, logFile).catch(() => {
        throw new Error(ERRORS.cantPublish(name, cmd, logFileName));
      });
    }),
  );

(async () => {
  const action = process.argv[2];

  try {
    if (action === 'prepare') {
      const staleBridges = await getStaleAndroidBridges();
      await createReleaseInfo(staleBridges);

      if (staleBridges.length > 0) {
        await checkEnv(staleBridges);
      }
    } else if (action === 'publish') {
      const staleBridges = await readReleaseInfo();
      await publishBridges(staleBridges);
      await deleteReleaseInfo();
    }

    console.log(green('All good! 👍\n'));
  } catch (e) {
    console.error(red(e));
    process.exit(1);
  }
})();
