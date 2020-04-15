# bpk-component-button

> Backpack React Native button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import BpkButton, { BUTTON_TYPES, ICON_ALIGNMENTS } from 'backpack-react-native/bpk-component-button';
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
        <BpkButton
          type={BUTTON_TYPES.primary}
          title="Book flight"
          onPress={() => {}}
        />
        <BpkButton
          type={BUTTON_TYPES.featured}
          title="Book flight"
          onPress={() => {}}
        />
        <BpkButton
          disabled
          type={BUTTON_TYPES.destructive}
          title="Book flight"
          onPress={() => {}}
        />
        <BpkButton
          large
          type={BUTTON_TYPES.primary}
          title="Book flight"
          onPress={() => {}}
        />
        <BpkButton
          type={BUTTON_TYPES.featured}
          title="Book flight"
          icon="baggage"
          onPress={() => {}}
        />
        <BpkButton
          type={BUTTON_TYPES.primary}
          title="Book flight"
          icon="baggage"
          iconAlignment={ICON_ALIGNMENTS.leading}
          onPress={() => {}}
        />
        <BpkButton
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
| iconOnly (iOS only)   | bool                                                                      | false    | false         |
| large (iOS only)      | bool                                                                      | false    | false         |
| theme                 | See [Theme Props](#theme-props) below                                     | false    | null          |
| type                  | oneOf('primary', 'featured', 'secondary', 'destructive', 'outline')       | false    | null          |

## Theme Props

### Primary

* `buttonPrimaryTextColor`
* `buttonPrimaryGradientStartColor`
* `buttonPrimaryGradientEndColor`

### Secondary

* `buttonSecondaryTextColor`
* `buttonSecondaryBackgroundColor`
* `buttonSecondaryBorderColor`

### Featured

* `buttonFeaturedTextColor`
* `buttonFeaturedGradientStartColor`
* `buttonFeaturedGradientEndColor`

### Destructive

* `buttonDestructiveTextColor`
* `buttonDestructiveBackgroundColor`
* `buttonDestructiveBorderColor`
