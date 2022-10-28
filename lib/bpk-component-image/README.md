# bpk-component-image

> Backpack React Native image component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-image/ios/default.png" alt="bpk-component-image default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-image/ios/default_dm.png" alt="bpk-component-image default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-image/android/default.png" alt="bpk-component-image default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-image/android/default_dm.png" alt="bpk-component-image default Google Pixel emulator - dark mode" width="375" /> |

## No border radius

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-image/ios/no-border-radius.png" alt="bpk-component-image no-border-radius iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-image/ios/no-border-radius_dm.png" alt="bpk-component-image no-border-radius iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-image/android/no-border-radius.png" alt="bpk-component-image no-border-radius Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-image/android/no-border-radius_dm.png" alt="bpk-component-image no-border-radius Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

### Default

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase, spacingLg } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkImage from 'backpack-react-native/bpk-component-image';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  image: {
    width: '100%',
    height: spacingLg * 10,
  },
});

export default () => (
  <View style={styles.container}>
    <BpkImage style={styles.image} alt="image title" source={{uri: "imageUri"}} />
  </View>
);
```

### With Loading Behaviour

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase, spacingLg } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkImage, { withLoadingBehaviour } from 'backpack-react-native/bpk-component-image';

const BpkImageWithLoading = withLoadingBehaviour(BpkImage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  image: {
    width: '100%',
    height: spacingLg * 10,
  },
});

export default () => (
  <View style={styles.container}>
    <BpkImageWithLoading style={styles.image} alt="image title" source={{uri: "imageUri"}} />
  </View>
);
```

## Props

### BpkImage

| Property        | PropType                               | Required  | Default Value   |
| --------------- | -------------------------------------- | --------- | --------------- |
| source          | oneOf(number, object, arrayOf(object)) | true      | -               |
| imageComponent  | function                               | false     | Animated.Image  |
| inView          | boolean                                | false     | true            |
| loaded          | boolean                                | false     | true            |
| onLoad          | function                               | false     | null            |
| rounded         | boolean                                | false     | true            |
| style           | style                                  | false     | null            |
