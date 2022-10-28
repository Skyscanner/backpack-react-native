# bpk-component-panel

> Backpack React Native panel component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/ios/default.png" alt="bpk-component-panel default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/ios/default_dm.png" alt="bpk-component-panel default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/android/default.png" alt="bpk-component-panel default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/android/default_dm.png" alt="bpk-component-panel default Google Pixel emulator - dark mode" width="375" /> |


## Without padding

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/ios/without-padding.png" alt="bpk-component-panel without-padding iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/ios/without-padding_dm.png" alt="bpk-component-panel without-padding iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/android/without-padding.png" alt="bpk-component-panel without-padding Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/android/without-padding_dm.png" alt="bpk-component-panel without-padding Google Pixel emulator - dark mode" width="375" /> |

## With divider

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/ios/with-divider.png" alt="bpk-component-panel with-divider iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/ios/with-divider_dm.png" alt="bpk-component-panel with-divider iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/android/with-divider.png" alt="bpk-component-panel with-divider Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/android/with-divider_dm.png" alt="bpk-component-panel with-divider Google Pixel emulator - dark mode" width="375" /> |

## With divider arranged vertically

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/ios/with-divider-arranged-vertically.png" alt="bpk-component-panel with-divider-arranged-vertically iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/ios/with-divider-arranged-vertically_dm.png" alt="bpk-component-panel with-divider-arranged-vertically iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/android/with-divider-arranged-vertically.png" alt="bpk-component-panel with-divider-arranged-vertically Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-panel/android/with-divider-arranged-vertically_dm.png" alt="bpk-component-panel with-divider-arranged-vertically Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkPanel from 'backpack-react-native/bpk-component-panel';
import BpkText from 'backpack-react-native/bpk-component-text';
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
    const content = (
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
        et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkText>
    );

    return (
      <View style={styles.container}>
        <BpkPanel>{content}</BpkPanel>
        <BpkPanel padded={false}>{content}</BpkPanel>
      </View >
    );
  }
}
```

### `withDivider` HOC

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkText from 'backpack-react-native/bpk-component-text';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkPanel, { withDivider } from 'backpack-react-native/bpk-component-panel';

const BpkPanelWithDivider = withDivider(BpkPanel);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default class App extends Component {
  render() {
    const content = (
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
        et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkText>
    );

    return (
      <View style={styles.container}>
        <BpkPanelWithDivider stub={content}>{content}</BpkPanelWithDivider>
        <BpkPanelWithDivider stub={content} vertical>{content}</BpkPanelWithDivider>
        <BpkPanelWithDivider stub={content} padded={false}>{content}</BpkPanelWithDivider>
      </View >
    );
  }
}
```

## Props

*BpkPanel:*

| Property   | PropType  | Required | Default Value |
| ---------- | --------- | -------- | ------------- |
| children   | node      | true     | -             |
| padded     | bool      | false    | true          |

*After `withDivider`:*

| Property   | PropType  | Required | Default Value |
| ---------- | --------- | -------- | ------------- |
| stub       | node      | true     | -             |
| vertical   | bool      | false    | false         |
| mainStyle  | object    | false    | null          |
| stubStyle  | object    | false    | null          |
