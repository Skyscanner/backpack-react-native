# bpk-component-chip

> Backpack React Native chip component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/default.png" alt="bpk-component-chip default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/default_dm.png" alt="bpk-component-chip default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/default.png" alt="bpk-component-chip default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/default_dm.png" alt="bpk-component-chip default Google Pixel emulator - dark mode" width="375" /> |

## With icons

### With leading icon

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/defaultWithIcon.png" alt="bpk-component-chip defaultWithIcon iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/defaultWithIcon_dm.png" alt="bpk-component-chip defaultWithIcon iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/defaultWithIcon.png" alt="bpk-component-chip defaultWithIcon Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/defaultWithIcon_dm.png" alt="bpk-component-chip defaultWithIcon Google Pixel emulator - dark mode" width="375" /> |

### With trailing icon

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/defaultWithTrailingIcon.png" alt="bpk-component-chip defaultWithTrailingIcon iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/defaultWithTrailingIcon_dm.png" alt="bpk-component-chip defaultWithTrailingIcon iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/defaultWithTrailingIcon.png" alt="bpk-component-chip defaultWithTrailingIcon Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/defaultWithTrailingIcon_dm.png" alt="bpk-component-chip defaultWithTrailingIcon Google Pixel emulator - dark mode" width="375" /> |

## Dismissible

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/dismissible.png" alt="bpk-component-chip dismissible iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/dismissible_dm.png" alt="bpk-component-chip dismissible iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/dismissible.png" alt="bpk-component-chip dismissible Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/dismissible_dm.png" alt="bpk-component-chip dismissible Google Pixel emulator - dark mode" width="375" /> |

## Outline

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/outline.png" alt="bpk-component-chip outline iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/outline_dm.png" alt="bpk-component-chip outline iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/outline.png" alt="bpk-component-chip outline Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/outline_dm.png" alt="bpk-component-chip outline Google Pixel emulator - dark mode" width="375" /> |

## Outline Dismissible

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/outlineDismissible.png" alt="bpk-component-chip outlineDismissible iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/ios/outlineDismissible_dm.png" alt="bpk-component-chip outlineDismissible iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/outlineDismissible.png" alt="bpk-component-chip outlineDismissible Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-chip/android/outlineDismissible_dm.png" alt="bpk-component-chip outlineDismissible Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkChip, { BpkDismissibleChip } from 'backpack-react-native/bpk-component-chip';
import BpkIcon, { icons } from 'backpack-react-native//bpk-component-icon';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      flightsSelected: false,
      showHotels: true,
    };
  }

  dismiss = () => {
    this.setState({
      showHotels: false,
    });
  };

  toggle = () => {
    this.setState({
      flightsSelected: !this.state.flightsSelected,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <BpkChip
          accessibilityLabel="Toggle flights"
          label="Flights"
          onPress={this.toggle}
          selected={this.state.flightsSelected}
          leadingAccesoryView={<BpkIcon icon={icons.flight} />}
        />
        { this.state.showHotels &&
          <BpkDismissibleChip
            accessibilityLabel="Remove hotels"
            label="Hotels"
            onPress={this.dismiss}
          />
        }
      </View>
    );
  }
}
```

## Props

### BpkChip

| Property              | PropType                                                                  | Required | Default Value |
| --------------------- | ------------------------------------------------------------------------- | -------- | ------------- |
| accessibilityLabel    | string                                                                    | true     | -             |
| onPress               | func                                                                      | true     | -             |
| label                 | string                                                                    | true     | -             |
| disabled              | bool                                                                      | false    | false         |
| selected              | bool                                                                      | false    | false         |
| innerChipStyle        | ViewStyle                                                                 | false    | null          |
| type                  | oneOf(CHIP_TYPES)                                                         | false    | primary       |
| leadingAccessoryView  | element                                                                   | false    | null          |
| trailingAccessoryView | element                                                                   | false    | null          |

**Note that on Android, `style` should be used for positional styling and `innerChipStyle` should be used for other styling.**
(On iOS, `style` and `innerChipStyle` are applied together so it doesn't matter which you use!)

## `leadingAccessoryView` and `trailingAccessoryView`

Use accessory views to place icons inside the chip.

#### Theme Props

* `chipSelectedBackgroundColor`
* `chipSelectedTextColor`
* `chipOutlineSelectedBackgroundColor`
* `chipOutlineSelectedTextColor`

### BpkDismissibleChip

| Property              | PropType                                                                  | Required | Default Value |
| --------------------- | ------------------------------------------------------------------------- | -------- | ------------- |
| accessibilityLabel    | string                                                                    | true     | -             |
| label                 | string                                                                    | true     | -             |
| onPress               | func                                                                      | true     | -             |
| disabled              | bool                                                                      | false    | false         |
| innerChipStyle        | ViewStyle                                                                 | false    | null          |
| type                  | oneOf(CHIP_TYPES)                                                         | false    | primary       |
| leadingAccessoryView  | element                                                                   | false    | null          |

**Note that on Android, `style` should be used for positional styling and `innerChipStyle` should be used for other styling.**
(On iOS, `style` and `innerChipStyle` are applied together so it doesn't matter which you use!)

## `leadingAccessoryView`

Use accessory views to place icons inside the chip.

**Note:** Dismissible chips do not support trailing accessory views because they already have a close icon in that position.
