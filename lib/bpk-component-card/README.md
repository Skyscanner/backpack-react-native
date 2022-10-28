# bpk-component-card

> Backpack React Native card component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/default.png" alt="bpk-component-card default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/default_dm.png" alt="bpk-component-card default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/default.png" alt="bpk-component-card default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/default_dm.png" alt="bpk-component-card default Google Pixel emulator - dark mode" width="375" /> |

## Without padding

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/without-padding.png" alt="bpk-component-card without-padding iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/without-padding_dm.png" alt="bpk-component-card without-padding iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/without-padding.png" alt="bpk-component-card without-padding Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/without-padding_dm.png" alt="bpk-component-card without-padding Google Pixel emulator - dark mode" width="375" /> |

## Focused

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/focused.png" alt="bpk-component-card focused iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/focused_dm.png" alt="bpk-component-card focused iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/focused.png" alt="bpk-component-card focused Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/focused_dm.png" alt="bpk-component-card focused Google Pixel emulator - dark mode" width="375" /> |

## Large corner style

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/large-corner-style.png" alt="bpk-component-card large-corner-style iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/large-corner-style_dm.png" alt="bpk-component-card large-corner-style iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/large-corner-style.png" alt="bpk-component-card large-corner-style Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/large-corner-style_dm.png" alt="bpk-component-card large-corner-style Google Pixel emulator - dark mode" width="375" /> |

## With divider

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/with-divider.png" alt="bpk-component-card with-divider iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/with-divider_dm.png" alt="bpk-component-card with-divider iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/with-divider.png" alt="bpk-component-card with-divider Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/with-divider_dm.png" alt="bpk-component-card with-divider Google Pixel emulator - dark mode" width="375" /> |

## With divider arranged vertically

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/with-divider-arranged-vertically.png" alt="bpk-component-card with-divider-arranged-vertically iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/ios/with-divider-arranged-vertically_dm.png" alt="bpk-component-card with-divider-arranged-vertically iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/with-divider-arranged-vertically.png" alt="bpk-component-card with-divider-arranged-vertically Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-card/android/with-divider-arranged-vertically_dm.png" alt="bpk-component-card with-divider-arranged-vertically Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkCard from 'backpack-react-native/bpk-component-card';
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
        <BpkCard
          onPress={() => null}
          accessibilityLabel="Example Card"
        >
          {content}
        </BpkCard>
        <BpkCard
          onPress={() => null}
          accessibilityLabel="Example Card"
          padded={false}
        >
          {content}
        </BpkCard>
        <BpkCard
          onPress={() => null}
          accessibilityLabel="Example Card"
          focused
        >
          {content}
        </BpkCard>
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
import BpkCard, { CORNER_STYLES, withDivider } from 'backpack-react-native/bpk-component-card';

const BpkCardWithDivider = withDivider(BpkCard);

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
        <BpkCardWithDivider
          onPress={() => null}
          stub={content}
          accessibilityLabel="Example Card"
        >
          {content}
        </BpkCardWithDivider>
        <BpkCardWithDivider
          onPress={() => null}
          stub={content}
          accessibilityLabel="Example Card"
          vertical
        >
          {content}
        </BpkCardWithDivider>
        <BpkCardWithDivider
          onPress={() => null}
          stub={content}
          accessibilityLabel="Example Card"
          padded={false}
        >
          {content}
        </BpkCardWithDivider>
        <BpkCardWithDivider
          onPress={() => null}
          stub={content}
          accessibilityLabel="Example Card"
          focused
          cornerStyle={CORNER_STYLES.lg}
        >
          {content}
        </BpkCardWithDivider>
      </View >
    );
  }
}
```

## Props

*BpkCard:*

| Property   | PropType                                  | Required | Default Value       |
| ---------- | ----------------------------------------- | -------- | ------------------- |
| children   | node                                      | true     | -                   |
| onPress    | func                                      | true     | -                   |
| focused    | bool                                      | false    | false               |
| innerStyle | object                                    | false    | null                |
| cornerStyle| oneOf(CORNER_STYLES.sm, CORNER_STYLES.lg) | false    | CORNER_STYLES.sm |
| padded     | bool                                      | false    | true                |

*After `withDivider`:*

| Property   | PropType  | Required | Default Value |
| ---------- | --------- | -------- | ------------- |
| stub       | node      | true     | -             |
| vertical   | bool      | false    | false         |
| mainStyle  | object    | false    | null          |
| stubStyle  | object    | false    | null          |
