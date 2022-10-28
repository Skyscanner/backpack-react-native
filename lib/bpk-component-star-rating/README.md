# bpk-component-star-rating

> Backpack React Native star rating component.

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-star-rating/ios/default.png" alt="bpk-component-star-rating default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-star-rating/ios/default_dm.png" alt="bpk-component-star-rating default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-star-rating/android/default.png" alt="bpk-component-star-rating default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-star-rating/android/default_dm.png" alt="bpk-component-star-rating default Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import StarRating from 'backpack-react-native/bpk-component-star-rating';
import { spacingBase } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

const ratingLabel = (r, m) => `${r} out of ${m} stars`;

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StarRating rating={0} ratingLabel={ratingLabel}/>
        <StarRating rating={5} ratingLabel={ratingLabel}/>
        <StarRating rating={10} maxRating={10} ratingLabel="10 out of 10"/>
      </View >
    );
  }
}
```

## Props

| Property            | PropType                  | Required | Default Value |
| -----------         | ------------------------- | -------- | ------------- |
| ratingLabel         | oneOfType(string, func)   | true     | -             |
| rating              | number                    | false    | 0             |
| maxRating           | number                    | false    | 5             |

## Theme Props

* `starColor`
* `starFilledColor`