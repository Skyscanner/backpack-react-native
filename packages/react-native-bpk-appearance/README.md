# react-native-bpk-appearance

> Backpack React Native appearance.

## Installation

```sh
npm install react-native-bpk-appearance --save-dev
```

Because this package ships with native code, it is also necessary to add some native dependencies to your RN project:

### Android

Append `|uiMode` to the `android:configChanges` prop of `<activity>` in `AndroidManifest.xml`. Example:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode">
```

Add the following configurations to gradle:

  1. Define the `react-native-bpk-appearance` project in your `settings.gradle` file:

```groovy
    include ':react-native-bpk-appearance'
    project(':react-native-bpk-appearance').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-bpk-appearance/src/android')
```

  2. Add `react-native-bpk-appearance` as a dependency in your app/module `build.gradle` file:

```groovy
    dependencies {
      implementation project(':react-native-bpk-appearance')
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

Alternatively, the pre compiled version is available on Skyscanner's internal Artifactory. Make sure you have the `infrastructure-maven` registry configured and are logged in, then add the following dependency to your `build.gradle` file:

```groovy
    dependencies {
      implementation 'net.skyscanner.backpack:react-native-bpk-appearance:<version>'
    }
```

**Note:** The version should be the same used for the npm package.


#### Importing the bridge package

After you have installed the lib, import the `DialogPackage()` in your react application:

```java
import com.codemotionapps.reactnativedarkmode.DarkModePackage

....

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new DarkModePackage()
    );
}
```

### iOS

Add a dependency to your Podfile using the path to the NPM package as follows:

```
  pod 'ReactNativeDarkMode', path: '../node_modules/react-native-bpk-appearance/node_modules/react-native-dark-mode/ReactNativeDarkMode.podspec'
```

## Usage

First wrap your app with BpkAppearanceProvider

```js
import {
  useBpkDynamicValue,
} from 'react-native-bpk-appearance';

const App = ({ children }) => (
  <BpkAppearanceProvider>
    <App>
      {children}
    </App>
  </BpkAppearanceProvider>
);
```

Now you can use the provided hooks to react to changes in the system appearance

```js
import React from 'react';
import { View } from 'react-native';
import BpkImage from 'react-native-bpk-component-image';
import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
  useBpkDynamicValue,
} from 'react-native-bpk-appearance';
import {
  backgroundDarkColor,
  backgroundLightColor,
} from 'bpk-tokens/tokens/base.react.native';

const style = BpkDynamicStyleSheet.create({
  view: {
    backgroundColor: { light: backgroundLightColor, dark: backgroundDarkColor }
  }
})

const UserProfile = () => {
  const currentStyle = useBpkDynamicStyleSheet(style);
  const image = useBpkDynamicValue({ light: './user-profile-light.png', dark: './user-profile-dark.png' });

  return (
    <View style={currentStyle.view}>
      <BpkImage source={{ uri: image }} alt="user profile">
    </View>
  );
};
```

## BpkAppearance

Module to access to the current appearance and the ability to set/listen to changes.

### Methods

- `get() => BpkAppearancePreferences`
  Returns the current appearance preferences. `{ colorScheme: 'light' | 'dark' }`

- `set(preferences: BpkAppearancePreferences) => void`
  Update the current appearance preferences

- `addChangeListener((preferences: BpkAppearancePreferences) => void) => void`
  Add a change listener

- `remveChangeListener((preferences: BpkAppearancePreferences) => void) => void`
  Remove a change listener

## BpkAppearanceProvider

React component that provides access, and react to changes, to `BpkAppearance`.

## BpkDynamicStyleSheet

Extension to react's `StyleSheet` module that provides the ability to use semantic colours (`{ light, dark }`) for colour props.

### Methods

- `create(style: Object): => { light: Object, dark: Object }`
  Creates a new dynamic style with the correct variation for light and dark mode.

## Hooks

- `useBpkAppearance() => BpkAppearancePreferences`
  Returns the current appearance.

- `useBpkColorScheme() => 'light' | 'dark'`
  Returns the current color scheme.

- `useBpkDynamicValue<T>(value: { light: T, dark: T }) => T`
  Returns the appropriate value for the current color scheme.

- `useBpkDynamicStyle<T>(value: Object) => Object`
  Map all dynamic props to the their current value.

- `useBpkDynamicStyleSheet(style: { light: Object, dark: Object }) => Object`
  Returns the appropriate style for the current color scheme.
