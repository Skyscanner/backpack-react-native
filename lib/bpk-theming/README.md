# bpk-theming

> Backpack React Native theming utilities.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import { View } from 'react-native';
import BpkThemeProvider from 'backpack-react-native/bpk-theming';
import BpkButton from 'backpack-react-native/bpk-component-button';

const theme = {
  buttonPrimaryGradientStartColor: '#fce134',
  buttonPrimaryGradientEndColor: '#f8c42d',
  buttonPrimaryTextColor: '#2d244c',
  buttonSecondaryBackgroundColor: '#fff',
  buttonSecondaryTextColor: '#2d244c',
  buttonSecondaryBorderColor: '#2d244c',
  buttonLinkTextColor: '#fce134',
};

export default class App extends Component {
  render() {
    return (
      <BpkThemeProvider theme={theme}>
        <BpkButton type="primary" title="Book flight" onPress={() => {}} />
        <BpkButton type="secondary" title="Book flight" onPress={() => {}} />
      </BpkThemeProvider>
    );
  }
}
```

## Props

| Property            | PropType  | Required | Default Value |
| -----------         | --------- | -------- | ------------- |
| children            | node      | true     | -             |
| theme               | object    | true     | -             |
