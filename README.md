# Backpack Design System for React Native

> Backpack is a collection of design resources, reusable components and guidelines for creating Skyscanner's products.

[![Android Actions Build Status](https://github.com/Skyscanner/backpack-react-native/workflows/Android%20CI/badge.svg)](https://github.com/Skyscanner/backpack-react-native/actions)
[![iOS Actions Build Status](https://github.com/Skyscanner/backpack-react-native/workflows/iOS%20CI/badge.svg)](https://github.com/Skyscanner/backpack-react-native/actions)


## Quick links

- [Documentation](https://backpack.github.io/)
- [Changelog](./CHANGELOG.md)

## Usage

### Installation

```sh
npm install backpack-react-native --save
```

<details>
  <summary>Android</summary>

  #### From source

  Our Android code is written in `Kotlin`, so in order to compile it from source you need to have `org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"` in the `classpath`.

  Add the following your root `build.gradle` file:

  ```groovy
  buildscript {
    ext.kotlin_version = '1.3.21'
    dependencies {
      classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
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

  1. Define the `backpack-react-native` project in your `settings.gradle` file:

  ```groovy
    include ':backpack-react-native'
    project(':backpack-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/backpack-react-native/android')
  ```

  2. Add `bpk-appearance` as a dependency in your app/module `build.gradle` file:

  ```groovy
      dependencies {
        implementation project(':backpack-react-native')
      }
  ```

  #### Pre compiled

  Alternatively, the pre compiled version is available on Skyscanner's internal Artifactory.

  ```groovy
      dependencies {
        implementation 'net.skyscanner.backpack:bpk-appearance:<version>'
      }
  ```

</details>

<details>
  <summary>iOS</summary>

  #### From source

  Add the following dependencies to your Podfile using the path to the NPM package as follows:

  ```ruby
    pod 'BackpackReactNative', path: '../node_modules/backpack-react-native/ios/BackpackReactNative'
    pod 'ReactNativeDarkMode', path: '../node_modules/react-native-dark-mode/ReactNativeDarkMode.podspec'
    pod 'BVLinearGradient', :path => '../node_modules/react-native-linear-gradient'
  ```

</details>

#### Third party libs

This package depends on [`react-native-maps`](https://github.com/react-community/react-native-maps) and its native components need to be integrated manually by following their [instructions](https://github.com/react-community/react-native-maps/blob/master/docs/installation.md).

### Configuration

<details>
  <summary>Android</summary>

  1. Add the native packages to the `getPackages` function in your `MainActiviy`.
  ```kotlin
  override fun getPackages(): List<ReactPackage> {
    return Arrays.asList(
          MainReactPackage(),
          ...
          MapsPackage(),
          LinearGradientPackage(),
          CalendarPackage(),
          DialogPackage(),
          BpkRatingPackage(),
          DarkModePackage(),
          BpkSnackbarPackage())
  }
  ```

  2. Append `|uiMode` to the `android:configChanges` prop of `<activity>` in `AndroidManifest.xml`. Example:

  ```xml
  <activity
      android:name=".MainActivity"
      android:exported="true"
      android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode">
  ```

  This ensures the RN code will react to system-wide changes to the current appearance.

  #### Icons

  This method has the advantage of fonts being copied from this module at build time so that the fonts and JS are always in sync, making upgrades painless.

  Edit `android/app/build.gradle` ( NOT `android/build.gradle` ) and add the following:

  ```
  apply from: "node_modules/backpack-react-native/bpk-component-icon/fonts.gradle"
  ```
</details>

<details>
  <summary>iOS</summary>

  #### Icons

  The most reliable way to install the file on iOS is manually, three simple steps are required:
  1. update the `Info.plist` file by adding
      ```
      <key>UIAppFonts</key>
        <array>
          <string>BpkIcon.ttf</string>
        </array>
      ```
      if the entry `UIAppFonts` is already there, just add `<string>BpkIcon.ttf</string>` inside the `<array>` like so
      ```
      <array>
          ... existing entries
          <string>BpkIcon.ttf</string>
        </array>
      ```
  2. In the `Build Phases` of your project, in the section `Copy Bundle Resources` add a reference to the `BpkIcon.ttf` file path like `/path/to/node_modules/bpk-svgs/dist/font/BpkIcon.ttf`

  3. Rebuild the app

</details>


## Contributing

To contribute please see [contributing.md](CONTRIBUTING.md).

## List of packages

- [bpk-appearance](/lib/bpk-appearance)
- [bpk-component-alert](/lib/bpk-component-alert)
- [bpk-component-animate-height](/lib/bpk-component-animate-height)
- [bpk-component-badge](/lib/bpk-component-badge)
- [bpk-component-banner-alert](/lib/bpk-component-banner-alert)
- [bpk-component-boilerplate](/lib/bpk-component-boilerplate)
- [bpk-component-button](/lib/bpk-component-button)
- [bpk-component-button-link](/lib/bpk-component-button-link)
- [bpk-component-calendar](/lib/bpk-component-calendar)
- [bpk-component-card](/lib/bpk-component-card)
- [bpk-component-carousel](/lib/bpk-component-carousel)
- [bpk-component-carousel-indicator](/lib/bpk-component-carousel-indicator)
- [bpk-component-chip](/lib/bpk-component-chip)
- [bpk-component-dialog](/lib/bpk-component-dialog)
- [bpk-component-flat-list](/lib/bpk-component-flat-list)
- [bpk-component-horizontal-nav](/lib/bpk-component-horizontal-nav)
- [bpk-component-icon](/lib/bpk-component-icon)
- [bpk-component-image](/lib/bpk-component-image)
- [bpk-component-map](/lib/bpk-component-map)
- [bpk-component-navigation-bar](/lib/bpk-component-navigation-bar)
- [bpk-component-nudger](/lib/bpk-component-nudger)
- [bpk-component-panel](/lib/bpk-component-panel)
- [bpk-component-phone-input](/lib/bpk-component-phone-input)
- [bpk-component-picker](/lib/bpk-component-picker)
- [bpk-component-progress](/lib/bpk-component-progress)
- [bpk-component-rating](/lib/bpk-component-rating)
- [bpk-component-section-list](/lib/bpk-component-section-list)
- [bpk-component-select](/lib/bpk-component-select)
- [bpk-component-spinner](/lib/bpk-component-spinner)
- [bpk-component-star-rating](/lib/bpk-component-star-rating)
- [bpk-component-switch](/lib/bpk-component-switch)
- [bpk-component-text](/lib/bpk-component-text)
- [bpk-component-text-input](/lib/bpk-component-text-input)
- [bpk-component-touchable-native-feedback](/lib/bpk-component-touchable-native-feedback)
- [bpk-component-touchable-overlay](/lib/bpk-component-touchable-overlay)
- [bpk-styles](/lib/bpk-styles)
- [bpk-theming](/lib/bpk-theming)

## Contact
- backpack@skyscanner.net
