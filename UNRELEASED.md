# Unreleased

**Breaking:**

- react-native-bpk-component-calendar:
  - Changed date prop format to allow date timestamps in milliseconds, as well as Date object
  - Date props are now expected to be provided in UTC.
  - `onSelectedDatesChange` callback will now be called with dates in UTC.
