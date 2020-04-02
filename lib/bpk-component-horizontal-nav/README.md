# bpk-component-horizontal-nav

> Backpack React Native horizontal navigation component.

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
