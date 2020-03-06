# bpk-component-image

> Backpack React Native image component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

### Default

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase, spacingLg } from 'bpk-tokens/tokens/base.react.native';
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
import { spacingBase, spacingLg } from 'bpk-tokens/tokens/base.react.native';
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
