# bpk-component-carousel

> Backpack React Native carousel component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-carousel/ios/default.png" alt="bpk-component-carousel default iPhone 8 simulator" width="375" /> | <img src="undefined" alt="bpk-component-carousel default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-carousel/android/default.png" alt="bpk-component-carousel default Google Pixel emulator" width="375" /> | <img src="undefined" alt="bpk-component-carousel default Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { spacingXl } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';
import BpkCarousel, { BpkCarouselItem } from 'backpack-react-native/bpk-component-carousel';
import BpkImage, { withLoadingBehaviour } from 'backpack-react-native/bpk-component-image';

const WithLoadingBpkImage = withLoadingBehaviour(BpkImage);

const styles = StyleSheet.create({
  carousel: {
    width: spacingXl * 10,
    height: spacingXl * 10
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default () => (
  <BpkCarousel
    accessibilityLabel={(page, total) => `${page + 1} of ${total}`}
    style={styles.carousel}
  >
    <BpkCarouselItem>
      <WithLoadingBpkImage
        rounded={false}
        alt="Description of image"
        style={styles.image}
        source={require('./path/to/image.jpg')}
      />
    </BpkCarouselItem>
    <BpkCarouselItem>
      <WithLoadingBpkImage
        rounded={false}
        alt="Description of image"
        style={styles.image}
        source={require('./path/to/image.jpg')}
      />
    </BpkCarouselItem>
  </BpkCarousel>
);
```

## Props

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| accessibilityLabel | oneOfType(string, func)               | true     | -             |
| children           | node                                  | true     | -             |
| showIndicator      | bool                                  | false    | true          |

## BpkCarouselItem props

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| children           | node                                  | true     | -             |
