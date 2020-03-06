# bpk-component-map

> Backpack React Native map component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack-react-native#usage) for a complete installation guide.

## Usage

`bpk-component-map` is a thin wrapper around `react-native-maps`. It exports all the same components and values as `react-native-maps` so you should read their [documentation](https://github.com/react-community/react-native-maps).

```js
import React from 'react';
import BpkMapView from 'backpack-react-native/bpk-component-map';


export default class App extends Component {
  render() {
    return (
      <BpkMapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
```
