# bpk-component-picker

> Backpack React Native picker component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-picker/ios/default.png" alt="bpk-component-picker default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-picker/ios/default_dm.png" alt="bpk-component-picker default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-picker/android/default.png" alt="bpk-component-picker default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-picker/android/default_dm.png" alt="bpk-component-picker default Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkPicker, { BpkPickerItem } from 'backpack-react-native/bpk-component-picker';
import BpkSelect from 'backpack-react-native/bpk-component-select';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

const AIRPORTS = [
  {
    value: '1',
    label: 'Charles De Gaulle',
  },
  {
    value: '2',
    label: 'Paris Orly',
  },
  {
    value: '3',
    label: 'Beauvais-Tillé',
  },
];

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      value: null,
      isOpen: false,
    };

  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  }

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  }

  setValue = (value) => {
    this.setState({value});
  }

  render() {
    return (
      <View style={styles.container}>
        <BpkSelect
          onPress={this.onOpen}
          label={this.state.value || 'Choose an airport'}
        />
        <BpkPicker
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          selectedValue={this.state.value}
          onValueChange={this.setValue}
          doneLabel="Done"
        >
          <BpkPickerItem label="Choose an airport" />
          { AIRPORTS.map(({value, label}) => (
            <BpkPickerItem value={value} label={label} />
          ))}
        </BpkPicker>
    );
  }
}
```

## Props

### BpkPicker

| Property             | PropType                              | Required | Default Value |
| -----------          | ------------------------------------- | -------- | ------------- |
| children             | node                                  | true     | -             |
| doneLabel (iOS only) | string                                | true     | -             |
| onClose              | func                                  | true     | -             |
| onValueChange        | func                                  | true     | -             |
| isOpen               | bool                                  | false    | false         |
| selectedValue        | oneOfType(string, number)             | false    | null          |
| onShow               | func                                  | false    | -             |
| pickerContentRef     | React.Ref                             | false    | null          |

### BpkPickerItem

| Property             | PropType                              | Required | Default Value |
| -----------          | ------------------------------------- | -------- | ------------- |
| label                | string                                | true     | -             |
| value                | oneOfType(string, number)             | false    | null          |
