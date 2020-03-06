# bpk-component-progress

> Backpack React Native Progress component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkProgress from 'backpack-react-native/bpk-component-progress';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

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
        <BpkProgress min={0} max={100} value={10} accessibilityLabel="0 of 100" />
        <BpkProgress min={0} max={100} value={10} accessibilityLabel="0 of 100" type="Bar" />
      </View>
    );
  }
}
```

## Props

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| accessibilityLabel | oneOfType(string, func)               | true     | -             |
| max                | number                                | true     | -             |
| min                | number                                | true     | -             |
| value              | number                                | true     | -             |
| fillStyle          | object                                | false    | -             |
| style              | object                                | false    | -             |
| theme              | See [Theme Props](#theme-props) below | false    | -             |
| type               | oneOf('default', 'bar')               | false    | default       |


## Theme Props

* `progressFillBackgroundColor`,
* `progressTrackBackgroundColor`
