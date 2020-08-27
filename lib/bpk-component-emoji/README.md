# bpk-component-badge

> Backpack React Native emoji component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

Ensure that all emoji are wrapped in `BpkEmoji` so that they do not affect the line-height of the surrounding text.

```js
import React from 'react';
import BpkText from 'backpack-react-native/bpk-component-text';
import BpkEmoji from 'backpack-react-native/bpk-component-emoji';

export default class App extends Component {
  render() {
    return (
      <BpkText>
        You did it <BpkEmoji>🎉</BpkEmoji>
      </BpkText>
    );
  }
}
```
