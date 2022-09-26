# Contributing to Backpack

You want to help us enable Skyscanner to create beautiful, coherent products at scale? That's awesome! :heart:

## Table of contents

* [Prerequisites](#prerequisites)
* [Getting started](#getting-started)
* [Adding a new component](#adding-a-new-component)
* [How to](#how-to)

## Prerequisites

### Licence

By contributing your code, you agree to license your contribution under the terms of the [APLv2](./LICENSE).

All files are released with the Apache 2.0 licence.

If you are adding a new file it should have a header comment containing licence information:

<details>
<summary>Show/hide licence header</summary>

```
Backpack - Skyscanner's Design System

Copyright 2016-2021 Skyscanner Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

</details>

## How we review Backpack contributions

Please see the [code review guidelines](https://github.com/Skyscanner/backpack/blob/main/CODE_REVIEW_GUIDELINES.md).

### Decisions

Conventions and squad decisions are kept in the [decisions folder](/decisions). We recommend familiarising yourself with these.

### Installing Node

Backpack is developed using Node. We use specific versions of Node and NPM, enforced using a pre-install hook that calls out to [ensure-node-env](https://github.com/Skyscanner/ensure-node-env).

If you use [nvm](https://github.com/creationix/nvm) or [nave](https://github.com/isaacs/nave) to manage your Node environment, Backpack has built-in support for these. Just run `nvm use` or `nave auto` to install the correct Node version.

To see the versions of Node and NPM required, check `.naverc` or `.nvmrc`.

#### iOS

Install XCode from the [App Store](https://itunes.apple.com/gb/app/xcode/id497799835?mt=12). Once installed, open it and accept the licence agreement. You're free to close it after that.

We use [Cocoapods](https://cocoapods.org) to install some iOS-specific dependencies. Cocoapods uses Ruby, so you'll need to install that too. [rbenv](https://github.com/rbenv/rbenv) and [rvm](https://rvm.io/) are both good ways to get Ruby. The version of Ruby you'll need is specified in `ios/.ruby-version`.

Once you have Ruby, install [Bundler](https://bundler.io) with `gem install bundler`.

#### Android

Get [Homebrew](https://brew.sh/) if you don't already have it.

Install Watchman with `brew install watchman`, then install Java 11 with `brew install adoptopenjdk/openjdk/adoptopenjdk11 --cask`.

Get Android Studio with `brew install android-studio --cask`. Once installed, open it and a setup wizard will guide you through installing lots of extra things like the Android SDK (choose *Standard* installation). You may be asked for your password during this. You're free to close Android Studio once this is done.

You may also have to install "Android SDK Command Line Tools" from the SDK tools screen in Android Studio.

Add an environment variable pointing to the SDK location to your `~/.bash_profile`
(or similarly used file):

```
echo "export ANDROID_HOME=\"$HOME/Library/Android/sdk\"" >> ~/.bash_profile
echo "export ANDROID_SDK_ROOT=\"$HOME/Library/Android/sdk\"" >> ~/.bash_profile
source ~/.bash_profile
```

Accept the SDK licences:

```
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses
```

Download Android system images for the minimum and targeted API levels. Note that you may get a warning about a `.cfg` file not being present. You're safe to ignore this.

```
# x86
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager "system-images;android-29;google_apis;x86"
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager "system-images;android-24;google_apis;x86"

# ARM
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager "system-images;android-29;google_apis;arm64-v8a"
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager "system-images;android-24;google_apis;arm64-v8a"
```

Create Android Virtual Devices (AVDs):

```
# x86
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/avdmanager create avd --name "bpk-avd" --package "system-images;android-29;google_apis;x86" --device "pixel" && cp android/bpk-avd.ini ~/.android/avd/bpk-avd.avd/config.ini
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/avdmanager create avd --name "bpk-avd-min" --package "system-images;android-24;google_apis;x86" --device "Nexus 5"

# ARM
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/avdmanager create avd --name "bpk-avd" --package "system-images;android-29;google_apis;arm64-v8a" --device "pixel" && cp android/bpk-avd.ini ~/.android/avd/bpk-avd.avd/config.ini
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/avdmanager create avd --name "bpk-avd-min" --package "system-images;android-24;google_apis;arm64-v8a" --device "Nexus 5"
```

If you are a Skyscanner employee follow the next steps:
1. In `build.gradle`, under the resolution strategy, uncomment the part of the code which forces `react-native` version `0.64.1-skyscanner.1`
2. In `package.json`, change the react-native version to `0.64.1-skyscanner.1.1` and then run `npm install` (you might need to first delete the node modules and `package-lock.json` file)
3. Follow the Backpack RN Confluence guidelines to set up the credentials for artifactory

This is in order to use our `react-native` fork which has a fix for https://github.com/facebook/react-native/issues/31572.

### Code style

Backpack uses a combination of [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to enforce coding styles. ESLint runs as a pre-commit hook, so it isn't possible to commit code that causes ESLint to fail.

We recommend that you install [a plugin to your editor](https://eslint.org/docs/user-guide/integrations#editors) to run ESLint automatically, which will then show you any errors inline. You can even enable an option to fix ESLint errors automatically upon saving.

## Getting started

### Install dependencies

Run `npm install` to install dependencies from npm.

#### Android

To ensure that maps powered by Google work set the `google_maps_api_key` in `android/local.properties` and make sure you are using the backpack.keystore.

##### APK signing

For members of Backpack we have a keystore tied to our Google Maps API key in LastPass. Retrieve this key and place it in `android/backpack.keystore`. For contributors who are not members of Backpack nothing needs to be done, but Google Maps will not work. If you need Google Maps to work you'll need to supply your own Google Maps API Key and possible keystore.

### Run the development environment

We use [Storybook](https://storybook.js.org/) for our development environment.

1. Run `npm run storybook` to start the Storybook server and go to [localhost:7007](http://localhost:7007).
1. In another terminal tab/window, run `npm start` to start the React Native server.
1. In a third terminal tab/window, run `npm run ios` and `npm run android` to run the Backpack app on an iPhone simulator and Android emulator.

At this point, you should have a functioning development environment running on your local machine. If you're a Skyscanner employee you can uncomment the forced React Native version in `app/build.gradle` to ensure a crash fix is applied.

## Adding a new component

If you want to add a new component, we will need the following:

- Design (Sketch file)
- Associated tokens
- React component
- Stories
- Tests
- Documentation (Including main `README.md`)

### Design

Sketch is the preferred format for non-technical folks. We’d appreciate if you could provide an exact match of your component in Sketch format together with folders for each state e.g. disabled, expanded etc.

### React component

Use `npm run create-component` to create a new skeleton React Native component. Once this is created, use existing components for code style inspiration.

## How to

<details>
<summary>Create a pull request to Backpack</summary>

For anything non-trivial, we strongly recommend speaking to somebody from Backpack squad before starting work on a PR. This lets us pass on any advice or knowledge we already have about the work you're proposing. It might even be something we're already working on. After this, follow the steps below.

1. [Fork the repository](https://github.com/Skyscanner/backpack-react-native/fork).
2. Create a new branch.
3. Make your changes.
4. Commit and push your new branch.
5. Submit a [pull request](https://github.com/Skyscanner/backpack-react-native/pulls).
6. Notify someone in Backpack squad or drop a note in #backpack.

Bear in mind that small, incremental pull requests are likely to be reviewed faster.

</details>

<details>
<summary>Run tests</summary>

`npm test` will run all tests. It will pick up any files that end in `-test.js`, so you don't need to do anything to make Jest pick them up.

You can also run the tests in 'watch mode', which means the process will continually run and run tests every time files change. Use `npm run jest:watch` to do this.

</details>

</details>

<details>
<summary>Run linters manually</summary>

* `npm run lint` to lint JS.
* `npm run lint:fix` to lint and try to automatically fix any errors.

</details>

<details>
<summary>Run Android emulators manually</summary>

The setup process detailed in *[Prerequisites](#prerequisites)* created two Android emulators. One with API version 28 and another with 24.

To run these manually, run `npm run android:emulator` or `npm run android:emulator:min` to run API versions 28 and 24 respectively.

</details>

<details>
<summary>Publish packages (Backpack squad members only)</summary>

- Update the [unreleased changelog](/unreleased.md) with everything that has changed, separating out breaking changes (*major*), additions (*minor*) and fixes (*patch*) changes (you should see examples of this in previous entries of the [changelog](/changelog.md)).
  - Some useful commands for determining "what's changed?":
    - `git log --pretty=format:"* %s (%h)" $(git describe --tags --abbrev=0)...HEAD`
- Make sure you are an owner of the npm package (speak to a member of the Backpack squad).
- **Run `npm run release`**. Do not run `npm publish`.
- You’ll be asked to specify a new version. Options are *patch*, *minor* or *major*. These should directly align to the entries you put in the [unreleased changelog](/unreleased.md) in step 1.
- Move entries from [unreleased.md](/unreleased.md) to the [changelog](/changelog.md). Update the package versions for the new changes, and group them under a title with today’s date and a brief summary of what has changed.
- Commit and push to main.

### Native Android bridges

Android bridges should be compiled and published into the internal Artifactory, this process is done automatically as part of the release.

To publish it manually run:

```
cd android
./gradlew -PinternalBuild=true :backpack-react-native:publish
```

#### Authentication

Follow the internal documentation to login gradle into the internal Artifactory.

#### Versioning

Versions should follow what is in the `package.json` of the corresponding JS code, and will do so automatically. Once one version is published it can't be replaced, to do a new release the JS package should also be released again.

If you want to publish test code set the env variable `SNAPSHOT=true`, this will publish a snapshot version that can be replaced.

```
cd android
SNAPSHOT=true ./gradlew -PinternalBuild=true :backpack-react-native:publish
```

</details>

## Using relative font

> Ignore this if you are not a Skyscanner employee.

Follow the internal documentation on how to "Setup relative font for RN example app".

## And finally..

If you have any questions at all, don't hesitate to get in touch. We love to talk all things Backpack and we look forward to seeing your contribution!
