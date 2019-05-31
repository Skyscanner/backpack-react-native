# react-native-bpk-component-dialog

> Backpack React Native dialog dialog.

## Installation

```sh
npm install react-native-bpk-component-dialog --save-dev
```

Because this package ships with native code, it is also necessary to add some native dependencies to your RN project:

### Android

Add the following configurations to gradle:

  1. Define the `react-native-bpk-component-dialog` project in your `settings.gradle` file:

```groovy
    include ':react-native-bpk-component-dialog'
    project(':react-native-bpk-component-dialog').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-bpk-component-dialog/src/android')
```

  2. Add `react-native-bpk-component-dialog` as a dependency in your app/module `build.gradle` file:

```groovy
    dependencies {
      implementation project(':react-native-bpk-component-dialog')
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
      implementation 'net.skyscanner.backpack:react-native-bpk-component-dialog:<version>'
    }
```

**Note:** The version should be the same used for the npm package.


#### Importing the bridge package

After you have installed the lib, import the `DialogPackage()` in your react application:

```java
import net.skyscanner.backpack.reactnative.dialog.DialogPackage

....

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new DialogPackage()
    );
}
```

### iOS

Add a dependency to your Podfile using the path to the NPM package as follows:

```
  pod 'react-native-bpk-component-dialog', path: '../node_modules/react-native-bpk-component-dialog'
```

Note that the `react-native-bpk-component-dialog` depends on [Backpack](https://cocoapods.org/pods/Backpack). If your Podfile also depends on this directly, both dependencies must be for compatible semver versions.

## Usage


```js
import React, { Component } from 'react';
import { View } from 'react-native';
import BpkButton from 'react-native-bpk-component-button';
import BpkDialog, { DIALOG_TYPE, BUTTON_TYPE } from 'react-native-bpk-component-dialog';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }
  
  openDialog = () => this.setState({ isOpen: true });

  handlePositiveAction = () => {
    // Do something
    this.setState({
      isOpen: false,
    });
  };
  
  handleNegativeAction = () => {
    // Do something else
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      <View>
        <BpkButton onPress={this.openDialog} title="Show dialog" />
        <BpkDialog
          dialogType={DIALOG_TYPE.alert}
          title={'Backpack Dialog'}
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
          icon={{
            iconId: 'bpk_tick',
            iconColor: 'bpkGreen500',
          }}
          actions={[
            {
              text: 'Accept',
              type: BUTTON_TYPE.primary,
              callback: this.handlePositiveAction
            },
            {
              text: 'Decline',
              type: BUTTON_TYPE.destructive,
              callback: this.handleNegativeAction
            }
          ]}
          scrimAction={{
            enabled: true,
            callback: this.handleNegativeAction
          }}
          isOpen={this.state.isOpen}
        />
      </View>
    );
  }
}
```

## Props

### BpkDialog

| Property    | PropType                                       | Required | Default Value |
| ----------- | ---------------------------------------------- | -------- | ------------- |
| dialogType  | `DIALOG_TYPE`                                  | true     | -             |
| title       | `string`                                       | false    | -             |
| description | `string`                                       | false    | -             |
| icon        | `struct: { iconId: string, iconColor: string}` | true     | -             |
| action      | `array<action_type>`*                          | false    | -             |
| scrimAction | `struct: { enabled: boolean, callback: func}`  | false    | -             |
| isOpen      | `boolean`                                      | true     | -             |

 \* `action_type` has the following structure: `{ text: stirng, type: BUTTON_TYPE, callback: func }`
