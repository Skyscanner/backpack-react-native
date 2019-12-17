# Unreleased

> Place your changes below this line.

**Changed:**

- react-native-bpk-theming:
  - Components that can be themed will now only throw a prop type error when a theme is partially applied. Previously, a prop type error would appear if a component was placed inside a `BpkThemeProvider` but no relevant theming props were given to it. This change enables the use of themed components alongside non-themed ones without seeing warnings.

## How to write a good changelog entry

1. Add 'Breaking', 'Added' or 'Fixed' in bold depending on if the change will be major, minor or patch according to [semver](semver.org).
2. Add the package name.
3. Detail the changes. Write with the consumer in mind, what do they need to know. If it's patch, tell them what's changed. If it's minor, tell them what you've added and what it does for them. If it's breaking, tell them what they need to change. Link to examples on the [Backpack docs site](backpack.github.io) where possible.

Don't worry about adding the specific version number or the date. This will be done by a Backpack squad member as part of the release process.

## Example of a good changelog entry

See [`CHANGELOG.md`](CHANGELOG.md) for real-world examples of good changelog entries.

**Breaking:**

- react-native-bpk-styles:
  - Replaced `charmeleon` icon with new `charizard` icon. To upgrade, replace your references to `charmeleon` with `charizard`.
  - Upgraded `fire` dependency to `3.0.0`.

**Added:**

- react-native-bpk-component-infinity-gauntlet:
  - New `timeStone` prop for controlling time. See &lt;link to docs site&gt;.

**Fixed:**

- react-native-bpk-component-horcrux:
  - Fixed issue where `BpkHorcrux` would occasionally possess the living.

