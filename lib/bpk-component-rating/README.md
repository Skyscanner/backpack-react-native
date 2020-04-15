# bpk-component-rating

> Backpack React Native rating component.

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
