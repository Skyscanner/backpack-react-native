# bpk-component-select

> Backpack React Native select component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkSelect from 'backpack-react-native/bpk-component-select';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default () => (
  <View styles={styles.container>
    <BpkSelect
      onPress={openSelectUI}
      label="Select an Option"
    />
    <BpkSelect
      onPress={openSelectUI}
      label="Select an Option"
      valid={false}
      validationMessage="An option must be selected to continue"
    />
  </View>
);
```

## Props

| Property             | PropType                              | Required | Default Value |
| -----------          | ------------------------------------- | -------- | ------------- |
| onPress              | func                                  | true     | -             |
| disabled             | bool                                  | false    | false         |
| focused              | bool                                  | false    | false         |
| label                | oneOfType(string, element)            | false    | null          |
| valid                | oneOf(true, false, null)              | false    | null          |
| validationMessage    | string                                | false    | null          |
