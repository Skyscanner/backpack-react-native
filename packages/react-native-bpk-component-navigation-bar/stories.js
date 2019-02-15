/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { I18nManager, Platform, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import BpkThemeProvider from 'react-native-bpk-theming';
import BpkCard from 'react-native-bpk-component-card';
import BpkText from 'react-native-bpk-component-text';
import BpkImage from 'react-native-bpk-component-image';

import themeAttributes from '../../storybook/themeAttributes';

import isIphoneX from './src/isIphoneX';

import BpkNavigationBar, {
  BpkNavigationBarButtonAndroid,
  BpkNavigationBarBackButtonIOS,
  BpkNavigationBarTextButtonIOS,
  BpkNavigationBarIconButtonIOS,
} from './index';

const exampleLogo = require('./logo.png');

/*
HACK
On iOS, Storybook's UI covers the status bar which affects the appearance
of the navigation bar. This pulls it upwards to counteract it.
*/
const IOS_STATUS_BAR_HEIGHT = isIphoneX ? 44 : 20;
const styles = StyleSheet.create({
  navigationBar: Platform.select({
    ios: {
      marginTop: -IOS_STATUS_BAR_HEIGHT,
    },
  }),
});

const backIcon = () =>
  I18nManager.isRTL ? 'native-android--forward' : 'native-android--back';

const backButton = Platform.select({
  android: () => (
    <BpkNavigationBarButtonAndroid
      title="Back"
      icon={backIcon()}
      onPress={action('Tapped leading button')}
    />
  ),
  ios: () => (
    <BpkNavigationBarBackButtonIOS
      title="Back"
      showTitle
      onPress={action('Tapped leading button')}
    />
  ),
});

const cancelButton = Platform.select({
  android: () => (
    <BpkNavigationBarButtonAndroid
      title="Close"
      icon="native-android--close"
      onPress={action('Tapped leading button')}
    />
  ),
  ios: () => (
    <BpkNavigationBarTextButtonIOS
      title="Cancel"
      onPress={action('Tapped leading button')}
    />
  ),
});

const doneButton = Platform.select({
  android: (disabled = false) => (
    <BpkNavigationBarButtonAndroid
      title="Done"
      icon="tick"
      onPress={action('Tapped trailing button')}
      disabled={disabled}
    />
  ),
  ios: (disabled = false) => (
    <BpkNavigationBarTextButtonIOS
      title="Done"
      emphasize
      onPress={action('Tapped trailing button')}
      disabled={disabled}
    />
  ),
});

const PrimaryDoneButtonIOS = () => (
  <BpkNavigationBarTextButtonIOS title="Done" emphasize type="primary" />
);

const addButton = Platform.select({
  android: () => (
    <BpkNavigationBarButtonAndroid
      title="Done"
      icon="plus"
      onPress={action('Tapped trailing button')}
    />
  ),
  ios: () => (
    <BpkNavigationBarIconButtonIOS
      title="Add"
      icon="share--ios"
      onPress={action('Tapped trailing button')}
    />
  ),
});

storiesOf('react-native-bpk-component-navigation-bar', module)
  .add('docs:default', () => (
    <BpkNavigationBar
      leadingButton={backButton()}
      title="Backpack"
      style={styles.navigationBar}
    />
  ))
  .add('docs:modal', () => (
    <BpkNavigationBar
      leadingButton={cancelButton()}
      trailingButton={doneButton()}
      title="Backpack"
      style={styles.navigationBar}
    />
  ))
  .add('docs:primary-text-button', () =>
    Platform.OS === 'ios' ? (
      <BpkNavigationBar
        leadingButton={cancelButton()}
        trailingButton={<PrimaryDoneButtonIOS />}
        title="Backpack"
        style={styles.navigationBar}
      />
    ) : (
      <BpkText>Not implemented for Android.</BpkText>
    ),
  )
  .add('docs:subtitle-view', () => (
    <BpkNavigationBar
      leadingButton={backButton()}
      title="Backpack"
      subtitleView={
        <BpkCard onPress={action('Card pressed')}>
          <BpkText>Hello</BpkText>
        </BpkCard>
      }
      style={styles.navigationBar}
    />
  ))
  .add('docs:icon-in-title', () => (
    <BpkNavigationBar
      leadingButton={backButton()}
      title={{ value: 'Checkout', icon: 'lock', iconPosition: 'leading' }}
      style={styles.navigationBar}
    />
  ))
  .add('Themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <BpkNavigationBar
        leadingButton={backButton()}
        title={<BpkImage alt="logo" source={exampleLogo} />}
        style={styles.navigationBar}
      />
    </BpkThemeProvider>
  ))
  .add('Extreme example', () => (
    <BpkNavigationBar
      leadingButton={backButton()}
      title="This is a very long title with a lot of content"
      style={styles.navigationBar}
    />
  ))
  .add('Disabled button', () => (
    <BpkNavigationBar
      leadingButton={cancelButton()}
      trailingButton={doneButton(true)}
      title="Backpack"
      style={styles.navigationBar}
    />
  ))
  .add('iOS icon button', () => (
    <BpkNavigationBar
      trailingButton={addButton()}
      title="Backpack"
      style={styles.navigationBar}
    />
  ));
