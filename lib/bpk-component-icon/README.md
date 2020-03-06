# bpk-component-icon

> Backpack React Native icon component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import { View } from 'react-native';
import React, { Component } from 'react';
import BpkIcon, { icons } from 'backpack-react-native/bpk-component-icon';
import { spacingBase, colorSkyBlue } from 'bpk-tokens/tokens/base.react.native';

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
        <BpkIcon
          icon={icons.beer}
          style={{ color: colorSkyBlue }}
          small
        />
        <BpkIcon
          icon={icons.beer}
          style={{ color: colorSkyBlue }}
        />
      </View>
    );
  }
}
```

### `withRtlSupport` HOC

```js
import { View } from 'react-native';
import React, { Component } from 'react';
import BpkIcon, { icons, withRtlSupport } from 'backpack-react-native/bpk-component-icon';
import { spacingBase, colorSkyBlue } from 'bpk-tokens/tokens/base.react.native';

const BpkIconwithRtlSupport = withRtlSupport(BpkIcon);

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
        <BpkIconwithRtlSupport
          icon={icons.beer}
          style={{ color: colorSkyBlue }}
        />
      </View>
    );
  }
}
```

## Props

| Property  | PropType  | Required | Default Value |
| --------- | --------- | -------- | ------------- |
| icon      | string    | true     | -             |
| small     | bool      | false    | false         |
