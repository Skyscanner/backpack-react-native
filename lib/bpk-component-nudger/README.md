# bpk-component-nudger

> Backpack React Native nudger component.

## Default

| Day | Night |
| --- | --- |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-nudger/ios/default.png" alt="bpk-component-nudger default iPhone 8 simulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-nudger/ios/default_dm.png" alt="bpk-component-nudger default iPhone 8 simulator - dark mode" width="375" /> |
| <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-nudger/android/default.png" alt="bpk-component-nudger default Google Pixel emulator" width="375" /> | <img src="https://raw.githubusercontent.com/Skyscanner/backpack-react-native/main/screenshots/bpk-component-nudger/android/default_dm.png" alt="bpk-component-nudger default Google Pixel emulator - dark mode" width="375" /> |

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkNudger from 'backpack-react-native/bpk-component-nudger';

export default class App extends Component {
 constructor() {
    super();
    this.state = { value: 1 };
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    return (
      <BpkNudger
        min={1}
        max={10}
        value={this.state.value}
        onChange={this.handleChange}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />
    );
  }
}
```

## Props

| Property              | PropType                              | Required | Default Value |
| --------------------- | ------------------------------------- | -------- | ------------- |
| decreaseButtonLabel   | string                                | true     | -             |
| increaseButtonLabel   | string                                | true     | -             |
| max                   | number                                | true     | -             |
| min                   | number                                | true     | -             |
| onChange              | func                                  | true     | -             |
| value                 | number                                | true     | -             |
| theme                 | See [Theme Props](#theme-props) below | false    | null          |

## Theme Props

Same as [secondary button](/components/native/button#theme-props).
