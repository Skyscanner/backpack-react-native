# bpk-component-rating

> Backpack React Native rating component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/ios/default.png" alt="bpk-component-rating default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/ios/default_dm.png" alt="bpk-component-rating default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/android/default.png" alt="bpk-component-rating default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/android/default_dm.png" alt="bpk-component-rating default Google Pixel emulator - dark mode" width="375" /> |

## Sizes

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/ios/sizes.png" alt="bpk-component-rating sizes iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/ios/sizes_dm.png" alt="bpk-component-rating sizes iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/android/sizes.png" alt="bpk-component-rating sizes Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/android/sizes_dm.png" alt="bpk-component-rating sizes Google Pixel emulator - dark mode" width="375" /> |

## Vertical

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/ios/vertical.png" alt="bpk-component-rating vertical iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/ios/vertical_dm.png" alt="bpk-component-rating vertical iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/android/vertical.png" alt="bpk-component-rating vertical Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-rating/android/vertical_dm.png" alt="bpk-component-rating vertical Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```javascript
import React from 'react';
import { View } from 'react-native';
import BpkRating from 'backpack-react-native/bpk-component-rating';

const ratings = () => (
  <View>
    <BpkRating
      title={['Low title', 'Medium title', 'High title']}
      subtitle={['Low subtitle', 'Medium subtitle', 'High subtitle']}
      value={5}
      orientation="horizontal"
    />
    <BpkRating
      title="One title to rule them all"
      subtitle="One subtitle to rule them all"
      size="lg"
      value={9}
    />
  </View>
)
```

## Props

| Property           | PropType                                | Required | Default Value |
| ------------------ | --------------------------------------- | -------- | ------------- |
| title              | oneOfType(string, arrayOf(string))     | true     | -             |
| subtitle           | oneOfType(string, arrayOf(string))     | true     | -             |
| value              | object                                  | true     | -             |
| orientation        | oneOf('horizontal', 'vertical')         | false    | 'horizontal'  |
| size               | oneOf('xs', 'sm', 'base', 'lg') | false    | 'base'        |

* For `title` and`subtitle` a `string` or `array` is supported. When providing an `array`
you should provide an array with three items, for low, medium and high scores.
