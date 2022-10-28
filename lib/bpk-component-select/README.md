# bpk-component-select

> Backpack React Native select component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-select/ios/default.png" alt="bpk-component-select default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-select/ios/default_dm.png" alt="bpk-component-select default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-select/android/default.png" alt="bpk-component-select default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-select/android/default_dm.png" alt="bpk-component-select default Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkSelect from 'backpack-react-native/bpk-component-select';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default () => (
  <View styles={styles.container>
    <BpkSelect
      onPress={openSelectUI}
      label="Select an Option"
    />
    <BpkSelect
      onPress={openSelectUI}
      label="Select an Option"
      valid={false}
      validationMessage="An option must be selected to continue"
    />
  </View>
);
```

## Props

| Property             | PropType                              | Required | Default Value |
| -----------          | ------------------------------------- | -------- | ------------- |
| onPress              | func                                  | true     | -             |
| disabled             | bool                                  | false    | false         |
| focused              | bool                                  | false    | false         |
| label                | oneOfType(string, element)            | false    | null          |
| valid                | oneOf(true, false, null)              | false    | null          |
| validationMessage    | string                                | false    | null          |
