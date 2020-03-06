# bpk-component-button-link

> Backpack React Native button link component.

## Installation

1. Install the npm package:
```sh
npm install bpk-component-button-link --save-dev
```

2. `bpk-component-button-link` depends on [bpk-component-icon](https://www.npmjs.com/package/bpk-component-icon). Make sure to follow the installation guide for the icon component for the different platforms.

## Usage

```js
import { View } from 'react-native';
import React, { Component } from 'react';
import BpkButtonLink from 'backpack-react-native/bpk-component-button-link';
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
        <BpkButtonLink
          title="Book flight"
          onPress={() => {}} />
        <BpkButtonLink
          title="Disabled"
          disabled
          onPress={() => {}} />
        <BpkButtonLink
          large
          title="Book flight"
          onPress={() => {}} />
        <BpkButtonLink
          title="Book flight"
          icon="baggage"
          onPress={() => {}} />
        <BpkButtonLink
          title="Book flight"
          icon="baggage"
          iconAlignment="leading"
          onPress={() => {}} />
      </View>
    );
  }
}
```

## Props

| Property                            | PropType                                                                  | Required | Default Value |
| ----------------------------------- | ------------------------------------------------------------------------- | -------- | ------------- |
| onPress                             | func                                                                      | true     | -             |
| title                               | string                                                                    | true     | -             |
| disabled                            | bool                                                                      | false    | false         |
| accessibilityLabel                  | string                                                                    | false    | props.title   |
| icon                                | oneOf(string, element) Strings must be a [BpkIcon](/components/web/icons) | false    | null          |
| iconAlignment                       | oneOf('leading', 'trailing')                                              | false    | trailing      |
| large (iOS only)                    | bool                                                                      | false    | false         |
| borderlessBackground (Android only) | bool                                                                      | false    | true          |
| uppercase (Android only)            | bool                                                                      | false    | true          |
| theme                               | See [Theme Props](#theme-props) below                                     | false    | null          |
| textProps                           | object                                                                    | false    | null          |

## Theme Props

* `buttonLinkTextColor`
