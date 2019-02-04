# react-native-bpk-component-calendar

> Backpack React Native calendar component.

## Installation

```sh
npm install react-native-bpk-component-calendar --save-dev
```

Because this package ships with native code, it is also necessary to add some native dependencies to your RN project:

### Android

Add the following configurations to gradle:

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

Add a dependency to your Podfile using the path to the NPM package as follows:

```
  pod 'react-native-bpk-component-calendar', path: '../node_modules/react-native-bpk-component-calendar'
```

Note that the `react-native-bpk-component-calendar` depends on [Backpack](https://cocoapods.org/pods/Backpack). If your Podfile also depends on this directly, both dependencies must be for compatible semver versions.

## Time Zones

`BpkCalendar` uses dates at the `UTC` midnight boundary exclusively for selected dates and expects that format for `minDate` and `maxDate`. If `BpkCalendar` is used with dates that are **not** `UTC` it will behave in undefined ways and most likely not work.

To create dates to be used with the component we recommend the following

```javascript
// Min date of the calendar at 2019-01-02
const minDate = new Date(Date.UTC(2019, 0, 2));

// Dates can also be provided as timestamps
const minDate = Date.UTC(2019, 0, 2);
```

To format the dates for display use

```javascript
const locale = 'en-gb';
const formattedDate = date.toLocaleDateString(locale, { timeZone: 'UTC' });
```

## Usage


```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkCalendar, { SELECTION_TYPES } from 'react-native-bpk-component-calendar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedDates: [] };
  }

  handleNewDates = newDates => {
    this.setState({
      selectedDates: newDates,
    });
  };

  render() {
    const { selectionType, onChangeSelectedDates, ...rest } = this.props;
    return (
      <BpkCalendar
        locale={'en-gb'}
        selectionType={SELECTION_TYPES.range}
        selectedDates={this.state.selectedDates}
        onChangeSelectedDates={this.handleNewDates}
        minDate={Date.UTC(2019, 0, 2)}
        maxDate={Date.UTC(2019, 11, 31)}
      />
    );
  }
}
```

## Props

### BpkCalendar

| Property                | PropType               | Required   | Default Value          |
| ----------------------- | ---------------------- | ---------- | ---------------------- |
| locale                  | string                 | true       | -                      |
| maxDate                 | oneOf(Date, number)    | false      | today + 1 year         |
| minDate                 | oneOf(Date, number)    | false      | today                  |
| onChangeSelectedDates   | function               | false      | null                   |
| selectedDates           | arrayOf(Date, number)  | false      | []                     |
| selectionType           | oneOf(SELECTION_TYPES) | false      | SELECTION_TYPES.single |

#### selectedDates

* When `selectionType` is `SELECTION_TYPES.single`, you should only include zero or one entries in the `selectedDates` array.
* When `selectionType` is `SELECTION_TYPES.range`, you should only include zero, one or two entries in the `selectedDates` array.
