# Unreleased

**Breaking:**

- Improved accessibility of the calendar, `BpkCalendar`. When setting the `selectionType` prop it's no longer enough to use e.g. `SELECTION_TYPES.single`. Instead of `SELECTION_TYPES` there are three new functions to use: `makeSingleSelection`, `makeRangeSelection`, `makeMultipleSelection`. These expect a few additional string arguments for assistive technology users. Read more in the [migration guide](docs/14.0.0-calendar-accessibility-migration.md)



> Place your changes below this line.

## How to write a good changelog entry

1. Add 'Breaking', 'Added' or 'Fixed' in bold depending on if the change will be major, minor or patch according to [semver](semver.org).
2. Add the package name.
3. Detail the changes. Write with the consumer in mind, what do they need to know. If it's patch, tell them what's changed. If it's minor, tell them what you've added and what it does for them. If it's breaking, tell them what they need to change. Link to examples on the [Backpack docs site](backpack.github.io) where possible.

Don't worry about adding the specific version number or the date. This will be done by a Backpack squad member as part of the release process.

## Example of a good changelog entry

See [`CHANGELOG.md`](CHANGELOG.md) for real-world examples of good changelog entries.

**Breaking:**

- Replaced `charmeleon` icon with new `charizard` icon. To upgrade, replace your references to `charmeleon` with `charizard`.
- Upgraded `fire` dependency to `3.0.0`.

**Added:**

- New `timeStone` prop for controlling time. See &lt;link to docs site&gt;.

**Fixed:**

- Fixed issue where `BpkHorcrux` would occasionally possess the living.
