# bpk-component-horizontal-nav

> Backpack React Native horizontal navigation component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/ios/default.png" alt="bpk-component-horizontal-nav default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/ios/default_dm.png" alt="bpk-component-horizontal-nav default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/android/default.png" alt="bpk-component-horizontal-nav default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/android/default_dm.png" alt="bpk-component-horizontal-nav default Google Pixel emulator - dark mode" width="375" /> |

## Small

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/ios/small.png" alt="bpk-component-horizontal-nav small iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/ios/small_dm.png" alt="bpk-component-horizontal-nav small iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/android/small.png" alt="bpk-component-horizontal-nav small Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/android/small_dm.png" alt="bpk-component-horizontal-nav small Google Pixel emulator - dark mode" width="375" /> |

## Space around

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/ios/space-around.png" alt="bpk-component-horizontal-nav space-around iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/ios/space-around_dm.png" alt="bpk-component-horizontal-nav space-around iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/android/space-around.png" alt="bpk-component-horizontal-nav space-around Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-horizontal-nav/android/space-around_dm.png" alt="bpk-component-horizontal-nav space-around Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'backpack-react-native/bpk-component-horizontal-nav';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedId: 'flights',
    };
  }

  render() {
    return (
      <BpkHorizontalNav selectedId={this.state.selectedId}>
        <BpkHorizontalNavItem
          id="flights"
          title="Flights"
          onPress={() => {
            this.setState({ selectedId: 'flights' });
          }}
        />
        <BpkHorizontalNavItem
          id="hotels"
          title="Hotels"
          onPress={() => {
            this.setState({ selectedId: 'hotels' });
          }}
        />
        <BpkHorizontalNavItem
          id="car-hire"
          title="Car hire"
          onPress={() => {
            this.setState({ selectedId: 'car-hire' });
          }}
        />
      </BpkHorizontalNav>
    );
  }
};
```

## Props

### BpkHorizontalNav

| Property               | PropType                                                    | Required | Default Value |
| -----------            | ----------------------------------------------------------- | -------- | ------------- |
| children               | node                                                        | true     | -             |
| selectedId             | string (matching `id` prop of `BpkHorizontalNavItem` child) | true     | -             |
| selectedIndicatorStyle | style object                                                | false    | null          |
| spaceAround            | bool                                                        | false    | false         |

#### `selectedIndicatorStyle`

Styles to apply to the indicator placed below the selected nav item.

### BpkHorizontalNavItem

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| id                  | string                                | true     | -             |
| onPress             | func                                  | true     | -             |
| title               | string                                | true     | -             |
| accessibilityLabel  | string                                | false    | props.title   |
| disabled            | bool                                  | false    | false         |
| small               | bool                                  | false    | false         |
| textStyle           | style object                          | false    | null          |
| theme               | See [Theme Props](#theme-props) below | false    | null          |

#### `textStyle`

Styles to apply to the `BpkText` component inside the nav item.


## Theme Props

### BpkHorizontalNav

* `horizontalNavSelectedTextColor`

### BpkHorizontalNavItem

* `horizontalNavSelectedTextColor`
