/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colorSkyGray, spacingBase } from 'bpk-tokens/tokens/base.react.native';

import BpkThemeProvider from '../bpk-theming';
import themeAttributes from '../../storybook/themeAttributes';
import { StoryHeading, StorySubheading } from '../../storybook/TextStyles';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkSpinner from './index';

const styles = StyleSheet.create({
  dark: {
    backgroundColor: colorSkyGray,
    padding: spacingBase,
  },
  bottomMargin: {
    marginBottom: spacingBase,
  },
});

const generateAllSpinnerTypes = small => (
  <View>
    <View style={styles.bottomMargin}>
      <StorySubheading>Primary (Default)</StorySubheading>
      <BpkSpinner small={small} />
    </View>
    <View style={styles.bottomMargin}>
      <StorySubheading>Dark</StorySubheading>
      <BpkSpinner type="dark" small={small} />
    </View>
    <StorySubheading>Light</StorySubheading>
    <View style={[styles.dark, styles.bottomMargin]}>
      <BpkSpinner type="light" small={small} />
    </View>
  </View>
);

const getThemedButtons = () => (
  <BpkThemeProvider theme={themeAttributes}>
    <View>
      <StorySubheading>Primary Default</StorySubheading>
      <BpkSpinner />
      <StorySubheading>Primary Small</StorySubheading>
      <BpkSpinner small />
    </View>
  </BpkThemeProvider>
);

storiesOf('bpk-component-spinner', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => <View>{generateAllSpinnerTypes()}</View>)
  .add('docs:small', () => <View>{generateAllSpinnerTypes(true)}</View>)
  .add('With theme', () => <View>{getThemedButtons()}</View>)
  .add('All types', () => (
    <ScrollView>
      <StoryHeading>Default</StoryHeading>
      {generateAllSpinnerTypes()}
      <StoryHeading>Small</StoryHeading>
      {generateAllSpinnerTypes(true)}
      <StoryHeading>Themed</StoryHeading>
      {getThemedButtons()}
    </ScrollView>
  ));
