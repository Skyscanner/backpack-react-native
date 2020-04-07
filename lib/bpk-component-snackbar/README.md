# bpk-component-snackbar

> Backpack React Native snackbar component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import { Alert } from 'react-native';
import Buttom from 'backpack-react-native/bpk-component-buttom';
import { icons } from 'backpack-react-native/bpk-component-icon';
import BpkSnackbar, { LENGTH_SHORT } from 'backpack-react-native/bpk-component-snackbar';

export default () => (
  <Buttom
    title="Show"
    onPress={() => {
      BpkSnackbar.show({
        text: 'Snackbar text',
        duration: LENGTH_SHORT,
        title: 'Title',
        icon: icons.flight,
        action: {
          text: 'Action',
          onPress: () => {
            Alert.alert('Action pressed');
          }
        }
      })
    }}
  />
);
```

## Props

### BpkSnackbar

| Property         | PropType                                       | Required | Default Value |
| ---------------- | ---------------------------------------------- | -------- | ------------- |
| `duration`       | `number`                                       | true     | `LENGTH_SHORT`|
| `text`           | `string`                                       | true     | -             |
| `title`          | `string`                                       | false    | -             |
| `icon`           | `string`                                       | false    | -             |
| `action`         | `object`                                       | false    | -             |
| `action.text*`   | `string`                                       | true     | -             |
| `action.icon*`   | `string`                                       | true     | -             |
| `action.onPress` | `function`                                     | true     | -             |

**NOTES**

- when `action` is provided `action.text` or `action.icon` should be provided, but not both at the same time.
