# bpk-component-dialog

> Backpack React Native dialog dialog.

## Simple

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/ios/simple.png" alt="bpk-component-dialog simple iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/ios/simple_dm.png" alt="bpk-component-dialog simple iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/android/simple.png" alt="bpk-component-dialog simple Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/android/simple_dm.png" alt="bpk-component-dialog simple Google Pixel emulator - dark mode" width="375" /> |

## Multiple CTAs

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/ios/option.png" alt="bpk-component-dialog option iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/ios/option_dm.png" alt="bpk-component-dialog option iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/android/option.png" alt="bpk-component-dialog option Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/android/option_dm.png" alt="bpk-component-dialog option Google Pixel emulator - dark mode" width="375" /> |

## Bottom

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/ios/bottom.png" alt="bpk-component-dialog bottom iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/ios/bottom_dm.png" alt="bpk-component-dialog bottom iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/android/bottom.png" alt="bpk-component-dialog bottom Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-dialog/android/bottom_dm.png" alt="bpk-component-dialog bottom Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage


```js
import React, { Component } from 'react';
import { View } from 'react-native';
import BpkButton from 'backpack-react-native/bpk-component-button';
import { icons } from 'backpack-react-native/bpk-component-icon';
import BpkDialog, { DIALOG_TYPE, BUTTON_TYPE } from 'backpack-react-native/bpk-component-dialog';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  openDialog = () => this.setState({ isOpen: true });

  handlePositiveAction = () => {
    // Do something
    this.setState({
      isOpen: false,
    });
  };

  handleNegativeAction = () => {
    // Do something else
    this.setState({
      isOpen: false,
    });
  };

  handleDismissAction = () => {
    // Do something else
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      <View>
        <BpkButton onPress={this.openDialog} title="Show dialog" />
        <BpkDialog
          dialogType={DIALOG_TYPE.alert}
          title={'Backpack Dialog'}
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
          icon={{
            iconId: icons.tick,
            iconColor: 'monteverde'
          }}
          actions={[
            {
              text: 'Accept',
              type: BUTTON_TYPE.primary,
              callback: this.handlePositiveAction
            },
            {
              text: 'Decline',
              type: BUTTON_TYPE.destructive,
              callback: this.handleNegativeAction
            }
          ]}
          scrimAction={{
            enabled: true,
            callback: this.handleDismissAction
          }}
          isOpen={this.state.isOpen}
        />
      </View>
    );
  }
}
```

## Props

### BpkDialog

| Property    | PropType                                       | Required | Default Value |
| ----------- | ---------------------------------------------- | -------- | ------------- |
| dialogType  | `DIALOG_TYPE`                                  | true     | -             |
| title       | `string`                                       | false    | -             |
| description | `string`                                       | false    | -             |
| icon        | `struct: { iconId: string, iconColor: string}` | true     | -             |
| action      | `array<action_type>`*                          | false    | -             |
| scrimAction | `struct: { enabled: boolean, callback: func}`  | false    | -             |
| isOpen      | `boolean`                                      | true     | -             |

 \* `action_type` has the following structure: `{ text: stirng, type: BUTTON_TYPE, callback: func }`
