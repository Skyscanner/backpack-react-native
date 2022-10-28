# bpk-component-snackbar

> Backpack React Native snackbar component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/ios/default.png" alt="bpk-component-snackbar default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/ios/default_dm.png" alt="bpk-component-snackbar default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/android/default.png" alt="bpk-component-snackbar default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/android/default_dm.png" alt="bpk-component-snackbar default Google Pixel emulator - dark mode" width="375" /> |

## Title and icon

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/ios/title-and-icon.png" alt="bpk-component-snackbar title-and-icon iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/ios/title-and-icon_dm.png" alt="bpk-component-snackbar title-and-icon iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/android/title-and-icon.png" alt="bpk-component-snackbar title-and-icon Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/android/title-and-icon_dm.png" alt="bpk-component-snackbar title-and-icon Google Pixel emulator - dark mode" width="375" /> |

## Action

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/ios/action.png" alt="bpk-component-snackbar action iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/ios/action_dm.png" alt="bpk-component-snackbar action iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/android/action.png" alt="bpk-component-snackbar action Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/android/action_dm.png" alt="bpk-component-snackbar action Google Pixel emulator - dark mode" width="375" /> |

## Icon action

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/ios/icon-action.png" alt="bpk-component-snackbar icon-action iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/ios/icon-action_dm.png" alt="bpk-component-snackbar icon-action iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/android/icon-action.png" alt="bpk-component-snackbar icon-action Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-snackbar/android/icon-action_dm.png" alt="bpk-component-snackbar icon-action Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkAlert from 'backpack-react-native/bpk-component-alert';
import BpkButton from 'backpack-react-native/bpk-component-button';
import { icons } from 'backpack-react-native/bpk-component-icon';
import BpkSnackbar, { SNACKBAR_LENGTHS } from 'backpack-react-native/bpk-component-snackbar';

export default () => (
  <BpkButton
    title="Show"
    onPress={() => {
      BpkSnackbar.show({
        text: 'Snackbar text',
        duration: SNACKBAR_LENGTHS.short,
        title: 'Title',
        icon: icons.flight,
        action: {
          text: 'Action',
          onPress: () => {
            BpkAlert.alert('Action pressed');
          }
        }
      })
    }}
  />
);
```

## Props

### BpkSnackbar

| Property         | PropType                                       | Required | Default Value           |
| ---------------- | ---------------------------------------------- | -------- | ----------------------- |
| `duration`       | `number`                                       | true     | `SNACKBAR_LENGTHS.short`|
| `text`           | `string`                                       | true     | -                       |
| `title`          | `string`                                       | false    | -                       |
| `icon`           | `string`                                       | false    | -                       |
| `action`         | `object`                                       | false    | -                       |
| `action.text*`   | `string`                                       | true     | -                       |
| `action.icon*`   | `string`                                       | true     | -                       |
| `action.onPress` | `function`                                     | true     | -                       |

**NOTES**

- when `action` is provided `action.text` or `action.icon` should be provided, but not both at the same time.
