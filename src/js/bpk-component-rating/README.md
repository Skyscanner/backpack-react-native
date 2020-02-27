# react-native-bpk-component-rating

> Backpack React Native rating component.

## Installation

```sh
npm install react-native-bpk-component-rating --save
```

Because this package ships with native code, it is also necessary to add some native dependencies to your RN project:

### Android

Add the following configurations to gradle:

  1. Define the `react-native-bpk-component-rating` project in your `settings.gradle` file:

```groovy
    include ':react-native-bpk-component-rating'
    project(':react-native-bpk-component-rating').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-bpk-component-rating/src/android')
```

  2. Add `react-native-bpk-component-rating` as a dependency in your app/module `build.gradle` file:

```groovy
    dependencies {
      implementation project(':react-native-bpk-component-rating')
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

#### Pre-compiled version

Alternatively, the pre-compiled version is available on Skyscanner's internal Artifactory. Make sure you have the `infrastructure-maven` registry configured and are logged in, then add the following dependency to your `build.gradle` file:

```groovy
    dependencies {
      implementation 'net.skyscanner.backpack:react-native-bpk-component-rating:<version>'
    }
```

**Note:** The version should be the same used for the npm package.


#### Importing the bridge package

After you have installed the lib, import the `BpkRatingPackage()` in your React application:

```java
import net.skyscanner.backpack.reactnative.rating.BpkRatingPackage

....

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new BpkRatingPackage()
    );
}
```

### iOS

Add a dependency to your Podfile using the path to the NPM package as follows:

```
  pod 'react-native-bpk-component-rating', path: '../node_modules/react-native-bpk-component-rating'
```

Note that the `react-native-bpk-component-rating` depends on [Backpack](https://cocoapods.org/pods/Backpack). If your Podfile also depends on this directly, both dependencies must be for compatible semver versions.

## Usage

```javascript
import React from 'react';
import { View } from 'react-native';
import BpkRating from 'react-native-bpk-component-rating';

const ratings = () => (
  <View>
    <BpkRating
      title={['Low title', 'Medium title', 'High title']}
      subtitle={['Low subtitle', 'Medium subtitle', 'High subtitle']}
      value={5}
      orientation="horizontal"
    />
    <BpkRating
      title="One title to rule them all"
      subtitle="One subtitle to rule them all"
      size="lg"
      value={9}
    />
  </View>
)
```

## Props

| Property           | PropType                                | Required | Default Value |
| ------------------ | --------------------------------------- | -------- | ------------- |
| title              | oneOfType(string, arrayOf(string))     | true     | -             |
| subtitle           | oneOfType(string, arrayOf(string))     | true     | -             |
| value              | object                                  | true     | -             |
| orientation        | oneOf('horizontal', 'vertical')         | false    | 'horizontal'  |
| size               | oneOf('xs', 'sm', 'base', 'lg') | false    | 'base'        |

* For `title` and`subtitle` a `string` or `array` is supported. When providing an `array`
you should provide an array with three items, for low, medium and high scores.
