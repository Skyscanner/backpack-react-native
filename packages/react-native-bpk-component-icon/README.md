# react-native-bpk-component-icon

> Backpack React Native icon component.

## Installation

```sh
npm install react-native-bpk-component-icon --save-dev
```

### iOS installation

The most reliable way to install the file on iOS is manually, three simple steps are required:
1. update the `Info.plist` file by adding
    ```
    <key>UIAppFonts</key>
      <array>
        <string>BpkIcon.ttf</string>
      </array>
    ```
    if the entry `UIAppFonts` it's already there, just add `<string>BpkIcon.ttf</string>` inside the `<array>` like so
    ```
    <array>
        ... existing entries
        <string>BpkIcon.ttf</string>
      </array>
    ```
2. In the `Build Phases` of your project, in the section `Copy Bundle Resources` add a reference to the `BpkIcon.ttf` file path like `/path/to/node_modules/bpk-svgs/dist/font/BpkIcon.ttf`

3. Rebuild the app

### Android installation

This method has the advantage of fonts being copied from this module at build time so that the fonts and JS are always in sync, making upgrades painless.

Edit `android/app/build.gradle` ( NOT `android/build.gradle` ) and add the following:

```
apply from: "node_modules/react-native-bpk-component-icon/fonts.gradle"
```

## Usage

```js
import { View } from 'react-native';
import React, { Component } from 'react';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import { spacingBase, colorBlue500 } from 'bpk-tokens/tokens/base.react.native';

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
          style={{ color: colorBlue500 }}
          small
        />
        <BpkIcon
          icon={icons.beer}
          style={{ color: colorBlue500 }}
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
