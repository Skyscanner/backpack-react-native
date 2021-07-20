# `BpkThemeAttributes` deprecation

`BpkThemeAttributes` was introduced in 2019 to facilitate Skyscanner's rebrand. It gave components access to style properties that were not available as tokens at the time.

Now the rebrand is complete and all tokens are available from the `@skyscanner/bpk-foundations-react-native` package, `BpkThemeAttributes` is deprecated and will be removed at the end of 2020. **All code using it must be migrated to consume tokens from `@skyscanner/bpk-foundations-react-native`, or it will stop working at the end of 2020.**

## Sample migration

To migrate, remove the `BpkThemeAttributes` wrapper from your components and import tokens from `@skyscanner/bpk-foundations-react-native`.

### Before

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

### After

```
import {
  colorSkyGrayTint02,
  colorSkyBlue,
} from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

const MyComponent = () => (
  <View style={{
    backgroundColor: colorSkyBlue,
    borderColor: colorSkyGrayTint02,
  }} />
);
```

## Token conversions

The token names in `BpkThemeAttributes` and `@skyscanner/bpk-foundations-react-native` are different, so you'll need to change the names you use.

| Name in `BpkThemeAttributes` | Name in `@skyscanner/bpk-foundations-react-native` |
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

There are also a number of [dynamic tokens available](https://backpack.github.io/guidelines/colors) that will automatically change to support both light and dark mode, so your code doesn't need to perform that logic itself. This may be a good opportunity to switch to those instead.
