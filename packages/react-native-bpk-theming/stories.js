/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
/* @flow */

import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { Text, StyleSheet, View, Picker, Platform } from 'react-native';
import {
  spacingMd,
  colorWhite,
  colorPanjin,
  colorSkyBlue,
  colorErfoud,
  fontFamily,
} from 'bpk-tokens/tokens/base.react.native';

// We import relatively because a) it's just for a story and
// b) it causes cyclic dependencies in lerna
import BpkButton from '../react-native-bpk-component-button';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkThemeProvider, { BpkThemeAttributes } from './index';

type Theme = {
  buttonPrimaryTextColor: string,
  buttonPrimaryGradientStartColor: string,
  buttonPrimaryGradientEndColor: string,
  buttonSecondaryTextColor: string,
  buttonSecondaryBackgroundColor: string,
  buttonSecondaryBorderColor: string,
  primaryColor: string,
  colorGray50: string,
  colorGray100: string,
  colorGray200: string,
  colorGray300: string,
  colorGray400: string,
  colorGray500: string,
  colorGray700: string,
  colorGray900: string,
  textFontFamily: string,
};

const generateThemeAttributes = (
  gradientStartColor: string,
  gradientEndColor: string,
  textFontFamily: ?string,
): Theme => ({
  buttonPrimaryTextColor: colorWhite,
  buttonPrimaryGradientStartColor: gradientStartColor,
  buttonPrimaryGradientEndColor: gradientEndColor,
  buttonSecondaryTextColor: gradientEndColor,
  buttonSecondaryBackgroundColor: colorWhite,
  buttonSecondaryBorderColor: gradientEndColor,
  primaryColor: gradientStartColor,
  colorGray50: '#F1F2F8',
  colorGray100: '#DDDDE5',
  colorGray200: '#CDCDD7',
  colorGray300: '#B2B2BF',
  colorGray400: '#8F90A0',
  colorGray500: '#68697F',
  colorGray700: '#444560',
  colorGray900: '#111236',
  textFontFamily: textFontFamily || fontFamily,
});

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: spacingMd,
  },
  solidColorBlock: {
    width: '100%',
    height: spacingMd * 3,
    fontFamily,
  },
});

type State = {
  themeId: string,
  theme: Theme,
};

const SolidColorBlockPrimary = () => (
  <BpkThemeAttributes>
    {({ primaryColor }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: primaryColor }]}
      />
    )}
  </BpkThemeAttributes>
);

const SolidColorBlockGray50 = () => (
  <BpkThemeAttributes>
    {({ colorGray50 }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: colorGray50 }]}
      />
    )}
  </BpkThemeAttributes>
);
const SolidColorBlockGray100 = () => (
  <BpkThemeAttributes>
    {({ colorGray100 }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: colorGray100 }]}
      />
    )}
  </BpkThemeAttributes>
);
const SolidColorBlockGray200 = () => (
  <BpkThemeAttributes>
    {({ colorGray200 }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: colorGray200 }]}
      />
    )}
  </BpkThemeAttributes>
);
const SolidColorBlockGray300 = () => (
  <BpkThemeAttributes>
    {({ colorGray300 }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: colorGray300 }]}
      />
    )}
  </BpkThemeAttributes>
);
const SolidColorBlockGray400 = () => (
  <BpkThemeAttributes>
    {({ colorGray400 }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: colorGray400 }]}
      />
    )}
  </BpkThemeAttributes>
);
const SolidColorBlockGray500 = () => (
  <BpkThemeAttributes>
    {({ colorGray500 }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: colorGray500 }]}
      />
    )}
  </BpkThemeAttributes>
);
const SolidColorBlockGray700 = () => (
  <BpkThemeAttributes>
    {({ colorGray700 }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: colorGray700 }]}
      />
    )}
  </BpkThemeAttributes>
);
const SolidColorBlockGray900 = () => (
  <BpkThemeAttributes>
    {({ colorGray900 }) => (
      <View
        style={[styles.solidColorBlock, { backgroundColor: colorGray900 }]}
      />
    )}
  </BpkThemeAttributes>
);
const BlockOfText = () => (
  <BpkThemeAttributes>
    {({ textFontFamily }) => (
      <View style={styles.solidColorBlock}>
        {/* eslint-disable-next-line backpack/use-components */}
        <Text style={{ fontFamily: textFontFamily }}>Backpack</Text>
      </View>
    )}
  </BpkThemeAttributes>
);

class BpkThemePicker extends Component<{}, State> {
  themes: {| blue: Theme, yellow: Theme, red: Theme |};

  constructor() {
    super();

    this.themes = {
      blue: generateThemeAttributes(
        colorSkyBlue,
        colorSkyBlue,
        Platform.OS === 'android' ? 'serif-monospace' : 'Courier',
      ),
      yellow: generateThemeAttributes(colorErfoud, colorErfoud),
      red: generateThemeAttributes(colorPanjin, colorPanjin),
    };

    this.state = {
      themeId: 'blue',
      theme: this.themes.blue,
    };
  }

  switchTheme = value => {
    if (typeof value === 'string') {
      this.setState({
        themeId: value,
        theme: this.themes[value],
      });
    }
  };

  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.themeId}
          onValueChange={this.switchTheme}
        >
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Yellow" value="yellow" />
          <Picker.Item label="Red" value="red" />
        </Picker>
        <BpkThemeProvider theme={this.state.theme}>
          <View>
            <BpkButton
              type="primary"
              title="Book hotel"
              onPress={action('primary themed button pressed')}
              style={styles.bottomMargin}
            />
            <BpkButton
              type="secondary"
              title="Go back"
              onPress={action('secondary themed button pressed')}
              style={styles.bottomMargin}
            />
            <SolidColorBlockPrimary />
            <SolidColorBlockGray50 />
            <SolidColorBlockGray100 />
            <SolidColorBlockGray200 />
            <SolidColorBlockGray300 />
            <SolidColorBlockGray400 />
            <SolidColorBlockGray500 />
            <SolidColorBlockGray700 />
            <SolidColorBlockGray900 />
            <BlockOfText />
          </View>
        </BpkThemeProvider>
      </View>
    );
  }
}

storiesOf('react-native-bpk-theming', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <View>
      <BpkThemePicker />
    </View>
  ));
