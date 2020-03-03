/*
 * Backpack for Android - Skyscanner's Design System
 *
 * Copyright 2018-2020 Skyscanner Ltd
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

const { execSync, spawn } = require('child_process');
const fs = require('fs');

const tmp = require('tmp');
const colors = require('colors');
const inquirer = require('inquirer');
const semver = require('semver');
const releaseit = require('release-it');

const root = process.cwd();
const srcRoot = `${root}/src`;
const distRoot = `${root}/dist`;
const androidAppRoot = `${root}/android`;
const androidPackageName = 'backpack-react-native';

const pkg = require('../package.json');

const major = semver.inc(pkg.version, 'major');
const minor = semver.inc(pkg.version, 'minor');
const patch = semver.inc(pkg.version, 'patch');

/**
 * List of possible versions to choose from for the new release
 */
const questions = [
  {
    type: 'list',
    name: 'version',
    message: 'What version do you want to release?',
    choices: [
      {
        major,
      },
      {
        minor,
      },
      {
        patch,
      },
    ].map(i => {
      const key = Object.keys(i)[0];
      return {
        key,
        name: `${key} (${i[key]})`,
        value: `${i[key]}`,
      };
    }),
  },
];

/**
 * Custom errors with detailed explanations
 */
const ERRORS = {
  invalidAndroidEnv: cmd => `Your local environment is not ready to publish native Android bridges.

Check CONTRIBUTING.md to learn how to configure your local environment.

For more details about this error execute:
  ${colors.yellow(`(cd android && ./gradlew ${cmd})`)}\n`,

  cantPublishAndroid: (
    cmd,
    logFileName,
  ) => `Unable to publish native code for Android bridges.
To publish it manually execute:
  ${colors.yellow(`(cd android && ./gradlew ${cmd})`)}

Check CONTRIBUTION.md to learn how to configure your local environment.

For a complete log check:
  ${colors.yellow(`${logFileName}`)}\n`,
};

/**
 * Executes a gradle command inside the android project.
 * Note that by default this command will suppress stdout and stderr,
 * you need to provide both in case you want it to be logged.
 *
 * @example
 * ```js
 * gradleExec(['tasks'], process.stdout, process.stderr)
 * ```
 *
 * @param {Array<String>} cmd the command
 * @param {WritableStream} stdout stream to redirect standard output
 * @param {WritableStream} stderr stream to redirect error output
 *
 * @returns {Promise} a promise object
 */
const gradleExec = (cmd, stdout = null, stderr = null) => {
  const gradle = spawn(`${androidAppRoot}/gradlew`, cmd, {
    cwd: androidAppRoot,
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

/**
 * Check if the local environment is ready for a release.
 *
 * @return {Promise} a promise object
 */
function checkEnv() {
  console.log('🤔  ', '> Checking enviroment');
  const cmd = `:${androidPackageName}:checkMavenCredentials`;
  return gradleExec([cmd]).catch(() => {
    throw new Error(ERRORS.invalidAndroidEnv(cmd));
  });
}

/**
 * Prepare the release package.
 * This consist manly of copying the contents of `scr` into `dist` and
 * moving the `js` folder up to the root folder.
 *
 * @return {undefined} undefined
 */
function prepareRelease() {
  console.log('🧹   ', '> Cleaning up');
  execSync(`rm -rf ${distRoot} 2> /dev/null`);
  execSync(`mkdir ${distRoot}`);

  console.log('📦  ', '> Preparing package');
  // cp -r src/* is much faster than copying file by file,
  // to filter out files you don't want to publish edit `.npmignore`.
  execSync(`cp -r ${srcRoot}/* ${distRoot}`);

  // We move js packages up to the root folder so it can be imported direclty, e.g `backpack-react-native/bpk-component-button`
  execSync(`mv ${distRoot}/js/* ${distRoot}`);
  execSync(`rm -rf ${distRoot}/js`);

  execSync('cp .npmignore package.json dist');
}

/**
 * Publishes the js and Android packages.
 *
 * @param {String} version the new version
 * @returns {Promise} a promise object.
 */
async function releaseIt(version) {
  const releaseOptions = {
    increment: version,
    npm: {
      publish: true,
      publishPath: './dist',
    },
    git: {
      requireCleanWorkingDir: true,
    },
    prompt: {
      src: {
        release: true,
      },
    },
  };

  console.log('📠  ', '> Publishing js package');
  await releaseit(releaseOptions);

  const logFileName = tmp.tmpNameSync();
  const logFile = fs.createWriteStream(logFileName);

  console.log('🤖  ', '> Publishing Android package');

  const cmd = `:${androidPackageName}:publish`;
  try {
    await gradleExec(['-PembedDeps=true', cmd], logFile, logFile);
  } catch {
    throw new Error(ERRORS.cantPublishAndroid(cmd, logFileName));
  }
}

async function release() {
  try {
    const { version } = await inquirer.prompt(questions);

    await checkEnv();
    prepareRelease();
    await releaseIt(version);

    console.log(
      '🎉  ',
      colors.green("All done! Don't forget to update and commit CHANGELOG.md"),
    );
  } catch (exc) {
    console.log('😭  ', colors.red('Something went wrong'));
    console.error(colors.red(exc.stack));
    process.exit(1);
  }
}

release();
