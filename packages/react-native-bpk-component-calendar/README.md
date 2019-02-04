# react-native-bpk-component-calendar

> Backpack React Native calendar component.

## Installation

```sh
npm install react-native-bpk-component-calendar --save-dev
```

Because this package ships with native code, it is also necessary to add some native dependencies to your RN project:

### Android

Having installed the NPM package, add the following configuration to gradle:

  1. Define the `react-native-bpk-component-calendar` project in your `settings.gradle` file:

```groovy
    include ':react-native-bpk-component-calendar'
    project(':react-native-bpk-component-calendar').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-bpk-component-calendar/src/android')
```

  2. Add `react-native-bpk-component-calendar` as a dependency in your app/module `build.gradle` file:

```groovy
    dependencies {
      implementation project(':react-native-bpk-component-calendar')
    }
```

If you have defined project-wide properties in your root `build.gradle`, this library will detect the presence of the following properties:

```groovy
ext {
    compileSdkVersion   = 28
    targetSdkVersion    = 28
    minSdkVersion       = 21
    buildToolsVersion   = "28.0.3"
}
```

If you haven't or are using the pre compiled version bellow, it will use the values shown above.

#### Pre compiled version

Alternativelly, the pre compiled version is available on Skyscanner's internal artifactory. Make sure you have the `infrastructure-maven` registry configured and are logged in, then add the following dependency to your `build.gradle` file:

```groovy
    dependencies {
      implementation 'net.skyscanner.backpack:react-native-bpk-component-calendar:<version>'
    }
```

**Note:** The version should be the same used for the npm package.


#### Importing the bridge package

After you have installed the lib, import the `CalendarPackage()` in your react application:

```java
import net.skyscanner.backpack.reactnative.calendar.CalendarPackage

....

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new CalendarPackage()
    );
}
```

### iOS

Having installed the NPM package, add the following dependencies to your Podfile:

 - `react-native-bpk-component-calendar`, using a relative path via `node_modules`

For example:
```
  pod 'react-native-bpk-component-calendar', path: '../node_modules/react-native-bpk-component-calendar'
```
## Time Zones

`BpkCalendar` uses dates at the `UTC` midnight boundary exclusively for selected dates and expects that format for `minDate` and `maxDate`. If `BpkCalendar` is used with dates that are **not** `UTC` it will behave in undefined ways and most likely not work.

To create dates to be used with the component we recommend the following

```javascript
// Min date of the calendar at 2019-01-02
const minDate = new Date(Date.UTC(2019, 0, 2));
```

To format the dates for display use

```javascript
const locale = 'en-GB';
const formatter = new Intl.DateTimeFormat(locale, { timeZone: 'UTC' });

const formattedDate = formatter.format(date);
```

## Usage


```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkCalendar, { SELECTION_TYPES } from 'react-native-bpk-component-calendar';

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
      selectionType={SELECTION_TYPES.single}
      selectedDates={[new Date()]}
      onChangeSelectedDates={newDates => {
        console.warn("Date selection changed");
      }}
    />
  </View>
);
```

## Props

### BpkCalendar

| Property                | PropType               | Required   | Default Value          |
| ----------------------- | ---------------------- | ---------- | ---------------------- |
| locale                  | string                 | true       | -                      |
| maxDate                 | Date                   | false      | null                   |
| minDate                 | Date                   | false      | null                   |
| onChangeSelectedDates   | function               | false      | null                   |
| selectedDates           | Array(Date)            | false      | null                   |
| selectionType           | oneOf(SELECTION_TYPES) | false      | SELECTION_TYPES.single |

#### locale

TODO explain locale

#### selectedDates

* When `selectionType` is `SELECTION_TYPES.single`, you should only include zero or one entries in the `selectedDates` array.
* When `selectionType` is `SELECTION_TYPES.range`, you should only include zero, one or two entries in the `selectedDates` array.
