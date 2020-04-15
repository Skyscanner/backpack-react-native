# bpk-component-flare

> Backpack React Native flare component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
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
