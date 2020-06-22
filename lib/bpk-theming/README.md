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

## `BpkThemeAttributes` deprecation

`BpkThemeAttributes` was introduced in 2019 to facilitate Skyscanner's rebrand. It gave components access to style properties that were not available as tokens at the time.

Now the rebrand is complete and all tokens are available from the `bpk-tokens` package, `BpkThemeAttributes` is deprecated and will be removed at the end of 2020. **All code using it must be migrated to consume tokens from `bpk-tokens`, or it will stop working at the end of 2020.**

### Sample migration

To migrate, remove the `BpkThemeAttributes` wrapper from your components and import tokens from `bpk-tokens`.

#### Before

```
const MyComponent = () => (
  <BpkThemeAttributes>
    {({
      primaryColor,
      colorGray500,
    }) => (
      <View style={{
        backgroundColor: primaryColor,
        borderColor: colorGray500,
      }} />
    )}
  </BpkThemeAttributes>
);
```

#### After

```
import {
  colorSkyGrayTint02,
  colorSkyBlue,
} from 'bpk-tokens/tokens/base.react.native';

const MyComponent = () => (
  <View style={{
    backgroundColor: colorSkyBlue,
    borderColor: colorSkyGrayTint02,
  }} />
);
```

### Token conversions

The token names in `BpkThemeAttributes` and `bpk-tokens` are different, so you'll need to change the names you use.

| Name in `BpkThemeAttributes` | Name in `bpk-tokens` |
|-|-|
| `colorGray50` | `colorSkyGrayTint07` |
| `colorGray100` | `colorSkyGrayTint06` |
| `colorGray200` | `colorSkyGrayTint05` |
| `colorGray300` | `colorSkyGrayTint04` |
| `colorGray400` | `colorSkyGrayTint03` |
| `colorGray500` | `colorSkyGrayTint02` |
| `colorGray700` | `colorSkyGrayTint01` |
| `colorGray900` | `colorSkyGray` |
| `primaryColor` | `colorSkyBlue` |
| `textFontFamily` | `fontFamily` |
