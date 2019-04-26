# Unreleased

**Added:**
- react-native-bpk-component-touchable-overlay
  - `borderRadius` prop now accepts numbers in addition to the existing `sm`, `lg` and `pill` values. E.g. `<BpkTouchableOverlay borderRadius={30} ... />`.
- react-native-bpk-component-button:
  - Added theming support for button border radii. See https://backpack.github.io/components/button?platform=native.

**Fixed:**
- react-native-component-calendar:
  - Fixed dependency resolution to follow semver for `backpack-android` and fail the build if not compatible.
