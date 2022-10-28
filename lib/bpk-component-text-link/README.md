# bpk-component-text-link

> Backpack React Native text link component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-text-link/ios/default.png" alt="bpk-component-text-link default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-text-link/ios/default_dm.png" alt="bpk-component-text-link default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-text-link/android/default.png" alt="bpk-component-text-link default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-text-link/android/default_dm.png" alt="bpk-component-text-link default Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkTextLink from 'backpack-react-native/bpk-component-text-link';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default () => (
  <View style={styles.container}>
    <BpkText>
        Check out the <BpkTextLink accessibilityLabel="link to website" onPress={() => {}}>website</BpkTextLink>
      </BpkText>
  </View>
);
```

## Props

### BpkTextLink

This component creates a pressable instance of the `BpkText` component and accepts the same props as [`BpkText`](/components/text/?platform=native), alongside the following:

| Property            | PropType                  | Required | Default Value |
| ------------------- | ------------------------- | -------- | ------------- |
| accessibilityLabel  | string                    | true     | null          |
| children            | node                      | true     | -             |
| onPress             | func                      | true     | -             |
| theme               | See [Theme Props](#theme-props) below     | false    | null          |



## Theme Props

* `linkTextColor`