# bpk-component-text-link

> Backpack React Native text-link component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkTextLink from 'backpack-react-native/bpk-component-text-link';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default () => (
  <View style={styles.container}>
    <BpkText>
        Check out the website <BpkTextLink accessibilityLabel="link to website" onPress={() => {}}>here</BpkTextLink>
      </BpkText>
  </View>
);
```

## Props

### BpkTextLink

| Property            | PropType                  | Required | Default Value |
| ------------------- | ------------------------- | -------- | ------------- |
| children            | node                      | true     | -             |
| onPress             | func                      | true     | -             |
| accessibilityLabel  | string                    | false    | null          |
| theme               | See [Theme Props](#theme-props) below     | false    | null          |

This component inherits all props from [`BpkText`](/components/text/?platform=native) component

## Theme Props

* `linkTexColor`