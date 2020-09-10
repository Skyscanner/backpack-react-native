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

## Markers

In addition to the components `react-native-maps` includes, some Skyscanner-branded components are provided for you to use.

### Price markers

Price markers are used to display pressable prices on a map. They are based on the `Marker` component from `react-native-maps`.

```js
import React from 'react';
import BpkMapView, { BpkPriceMarker, PRICE_MARKER_STATUSES } from 'backpack-react-native/bpk-component-map';


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
      >
        <BpkPriceMarker
          label="£123"
          onPress={() => {
            console.log("Price marker pressed.")
          }}
          latititude={37.78825}
          longitude={-122.4324}
          status={PRICE_MARKER_STATUSES.default}
        />
      </BpkMapView>
    );
  }
}
```

### Icon markers

Icon markers are used to display pressable points of interest on a map using icons. They are based on the `Marker` component from `react-native-maps`.

```js
import React from 'react';
import { icons } from 'bpk-component-icon';
import BpkMapView, { BpkIconMarker, ICON_MARKER_STATUSES } from 'backpack-react-native/bpk-component-map';


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
      >
        <BpkIconsMarker
          icon={icons.landmark}
          onPress={() => {
            console.log("Price marker pressed.")
          }}
          latititude={37.78825}
          longitude={-122.4324}
          status={ICON_MARKER_STATUSES.default}
        />
      </BpkMapView>
    );
  }
}
```

### Props

#### BpkPriceMarker

| Property | PropType | Required | Default Value |
| - | - | - | - |
| label | string | true | - |
| latitude | number | true | - |
| longitude | number | true | - |
| disabled | bool | false | false |
| status | oneOf(`PRICE_MARKER_STATUSES.default`, `PRICE_MARKER_STATUSES.focused`, `PRICE_MARKER_STATUSES.viewed`) | false | `PRICE_MARKER_STATUSES.default` |

#### BpkIconMarker

| Property | PropType | Required | Default Value |
| - | - | - | - |
| icon | string | true | - |
| latitude | number | true | - |
| longitude | number | true | - |
| disabled | bool | false | false |
| status | oneOf(`ICON_MARKER_STATUSES.default`, `ICON_MARKER_STATUSES.focused`) | false | `ICON_MARKER_STATUSES.default` |