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
import BpkFlare, { INSET_PADDING_MODES } from 'backpack-react-native/bpk-component-flare';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
});

export default () => (
  <View style={styles.container}>

    // With arbitrary content.
    <BpkFlare>
        <BpkText>Hotels in Valparaiso.</BpkText>
    </BpkFlare>

    // With an image and insetPaddingMode set.
    <BpkFlare insetPaddingMode={INSET_PADDING_MODES.bottom}>
      <BpkImage source={{uri: "imageUri" }} alt="Image title" />
    </BpkFlare>
  </View>
);
```

## Props

| Property         | PropType                                                         | Required | Default Value              |
| ---------------- | ---------------------------------------------------------------- | -------- | -------------------------- |
| children         | node                                                             | true     | -                          |
| insetPaddingMode | oneOf([`INSET_PADDING_MODES.none`, `INSET_PADDING_MODES.bottom`) | true     | `INSET_PADDING_MODES.none` |
