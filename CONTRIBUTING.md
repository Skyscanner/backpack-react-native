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

Copyright 2016-2019 Skyscanner Ltd

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

### Decisions

Conventions and squad decisions are kept in the [decisions folder](/decisions). We recommend familiarising yourself with these.

### Installing Node

Backpack is developed using Node, using the following versions:

* `LTS/Carbon` (Node ^8.12.0)
* `^6.4.1` (npm)

This is enforced using a pre-install hook that calls out to [ensure-node-env](https://github.com/Skyscanner/ensure-node-env).

If you use [nvm](https://github.com/creationix/nvm) or [nave](https://github.com/isaacs/nave) to manage your Node environment, Backpack has built-in support for these. Just run `nvm use` or `nave auto` to install the correct Node version.

To install npm, use `npm install --global npm@^6.4.1`.

#### iOS

Install XCode from the [App Store](https://itunes.apple.com/gb/app/xcode/id497799835?mt=12). Once installed, open it and accept the licence agreement. You're free to close it after that.

We use [Cocoapods](https://cocoapods.org) to install some iOS-specific dependencies. Cocoapods uses Ruby, so you'll need to install that too. [rbenv](https://github.com/rbenv/rbenv) and [rvm](https://rvm.io/) are both good ways to get Ruby. The version of Ruby you'll need is specified in `ios/.ruby-version`.

Once you have Ruby, install [Bundler](https://bundler.io) with `gem install bundler`.

#### Android

Get [Homebrew](https://brew.sh/) if you don't already have it.

Install Watchman with `brew install watchman`, then install Java 8 with `brew tap caskroom/versions && brew cask install java8`.

Get Android Studio with `brew cask install android-studio`. Once installed, open it and a setup wizard will guide you through installing lots of extra things like the Android SDK (choose *Standard* installation). You may be asked for your password during this. You're free to close Android Studio once this is done.

Add an environment variable pointing to the SDK location to your `~/.bash_profile`
(or similarly used file):

```
echo "export ANDROID_HOME=\"$HOME/Library/Android/sdk\"" >> ~/.bash_profile
echo "export ANDROID_SDK_ROOT=\"$HOME/Library/Android/sdk\"" >> ~/.bash_profile
source ~/.bash_profile
```

Accept the SDK licences:

```
$ANDROID_SDK_ROOT/tools/bin/sdkmanager --licenses
```

Download Android system images for the minimum and targeted API levels. Note that you may get a warning about a `.cfg` file not being present. You're safe to ignore this.

```
$ANDROID_SDK_ROOT/tools/bin/sdkmanager "system-images;android-28;google_apis;x86"
$ANDROID_SDK_ROOT/tools/bin/sdkmanager "system-images;android-21;google_apis;x86"
```
Create Android Virtual Devices (AVDs):

```
$ANDROID_SDK_ROOT/tools/bin/avdmanager create avd --name "bpk-avd" --package "system-images;android-28;google_apis;x86" --device "pixel" && cp android/bpk-avd.ini ~/.android/avd/bpk-avd.avd/config.ini
$ANDROID_SDK_ROOT/tools/bin/avdmanager create avd --name "bpk-avd-min" --package "system-images;android-21;google_apis;x86" --device "Nexus 5"
```

### Code style

Backpack uses a combination of [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to enforce coding styles. ESLint runs as a pre-commit hook, so it isn't possible to commit code that causes ESLint to fail.

We recommend that you install [a plugin to your editor](https://eslint.org/docs/user-guide/integrations#editors) to run ESLint automatically, which will then show you any errors inline. You can even enable an option to fix ESLint errors automatically upon saving.

## Getting started

### Install dependencies

Run `npm install` to install dependencies from npm.

<details>
<summary>A note on dependencies</summary>

Backpack is a multi-package repository, also known as a monorepo. This means that instead of having one code repository for each npm package, we manage them all inside this single repository.

We use [Lerna](https://lernajs.io) to achieve this. Lerna links packages together inside this repo by 'bootstrapping'.

When you run `npm install`, Lerna is bootstrapped automatically as a post-install hook. However, if you change dependencies within a package, you will need to run Lerna manually with `npm run bootstrap`.

</details>

#### Android

To ensure that maps powered by Google work set the `google_maps_api_key` in `android/local.properties` and make sure you are using the backpack.keystore.

##### APK signing

For members of Backpack we have a keystore tied to our Google Maps API key in LastPass. Retrieve this key and place it in `android/backpack.keystore`. For contributors who are not members of Backpack nothing needs to be done, but Google Maps will not work. If you need Google Maps to work you'll need to supply your own Google Maps API Key and possible keystore.

### Run the development environment

We use [Storybook](https://storybook.js.org/) for our development environment.

1. Run `npm start` to start the storybook server.
2. Open another terminal tab/window.
3. Run `npm run ios` to run the Backpack app on an iPhone simulator.
4. Run `npm run android` to run the Backpack app on an Android emulator.

At this point, you should have a functioning development environment running on your local machine.

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

Use `npm run create-component` to create a new skeleton React component. Once this is created, use existing components for code style inspiration.

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

The setup process detailed in *[Prerequisites](#prerequisites)* created two Android emulators. One with API version 27 and another with 21.

To run these manually, run `npm run android:emulator` or `npm run android:emulator:min` to run API versions 27 and 21 respectively.

</details>

<details>
<summary>Publish packages (Backpack squad members only)</summary>

- Update the [unreleased changelog](/unreleased.md) with every package that has changed, separating out breaking changes (*major*), additions (*minor*) and fixes (*patch*) changes (you should see examples of this in previous entries of the [changelog](/changelog.md)).
  - Some useful commands for determining "what's changed?":
    - `npm run lerna updated`
    - `npm run lerna diff <package-name>`
- Make sure you are an owner of the npm packages (speak to a member of the Backpack squad).
- **Run `npm run release`** (this will run `lerna publish`). Do not run `npm publish`.
- You’ll be asked to specify a new version for every package that has changed. Options are *patch*, *minor* or *major*. These should directly align to the entries you put in the [unreleased changelog](/unreleased.md) in step 1.
- You’ll be asked at the end to confirm. Note you can still exit without making these changes.
- Move entries from [unreleased.md](/unreleased.md) to the [changelog](/changelog.md). Update the package versions for the new changes, and group them under a title with today’s date and a brief summary of what has changed.
- Commit and push to master.

Be aware that if `bpk-tokens` has changed, *all* packages in the repository will be updated as they all depend on `bpk-tokens`. Changing an existing token is almost always worth a "major" release, whereas adding a new token is usually a "minor" release.

When a component is released for the first time on npm, remember to add the component to the Skyscanner organisation through the [npm UI](https://www.npmjs.com/settings/skyscanner/teams/team/backpack-react-native/access).

### Native Android bridges

Android bridges should be compiled and published into the internal Artifactory, to do so after the JS package has been released, run:

```
cd android
./gradlew :<project-name>:publish
```

#### Authentication

To authenticate add the following properties to `android/local.properties`

```
jfrog_username=<your_name>
jfrog_password=<your_password>
```

Alternatively you can set the env variables `JFROG_USERNAME` and `JFROG_PASSWORD`

#### Versioning

Versions should follow what is in the `package.json` of the corresponding JS code, and will do so automatically. Once one version is published it can't be replaced, to do a new release the JS package should also be released again.

If you want to publish test code set the env variable `SNAPSHOT=true`, this will publish a snapshot version that can be replaced.

```
cd android
SNAPSHOT=true ./gradlew :<project-name>:publish
```

</details>

## And finally..

If you have any questions at all, don't hesitate to get in touch. We love to talk all things Backpack and we look forward to seeing your contribution!
