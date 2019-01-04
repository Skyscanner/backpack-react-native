# Unreleased

**Breaking:**

- react-native-bpk-component-badge:
  - The `message` prop is now optional. This is for when badges have only an `accessoryView` and no text.
  - Added an `accessibilityLabel` prop. This defaults to the contents of `message` and is only a required prop when `message` is `null`.
  - Fixed padding issues when badges had no `message` and an `accessoryView`.

**Fixed:**

- react-native-bpk-component-text-input:
  - Disabled font scaling for the label when an accessory view is present.
- react-native-bpk-component-phone-input:
  - Disabled font scaling for the label.

- react-native-bpk-component-button:
  - Secondary and destructive buttons now correctly have white backgrounds instead of transparent.

- react-native-bpk-component-image:
- react-native-bpk-component-text:
  - Remove dependency on `bpk-react-utils`.
