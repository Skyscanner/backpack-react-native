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

/* eslint-disable no-console */

/**
 * Release script for backpack-react-native.
 * Use the `--dry-run` flag to test it.
 */

const fs = require('fs');

const tmp = require('tmp');
const colors = require('colors');
const inquirer = require('inquirer');
const semver = require('semver');

const pkg = require('../../../lib/package.json');

const Shell = require('./shell');
const ERRORS = require('./errors');

const root = process.cwd();

const scriptsRoot = `${root}/scripts`;
const androidAppRoot = `${root}/android`;
const distRoot = `${root}/dist`;
const libRoot = `${root}/lib`;
const androidPackageName = 'backpack-react-native';
const gradle = `${androidAppRoot}/gradlew`;

const major = semver.inc(pkg.version, 'major');
const minor = semver.inc(pkg.version, 'minor');
const patch = semver.inc(pkg.version, 'patch');

const dryRun = process.argv[2] === '--dry-run';

if (dryRun) {
  console.log(colors.yellow('\n"dry-run" mode is on\n'));
}

const shell = Shell(root);

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
    ].map((i) => {
      const key = Object.keys(i)[0];
      return {
        key,
        name: `${key} (${i[key]})`,
        value: `${i[key]}`,
      };
    }),
  },
];

const isBranchUpTodate = () =>
  shell.spawn(`${scriptsRoot}/check-branch-up-to-date.sh`).catch(() => {
    throw new Error(ERRORS.branchNotUpToDate);
  });

const isGradleAuthenticated = () => {
  const checkMavenCredentials = [
    '-PinternalBuild=true',
    `:${androidPackageName}:checkMavenCredentials`,
  ];
  return shell
    .spawn(gradle, checkMavenCredentials, {
      cwd: androidAppRoot,
    })
    .catch(() => {
      throw new Error(ERRORS.invalidAndroidEnv(checkMavenCredentials));
    });
};

const isMainBranch = () => {
  if (
    shell.execSync('git rev-parse --abbrev-ref HEAD').toString().trim() !==
    'main'
  ) {
    throw new Error(ERRORS.branchNotMain);
  }
};

const isCleanWorkingDirClean = () => {
  try {
    shell.execSync('git diff-index --quiet HEAD --');
  } catch {
    throw new Error(ERRORS.workingDirNotClean);
  }
};

/**
 * Check if the local environment is ready for a release.
 *
 * @return {Promise} a promise object
 */
async function checkEnv() {
  console.log('🤔  ', '> Checking environment');
  await isBranchUpTodate();
  await isGradleAuthenticated();
  isMainBranch();
  isCleanWorkingDirClean();
}

/**
 * Publishes the js and Android packages.
 *
 * @param {String} version the new version
 * @returns {Promise} a promise object.
 */
async function releaseIt(version) {
  console.log('📠  ', '> Publishing js package');
  // We don't let npm tag and commit the version because it doesn't work unless it's run in the root folder
  shell.execSync(`npm version ${version} --no-git-tag-version`, {
    cwd: libRoot,
    dryRun,
  });

  // Linking the package into the dist folder doesn't work, so instead we'll copy it in
  shell.execSync(`cp package.json ${distRoot}/`, {
    cwd: libRoot,
    dryRun,
  });

  // Tag and commit the version
  shell.execSync('git add .', { dryRun });
  shell.execSync(`git commit -m"Release ${version}" --no-verify`, { dryRun });
  shell.execSync(`git tag v${version}`, { dryRun });
  shell.execSync('git push origin main', { dryRun });
  shell.execSync(`git push origin v${version}`, { dryRun });

  shell.execSync(`npm publish . --tag latest ${dryRun ? '--dry-run' : ''}`, {
    cwd: distRoot,
  });

  const logFileName = tmp.tmpNameSync();
  const logFile = fs.createWriteStream(logFileName);

  console.log('🤖  ', '> Publishing Android package');

  const cmd = `:${androidPackageName}:publish${dryRun ? 'ToMavenLocal' : ''}`;
  try {
    await shell.spawn(gradle, ['-PinternalBuild=true', cmd], {
      cwd: androidAppRoot,
      stdout: logFile,
      stderr: logFile,
    });
  } catch {
    throw new Error(ERRORS.cantPublishAndroid(cmd, logFileName));
  }
}

const printChangelog = () => {
  console.log(colors.white('\nChangelog:'));
  const changes = shell
    .execSync(
      'git --no-pager log --pretty=format:"* %s (%h)" $(git describe --tags --abbrev=0)...HEAD',
    )
    .toString();

  if (changes === '') {
    console.log(colors.yellow('  no changes'));
  } else {
    console.log(changes);
  }
  console.log();
};

async function release() {
  try {
    await checkEnv();
    printChangelog();

    const { version } = await inquirer.prompt(questions);

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
