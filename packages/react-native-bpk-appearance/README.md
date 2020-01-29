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

1.  Define the `react-native-bpk-appearance` project in your `settings.gradle` file:

```groovy
    include ':react-native-bpk-appearance'
    project(':react-native-bpk-appearance').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-bpk-appearance/src/android')
```

2.  Add `react-native-bpk-appearance` as a dependency in your app/module `build.gradle` file:

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

After you have installed the lib, import the `RNCAppearancePackage()` in your react application:

```java
import io.expo.appearance.RNCAppearancePackage

....

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNCAppearancePackage()
    );
}
```

### iOS

Add a dependency to your Podfile using the path to the NPM package as follows:

      pod 'ReactNativeDarkMode', path: '../node_modules/react-native-bpk-appearance/node_modules/react-native-dark-mode/ReactNativeDarkMode.podspec'

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
  },
  image: {
    light: {
      borderWidth: 1,
      borderColor: '#d6d7da',
    },
    dark: {
      backgroundColor: 'rgb(205, 205, 215)'
    },
  },
});

const UserProfile = () => {
  const currentStyle = useBpkDynamicStyleSheet(style);
  const image = useBpkDynamicValue({ light: './user-profile-light.png', dark: './user-profile-dark.png' });

  return (
    <View style={currentStyle.view}>
      <BpkImage style={currentStyle.image} source={{ uri: image }} alt="user profile">
    </View>
  );
};
```

For non-functional components use `BpkAppearanceConsumer` or `withBpkAppearance` HOC and the `unpack*` functions. (See full in API section bellow).

### BpkAppearanceConsumer usage

```js
import React, { Component, type Config } from 'react';
import { View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import {
  BpkDynamicStyleSheet,
  unpackBpkDynamicValue,
  BpkAppearanceConsumer,
} from 'react-native-bpk-appearance';
import {
  backgroundDarkColor,
  backgroundLightColor,
} from 'bpk-tokens/tokens/base.react.native';

const style = BpkDynamicStyleSheet.create({
  view: {
    backgroundColor: { light: backgroundLightColor, dark: backgroundDarkColor }
  }
});

type Props = {
  user: Object,
}

const defaultProps = {
  user: { guest: true }
};

class UserProfile extends Component<Props> {
  render() {
    const { user } = this.props;

    return (
      <BpkAppearanceConsumer>
        {({ bpkAppearance }) => {
          const currentStyle = unpackBpkDynamicValue(style, bpkAppearance);
          return (
            <View style={currentStyle.view}>
              <BpkText>{user.name}</BpkText>
            </View>
          )
        }}
      </BpkAppearanceConsumer>
    );
  }
};

export default BpkAppearanceConsumer;
```

### withBpkAppearance usage

```js
import React, { Component, type Config } from 'react';
import { View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import {
  BpkDynamicStyleSheet,
  withBpkAppearance,
  unpackBpkDynamicValue,
  type WithBpkAppearanceInjectedProps,
} from 'react-native-bpk-appearance';
import {
  backgroundDarkColor,
  backgroundLightColor,
} from 'bpk-tokens/tokens/base.react.native';

const style = BpkDynamicStyleSheet.create({
  view: {
    backgroundColor: { light: backgroundLightColor, dark: backgroundDarkColor }
  }
});

type Props = {
  user: Object,
}

const defaultProps = {
  user: { guest: true }
};

class UserProfile extends Component<Props & WithBpkAppearanceInjectedProps> {
  render() {
    const { bpkAppearance, user } = this.props;
    const currentStyle = unpackBpkDynamicValue(style, bpkAppearance);

    return (
      <View style={currentStyle.view}>
        <BpkText>{user.name}</BpkText>
      </View>
    );
  }
};

type ComponentConfig = Config<Props, typeof defaultProps>;
export default withBpkAppearance<ComponentConfig>(UserProfile);
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [useBpkAppearance](#usebpkappearance)
-   [useBpkColorScheme](#usebpkcolorscheme)
-   [useBpkDynamicValue](#usebpkdynamicvalue)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
-   [useBpkDynamicStyle](#usebpkdynamicstyle)
    -   [Parameters](#parameters-1)
    -   [Examples](#examples-1)
-   [useBpkDynamicStyleSheet](#usebpkdynamicstylesheet)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples-2)
-   [BpkAppearanceConsumer](#bpkappearanceconsumer)
    -   [Parameters](#parameters-3)
    -   [Examples](#examples-3)
-   [BpkDynamicStyleSheet](#bpkdynamicstylesheet)
-   [create](#create)
    -   [Parameters](#parameters-4)
    -   [Examples](#examples-4)
-   [withBpkAppearance](#withbpkappearance)
    -   [Parameters](#parameters-5)
    -   [Examples](#examples-5)
-   [isBpkDynamicValue](#isbpkdynamicvalue)
    -   [Parameters](#parameters-6)
-   [unpackBpkDynamicValue](#unpackbpkdynamicvalue)
    -   [Parameters](#parameters-7)
    -   [Examples](#examples-6)
-   [unpackBpkDynamicStyle](#unpackbpkdynamicstyle)
    -   [Parameters](#parameters-8)
    -   [Examples](#examples-7)

### useBpkAppearance

Fetch the current appearance as provided by the nearest [BpkAppearanceProvider]

Returns **BpkAppearancePreferences** the current appearance

### useBpkColorScheme

Fetch the current color scheme as provided by the nearest [BpkAppearanceProvider]

Returns **ColorSchemeName** the current color scheme

### useBpkDynamicValue

Takes in a `BpkDynamicValue` and returns the correct value for the
current color scheme as provided by the nearest [BpkAppearanceProvider]

#### Parameters

-   `value` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** a dynamic value.

#### Examples

```javascript
const color = useBpkDynamicValue({ light: 'black', dark: 'white' })
```

Returns **mixed** the value for the current color scheme.
                 If `value` is not a valid dynamic value it will be returned back

### useBpkDynamicStyle

Takes in a style object and returns the correct value for all properties,
based on the current color scheme as provided by the nearest [BpkAppearanceProvider]

#### Parameters

-   `style` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** the style object

#### Examples

```javascript
const color = useBpkDynamicStyle({
 color: { light: 'black', dark: 'white' },
 flex: 1,
});
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object with mapped properties for the current color scheme

### useBpkDynamicStyleSheet

Takes in a `BpkDynamicStyleSheet` and returns the correct value for
the current color scheme as provided by the nearest [BpkAppearanceProvider]

#### Parameters

-   `style` **BpkDynamicStyle** the dynamic stylesheet

#### Examples

```javascript
const dynamicStyles = BpkDynamicStyleSheet.create({
 color: { light: 'black', dark: 'white' },
 flex: 1,
})
const styles = useBpkDynamicStyleSheet(dynamicStyles);
```

Returns **BpkDynamicStyleProp** the current stylesheet

### BpkAppearanceConsumer

-   **See: <https://reactjs.org/docs/render-props.html>**

A render prop component that provides the current BpkAppearance
as provided by the nearest [BpkAppearanceProvider].

NOTE: This component should mainly be used in class components, for
functional components we recommend using the provided hooks.

#### Parameters

-   `children` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Function that will receive the current appearance and should return a react Node.
    -   `children.children`  

#### Examples

```javascript
<BpkAppearanceConsumer>
  {({ bpkAppearance }) => {
   const logo = unpackDynamicValue({ light: 'light.png', dark: 'dark.png' }, bpkAppearance);
   return <BpkImage style={styles.image} alt="image title" source={{uri: logo}} />
  }}
</BpkAppearanceConsumer>
```

Returns **[Node](https://developer.mozilla.org/docs/Web/API/Node/nextSibling)** a react Node.

### BpkDynamicStyleSheet

### create

Creates a new dynamic stylesheet that transforms all `BpkDynamicValues` into
a plain `StyleSheet` for each color scheme.

This should generally be used in conjunction with `useBpkDynamicStyleSheet` hook.

#### Parameters

-   `obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** a style containing dynamic values

#### Examples

```javascript
BpkDynamicStyleSheet.create({
  view: {
    shadowColor: { light: '#fff', dark: '#ff0' },
  }
});
```

```javascript
BpkDynamicStyleSheet.create({
  view: {
    light: {
      borderWidth: 1,
      borderColor: '#d6d7da',
    },
    dark: {
      backgroundColor: 'rgb(205, 205, 215)'
    },
  }
});
```

Returns **BpkDynamicStyle** an object containing a plain stylesheet for each color scheme.

### withBpkAppearance

This HOC wraps a component and provides the current `BpkAppearancePreferences`
as provided by the nearest `BpkAppearanceProvider`.

NOTE: If you are using a functional component use one of the provided hooks instead.

#### Parameters

-   `Component` **Component** the component to be wrapped

#### Examples

```javascript
import React, { type Config } from 'react';
import { type WithBpkAppearanceInjectedProps, withBpkAppearance } from 'react-native-bpk-appearance';

class MyComponent extends Component<Props & WithBpkAppearanceInjectedProps> {
 render() {
   const { bpkAppearance, ...rest } = this.props;
   ....
 }
}

export default withBpkAppearance<Config<Props, DefaultProps>>(MyComponent);
```

Returns **Component** the wrapped component with an extra `bpkAppearance` prop.

### isBpkDynamicValue

Check if a value is a `BpkDynamicValue`

#### Parameters

-   `value` **mixed** the value to be checked

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if is a `BpkDynamicValue` or false otherwise

### unpackBpkDynamicValue

Takes in a `BpkDynamicValue` and returns the correct value for provided appearance.

#### Parameters

-   `value` **mixed** a dynamic value.
-   `appearance` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** the appearance preferences.

#### Examples

```javascript
const color = unpackBpkDynamicValue({ light: 'black', dark: 'white' }, bpkAppearance)
```

Returns **mixed** the value for the current color scheme.
                 If `value` is not a valid dynamic value it will be returned back

### unpackBpkDynamicStyle

Takes in a style object and returns the correct value for all properties,
based on the current color scheme as provided by the nearest [BpkAppearanceProvider]

#### Parameters

-   `style` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** the style object
-   `appearance` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** the appearance preferences.

#### Examples

```javascript
const style = unpackBpkDynamicStyle(
 {
   color: { light: 'black', dark: 'white' },
   flex: 1,
 },
 appearance
);
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object with mapped properties for the current color scheme
