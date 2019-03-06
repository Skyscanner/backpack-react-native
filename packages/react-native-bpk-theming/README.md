# react-native-bpk-theming

> Backpack React Native theming utilities.

## Installation

```sh
npm install react-native-bpk-theming --save-dev
```

## Usage

```js
import { Component } from 'react';
import { View } from 'react-native';
import BpkThemeProvider, { BpkThemeAttributes } from 'react-native-bpk-theming';
import BpkButton from 'react-native-bpk-component-button';

const theme = {
  buttonPrimaryGradientStartColor: '#fce134',
  buttonPrimaryGradientEndColor: '#f8c42d',
  buttonPrimaryTextColor: '#2d244c',
  buttonSecondaryBackgroundColor: '#fff',
  buttonSecondaryTextColor: '#2d244c',
  buttonSecondaryBorderColor: '#2d244c',
  buttonLinkTextColor: '#fce134',
  primaryColor: '#fce134',
};

const Color = () => (
  <BpkThemeAttributes>
    {({ primaryColor }) => <View style={{ backgroundColor: primaryColor }} />}
  </BpkThemeAttributes>
);

export default class App extends Component {
  render() {
    return (
      <BpkThemeProvider theme={theme}>
        <BpkButton type="primary" title="Book flight" onPress={() => {}} />
        <BpkButton type="secondary" title="Book flight" onPress={() => {}} />
        <Color />
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
