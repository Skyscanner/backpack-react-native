# Unreleased

**Breaking:**

- react-native-bpk-component-navigation-bar:
  - New `type` prop for `BpkNavigationBarTextButtonIOS` to change the button colour.
  - Added `navigationBarPrimaryColor` theme property, applied to `BpkNavigationBarTextButtonIOS` when type is `primary`. This is a breaking change as you must now supply this theme property to theme the component. If you are not using theming, this release is not breaking.
