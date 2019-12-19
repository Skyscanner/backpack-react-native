# Unreleased

> Place your changes below this line.

**Fixed:**

- react-native-bpk-component-navigation-bar:
  - Fixed a bug where updating the theme would only take effect in the next render.
- react-native-bpk-component-calendar:
  - Fix the flow types within `BpkCalendar` to accurately reflect the expected types and resolve type errors.

**Added:**

- react-native-bpk-component-navigation-bar:
  - All components now spread extra props.

- react-native-bpk-component-calendar:
  - Added new prop `colorBuckets`. Only supported on Android at the moment.

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

