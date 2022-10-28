# bpk-component-spinner

> Backpack React Native spinner component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-spinner/ios/default.png" alt="bpk-component-spinner default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-spinner/ios/default_dm.png" alt="bpk-component-spinner default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-spinner/android/default.png" alt="bpk-component-spinner default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-spinner/android/default_dm.png" alt="bpk-component-spinner default Google Pixel emulator - dark mode" width="375" /> |

## Small

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-spinner/ios/small.png" alt="bpk-component-spinner small iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-spinner/ios/small_dm.png" alt="bpk-component-spinner small iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-spinner/android/small.png" alt="bpk-component-spinner small Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-spinner/android/small_dm.png" alt="bpk-component-spinner small Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkSpinner from 'backpack-react-native/bpk-component-spinner';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkSpinner />
        <BpkSpinner small />
        <BpkSpinner type="light" />
        <BpkSpinner type="dark" />
      </View >
    );
  }
}
```

## Props

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| small               | bool                                  | false    | false         |
| theme               | See [Theme Props](#theme-props) below | false    | null          |
| type                | oneOf('primary', 'light', 'dark')     | false    | primary       |

## Theme Props

### Primary

* `spinnerPrimaryColor`
