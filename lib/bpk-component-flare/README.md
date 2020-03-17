# bpk-component-flare

> Backpack React Native flare component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkFlare from 'backpack-react-native/bpk-component-flare';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
});

export default () => (
  <View style={styles.container}>
    <BpkFlare />
  </View>
);
```

## Props

### BpkFlare

TODO - Add your component's prop types here.
