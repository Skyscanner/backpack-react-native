# bpk-component-flare

> Backpack React Native flare component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/ios/default.png" alt="bpk-component-flare default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/ios/default_dm.png" alt="bpk-component-flare default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/android/default.png" alt="bpk-component-flare default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/android/default_dm.png" alt="bpk-component-flare default Google Pixel emulator - dark mode" width="375" /> |

## With Image

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/ios/image.png" alt="bpk-component-flare image iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/ios/image_dm.png" alt="bpk-component-flare image iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/android/image.png" alt="bpk-component-flare image Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/android/image_dm.png" alt="bpk-component-flare image Google Pixel emulator - dark mode" width="375" /> |

## Pointer up

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/ios/pointer-up.png" alt="bpk-component-flare pointer-up iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/ios/pointer-up_dm.png" alt="bpk-component-flare pointer-up iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/android/pointer-up.png" alt="bpk-component-flare pointer-up Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-flare/android/pointer-up_dm.png" alt="bpk-component-flare pointer-up Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkImage from 'backpack-react-native/bpk-component-image';
import BpkText from 'backpack-react-native/bpk-component-text';
import BpkFlare, { FLARE_POINTER_DIRECTIONS } from 'backpack-react-native/bpk-component-flare';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  flare: {
    maxHeight: spacingBase * 10
  }
});

export default () => (
  <View style={styles.container}>

    // With arbitrary content.
    <BpkFlare style={styles.flare}>
        <BpkText>Hotels in Valparaiso.</BpkText>
    </BpkFlare>

    // With an image.
    <BpkFlare style={styles.flare}>
      <BpkImage source={{uri: "imageUri" }} alt="Image title" />
    </BpkFlare>

    // With the pointer facing up.
    <BpkFlare pointerDirection={FLARE_POINTER_DIRECTIONS.up} style={styles.flare}>
        <BpkText>Hotels in Valparaiso.</BpkText>
    </BpkFlare>
  </View>
);
```

## Props

| Property         | PropType            | Required | Default Value |
| ---------------- | ------------------- | -------- | ------------- |
| children         | node                | true     | -             |
| pointerDirection | oneOf('down', 'up') | false    | down          |
