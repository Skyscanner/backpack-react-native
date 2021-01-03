/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import BpkButton from '../bpk-component-button';
import CenterDecorator from '../../storybook/CenterDecorator';
import action from '../../storybook/addons/actions';

import BpkThemeProvider, { BpkThemeAttributes } from './index';

type Theme = {
  buttonPrimaryTextColor: string,
  buttonPrimaryGradientStartColor: string,
  buttonPrimaryGradientEndColor: string,
  buttonSecondaryTextColor: string,
  buttonSecondaryBackgroundColor: string,
  buttonSecondaryBorderColor: string,
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

const BlockOfText = () => (
  <BpkThemeAttributes>
    {({ textFontFamily }) => (
      <View style={styles.solidColorBlock}>
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

  switchTheme = (value) => {
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
            <BlockOfText />
          </View>
        </BpkThemeProvider>
      </View>
    );
  }
}

storiesOf('bpk-theming', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <View>
      <BpkThemePicker />
    </View>
  ));
