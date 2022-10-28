# bpk-component-carousel-indicator

> Backpack React Native carousel indicators component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-carousel-indicator/ios/default.png" alt="bpk-component-carousel-indicator default iPhone 8 simulator" width="375" /> | <img src="undefined" alt="bpk-component-carousel-indicator default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-carousel-indicator/android/default.png" alt="bpk-component-carousel-indicator default Google Pixel emulator" width="375" /> | <img src="undefined" alt="bpk-component-carousel-indicator default Google Pixel emulator - dark mode" width="375" /> |

## With overlay

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-carousel-indicator/ios/with-overlay.png" alt="bpk-component-carousel-indicator with-overlay iPhone 8 simulator" width="375" /> | <img src="undefined" alt="bpk-component-carousel-indicator with-overlay iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-carousel-indicator/android/with-overlay.png" alt="bpk-component-carousel-indicator with-overlay Google Pixel emulator" width="375" /> | <img src="undefined" alt="bpk-component-carousel-indicator with-overlay Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkCarouselIndicator from 'backpack-react-native/bpk-component-carousel-indicator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkCarouselIndicator pageCount="10" selectedIndex="0" />
        <BpkCarouselIndicator pageCount="3" selectedIndex="2" />
        <BpkCarouselIndicator pageCount="5" selectedIndex="1" />
      </View>
    );
  }
}
```

## Props

| Property      | PropType | Required | Default Value |
| ------------- | -------- | -------- | ------------- |
| pageCount     | number   | true     | -             |
| selectedIndex | number   | true     | -             |
