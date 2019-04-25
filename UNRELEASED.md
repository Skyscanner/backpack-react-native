# Unreleased

**Updated:**

- react-native-bpk-component-touchable-overlay
  - `borderRadius` prop now accepts numbers in addition to the existing `sm`, `lg` and `pill` values. E.g. `<BpkTouchableOverlay borderRadius={30} ... />`.

**Fixed:**

- react-native-component-calendar:
  - fixed dependency resolution to follow semver for backpack-android and fail the build if not compatible.
