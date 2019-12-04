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

const fs = require('fs');
const { execSync } = require('child_process');

const errors = [];

const findReplace = (file, findReplaces) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    let result = data;
    findReplaces.forEach(fr => {
      const splitFile = result.split(fr.find);
      if (splitFile.length === 1) {
        return null;
      }
      result = splitFile.join(fr.replace);
      return null;
    });

    fs.writeFile(file, result, 'utf8', err2 => {
      if (err2) return console.log(err2);
      return null;
    });
    return null;
  });
};

const fixDependencyErrors = packageFiles => {
  const findReplaces = [];
  errors.forEach(error => {
    if (error.type === 'InvalidVersion') {
      findReplaces.push({
        find: new RegExp(
          `\\"${error.dependency}\\"\\:[ ]+\\"\\^[0-9]+\\.[0-9]+\\.[0-9]+\\"`,
          'g',
        ),
        replace: `"${error.dependency}": "${error.correctDependencyVersion}"`,
      });
      // eslint-disable-next-line max-len
      console.log(
        `${error.dependency} dependency upgraded from ${
          error.dependencyVersion
        } to ${error.correctDependencyVersion}`,
      );
    }
  });

  packageFiles.forEach(file => {
    findReplace(file, findReplaces);
  });
};

const checkBpkDependencyList = (
  dependencies,
  correctVersions,
  packageName,
  validations = [],
  whiteList = [],
) => {
  Object.keys(dependencies).forEach(dependency => {
    const isWhiteListed = whiteList.indexOf(dependency) > -1;
    if (!isWhiteListed) {
      validations.forEach(validation =>
        validation(dependencies, dependency, correctVersions, packageName),
      );
    }
  });
};

const validateDependencyVersion = (
  dependencies,
  dependency,
  correctVersions,
  packageName,
) => {
  if (Object.keys(correctVersions).indexOf(dependency) !== -1) {
    const dependencyVersion = dependencies[dependency];
    const correctDependencyVersion = `^${correctVersions[dependency]}`;
    if (dependencyVersion !== correctDependencyVersion) {
      errors.push({
        type: 'InvalidVersion',
        packageName,
        dependency,
        dependencyVersion,
        correctDependencyVersion,
      });
    }
  }
};

const validateBpkAppearance = (
  dependencies,
  dependency,
  correctVersions,
  packageName,
) => {
  if (dependency === 'react-native-bpk-appearance') {
    errors.push({
      type: 'BpkAppearanceNotPeer',
      packageName,
    });
  }
};

const checkBpkDependencies = (packageFile, correctVersions) => {
  const pfContent = JSON.parse(fs.readFileSync(packageFile));
  const {
    name: packageName,
    peerDependencies,
    dependencies,
    devDependencies,
  } = pfContent;

  if (peerDependencies !== undefined) {
    checkBpkDependencyList(
      peerDependencies,
      correctVersions,
      packageName,
      [validateDependencyVersion],
      ['react-native-bpk-appearance'],
    );
  }
  if (dependencies !== undefined) {
    checkBpkDependencyList(dependencies, correctVersions, packageName, [
      validateDependencyVersion,
      validateBpkAppearance,
    ]);
  }
  if (devDependencies !== undefined) {
    checkBpkDependencyList(devDependencies, correctVersions, packageName, [
      validateDependencyVersion,
      validateBpkAppearance,
    ]);
  }
};

const getLatestProductionVersion = version => {
  if (version.includes('-alpha')) {
    return version.split('-alpha')[0];
  }
  if (version.includes('-beta')) {
    return version.split('-beta')[0];
  }
  return version;
};

const getBpkPackageVersions = packageFiles =>
  packageFiles.reduce((acc, pkg) => {
    if (pkg === '' || !pkg.includes('bpk-')) {
      return acc;
    }
    const pfContent = JSON.parse(fs.readFileSync(pkg));
    const latestVersion = getLatestProductionVersion(pfContent.version);
    acc[pfContent.name] = latestVersion;
    return acc;
  }, {});

console.log('Checking Backpack cross dependencies...');
console.log('');

let packageFiles = execSync(
  'find packages -name package.json | grep -v node_modules',
)
  .toString()
  .split('\n');

packageFiles = packageFiles.filter(s => s !== '');
const bpkPackageVersions = getBpkPackageVersions(packageFiles);

packageFiles.forEach(pf => {
  checkBpkDependencies(pf, bpkPackageVersions);
});

if (errors.length === 0) {
  console.log('All good.  👍');
} else if (process.argv.includes('--fix') || process.argv.includes('-f')) {
  fixDependencyErrors(packageFiles);
  console.log('\nAll fixed.  👍\n\n');
  console.log(
    'Now remember to run\n\t _____________\n\t|             |\n\t| npm install |\n\t|_____________|',
  );
} else {
  console.log('Some Backpack cross dependencies are outdated  😱');
  console.log('');
  errors.forEach(error => {
    if (error.type === 'InvalidVersion') {
      // eslint-disable-next-line max-len
      console.log(
        `${error.packageName} depends on ${error.dependency} ${
          error.dependencyVersion
        }, it should be ${error.correctDependencyVersion}`,
      );
    } else if (error.type === 'BpkAppearanceNotPeer') {
      // eslint-disable-next-line max-len
      console.log(
        `${
          error.packageName
        } depends on react-native-bpk-appearance. It should be a peer dependency`,
      );
    } else {
      console.log(error);
    }
  });
  console.log('');
  process.exit(1);
}
console.log('');
