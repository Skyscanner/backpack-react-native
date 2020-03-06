# bpk-component-animate-height

> Backpack React Native animate height component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkText from 'backpack-react-native/bpk-component-text';
import BpkButton from 'backpack-react-native/bpk-component-button';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkAnimateHeight from 'backpack-react-native/bpk-component-animate-height';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  animateHeight: {
    marginBottom: spacingBase,
  }
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
    };

  }

  onToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <View style={styles.container}>
        <BpkAnimateHeight
          expanded={this.state.expanded}
          style={styles.animateHeight}
        >
          <BpkText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>
        </BpkAnimateHeight>
        <BpkButton title="Toggle" onPress={this.onToggle} />
      </View>
    );
  }
}
```

## Props

| Property          | PropType | Required | Default Value |
| ----------------- | -------- | -------- | ------------- |
| children          | Node     | Yes      | -             |
| expanded          | bool     | Yes      | -             |
| animationDuration | number   | No       | 400           |
| expandDelay       | number   | No       | 0             |
| collapseDelay     | number   | No       | 0             |
