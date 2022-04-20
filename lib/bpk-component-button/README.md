# bpk-component-button

> Backpack React Native button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { BUTTON_TYPES, ICON_ALIGNMENTS, BpkButtonV2 } from 'backpack-react-native/bpk-component-button';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

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
        <BpkButtonV2
          type={BUTTON_TYPES.primary}
          title="Book flight"
          onPress={() => {}}
        />
        <BpkButtonV2
          type={BUTTON_TYPES.featured}
          title="Book flight"
          onPress={() => {}}
        />
        <BpkButtonV2
          disabled
          type={BUTTON_TYPES.destructive}
          title="Book flight"
          onPress={() => {}}
        />
        <BpkButtonV2
          large
          type={BUTTON_TYPES.primary}
          title="Book flight"
          onPress={() => {}}
        />
        <BpkButtonV2
          type={BUTTON_TYPES.featured}
          title="Book flight"
          icon="baggage"
          onPress={() => {}}
        />
        <BpkButtonV2
          type={BUTTON_TYPES.primary}
          title="Book flight"
          icon="baggage"
          iconAlignment={ICON_ALIGNMENTS.leading}
          onPress={() => {}}
        />
        <BpkButtonV2
          type={BUTTON_TYPES.featured}
          title="Book flight"
          icon="baggage"
          iconOnly
          onPress={() => {}}
        />
      </View>
    );
  }
}
```

## Props

| Property              | PropType                                                                  | Required | Default Value |
| --------------------- | ------------------------------------------------------------------------- | -------- | ------------- |
| onPress               | func                                                                      | true     | -             |
| title                 | string                                                                    | true     | -             |
| accessibilityLabel    | string                                                                    | false    | props.title   |
| disabled              | bool                                                                      | false    | false         |
| icon                  | oneOf(string, element) Strings must be a [BpkIcon](/components/web/icons) | false    | null          |
| iconAlignment         | oneOf('leading', 'trailing')                                              | false    | trailing      |
| iconOnly              | bool                                                                      | false    | false         |
| large                 | bool                                                                      | false    | false         |
| type                  | oneOf('primary', 'featured', 'secondary', 'destructive', 'primaryOnLight', 'primaryOnDark', 'secondaryOnDark', 'link', 'linkOnDark')       | false    | null          |
