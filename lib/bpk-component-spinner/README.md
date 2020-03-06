# bpk-component-spinner

> Backpack React Native spinner component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkSpinner from 'backpack-react-native/bpk-component-spinner';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

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
        <BpkSpinner />
        <BpkSpinner small />
        <BpkSpinner type="light" />
        <BpkSpinner type="dark" />
      </View >
    );
  }
}
```

## Props

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| small               | bool                                  | false    | false         |
| theme               | See [Theme Props](#theme-props) below | false    | null          |
| type                | oneOf('primary', 'light', 'dark')     | false    | primary       |

## Theme Props

### Primary

* `spinnerPrimaryColor`
