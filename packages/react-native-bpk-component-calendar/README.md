# react-native-bpk-component-calendar

> Backpack React Native calendar component.

## Installation

```sh
npm install react-native-bpk-component-calendar --save-dev
```

Because this package ships with native code, it is also necessary to add some native dependencies to your RN project:

### Android
TODO - NEED TO WRITE THIS BIT

### iOS
Having installed the NPM package, you need to add the following dependencies to your Podfile:
 - `Backpack` [cocoapod](https://cocoapods.org/pods/Backpack)
 - `react-native-bpk-component-calendar`, using a relative path via `node_modules`

For example:
```
  pod 'Backpack'
  pod 'react-native-bpk-component-calendar', path: '../node_modules/react-native-bpk-component-calendar'
```

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkCalendar from 'react-native-bpk-component-calendar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
});

export default () => (
  <View style={styles.container}>
    <BpkCalendar
      minDate={new Date()}
      maxDate={new Date()}
      selectionType="single"
      selectedDates={[new Date()]}
      onDatesSelected={newDates => {
        console.warn("Date selection changed");
      }}
    />
  </View>
);
```

## Props

### BpkCalendar

| Property                | PropType       | Required   | Default Value    |
| ----------------------- | -------------- | ---------- | ---------------- |
| maxDate                 | Date           | false      | new Date() + 1yr |
| minDate                 | Date           | false      | new Date()       |
| selectedDates           | Array(Date)    | false      | []               |
| onDateSelectionChanged  | function       | false      | null             |

