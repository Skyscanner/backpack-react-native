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

const colors = require('colors');

/**
 * Custom errors with detailed explanations
 */
const ERRORS = {
  invalidAndroidEnv: (
    cmd,
  ) => `Your local environment is not ready to publish native Android bridges.

Check CONTRIBUTING.md to learn how to configure your local environment.

For more details about this error execute:
  ${colors.yellow(`(cd ../android && ./gradlew ${cmd.join(' ')})`)}\n`,

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

  branchNotMain: `Must be on branch main`,
  workingDirNotClean: `Working dir is not pristine. Make sure the changes are intentional and commit them before procedding.`,
};

module.exports = ERRORS;
