# bpk-component-touchable-native-feedback

> Backpack React Native touchable native feedback component.

## Touchable native feedback

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-touchable-native-feedback/android/default.png" alt="bpk-component-touchable-native-feedback Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-touchable-native-feedback/android/default_dm.png" alt="bpk-component-touchable-native-feedback Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkText from 'backpack-react-native/bpk-component-text';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkTouchableNativeFeedback from 'backpack-react-native/bpk-component-touchable-native-feedback';

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
        <BpkTouchableNativeFeedback
          onPress={() => null}
          accessibilityLabel="Example touchable native feedback"
        >
          <BpkText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>
        </BpkTouchableNativeFeedback>
      </View>
    );
  }
}
```

## Props

| Property             | PropType | Required | Default Value |
| -------------------- | -------- | -------- | ------------- |
| children             | element  | true     | -             |
| borderlessBackground | bool     | false    | true          |
| color                | string   | false    | null          |
