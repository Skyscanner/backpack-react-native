/*
 * Backpack - Skyscanner's Design System
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

/**
 * Release script for backpack-react-native.
 * Use the `--dry-run` flag to test it.
 */

const { spawn } = require('child_process');
const fs = require('fs');

const tmp = require('tmp');
const colors = require('colors');
const inquirer = require('inquirer');
const semver = require('semver');
const releaseit = require('release-it');

const root = process.cwd();
const scriptsRoot = `${root}/scripts`;
const androidAppRoot = `${root}/android`;
const androidPackageName = 'backpack-react-native';
const gradle = `${androidAppRoot}/gradlew`;

const pkg = require('../package.json');

const major = semver.inc(pkg.version, 'major');
const minor = semver.inc(pkg.version, 'minor');
const patch = semver.inc(pkg.version, 'patch');

const dryRun = process.argv[2] === '--dry-run';

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

  branchNotUpToDate: `Your local branch is not up to date with remote.

Try running git fetch && git pull first.
`,
};

/**
 * Executes a shell command.
 * Note that by default this command will suppress stdout and stderr,
 * you need to provide both in case you want it to be logged. see [options]
 *
 * @example
 * ```js
 * shellExec('ls', ['tasks']);
 * ```
 *
 * @param {String} cmd the command
 * @param {Array<String>} args the command arguments
 * @param {Object} [options={ cwd: root, stdout: null, sderr: null }] process options
 *
 * @returns {Promise} a promise object that will succeed when the exit code is 0 and fail otherwise.
 */
const shellExec = (cmd, args = [], options = {}) => {
  const safeOptions = { cwd: root, stdout: null, stderr: null, ...options };
  const { cwd, stdout, stderr } = safeOptions;
  const shell = spawn(cmd, args, { cwd });

  if (stdout) shell.stdout.pipe(stdout);
  if (stderr) shell.stderr.pipe(stderr);

  return new Promise((resolve, reject) => {
    shell.on('close', code => {
      if (code !== 0) {
        reject(code);
      } else {
        resolve(code);
      }
    });
  });
};

const isBranchUpTodate = () =>
  shellExec(`${scriptsRoot}/check-branch-up-to-date.sh`).catch(() => {
    throw new Error(ERRORS.branchNotUpToDate);
  });

const isGradleAuthenticated = () => {
  const checkMavenCredentials = `:${androidPackageName}:checkMavenCredentials`;
  return shellExec(gradle, [checkMavenCredentials], {
    cwd: androidAppRoot,
  }).catch(() => {
    throw new Error(ERRORS.invalidAndroidEnv(checkMavenCredentials));
  });
};

/**
 * Check if the local environment is ready for a release.
 *
 * @return {Promise} a promise object
 */
async function checkEnv() {
  console.log('🤔  ', '> Checking enviroment');
  await isBranchUpTodate();
  await isGradleAuthenticated();
}

/**
 * Publishes the js and Android packages.
 *
 * @param {String} version the new version
 * @returns {Promise} a promise object.
 */
async function releaseIt(version) {
  const releaseOptions = {
    'dry-run': dryRun,
    // Don't ask before commiting and pushing
    'non-interactive': true,
    increment: version,
    npm: {
      publish: true,
      publishPath: './dist',
    },
    git: {
      requireCleanWorkingDir: true,
      requireBranch: 'master',
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

  const cmd = `:${androidPackageName}:publish${dryRun ? 'ToMavenLocal' : ''}`;
  try {
    await shellExec(gradle, ['-PembedDeps=true', cmd], {
      cwd: androidAppRoot,
      stdout: logFile,
      stderr: logFile,
    });
  } catch {
    throw new Error(ERRORS.cantPublishAndroid(cmd, logFileName));
  }
}

async function release() {
  try {
    const { version } = await inquirer.prompt(questions);

    await checkEnv();
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
