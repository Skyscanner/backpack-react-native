# bpk-component-touchable-overlay

> Backpack React Native touchable overlay component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkText from 'backpack-react-native/bpk-component-text';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkTouchableOverlay from 'backpack-react-native/bpk-component-touchable-overlay';

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
        <BpkTouchableOverlay
          onPress={() => null}
          accessibilityLabel="Example touchable overlay"
        >
          <BpkText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>
        </BpkTouchableOverlay>
      </View>
    );
  }
}
```

## Props

| Property     | PropType                  | Required | Default Value |
| ------------ | ------------------------- | -------- | ------------- |
| children     | node                      | true     | -             |
| borderRadius | oneOf('sm', 'lg', 'pill') | false    | null          |
| overlayStyle | object                    | false    | null          |
