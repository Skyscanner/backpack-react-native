# bpk-component-icon

> Backpack React Native icon component.

## Icons

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-icon/ios/icons.png" alt="bpk-component-icon icons iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-icon/ios/icons_dm.png" alt="bpk-component-icon icons iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-icon/android/icons.png" alt="bpk-component-icon icons Google Pixel emulator" width="375" /> | <img src="undefined" alt="bpk-component-icon icons Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import { View } from 'react-native';
import React, { Component } from 'react';
import BpkIcon, { icons } from 'backpack-react-native/bpk-component-icon';
import { spacingBase, colorSkyBlue } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

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
import { spacingBase, colorSkyBlue } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

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
