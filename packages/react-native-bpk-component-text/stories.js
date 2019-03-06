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

import React from 'react';
import {
  colorRed500,
  colorBlue700,
  colorGray500,
  colorGreen500,
  colorYellow500,
  colorPink500,
} from 'bpk-tokens/tokens/base.react.native';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkThemeProvider from 'react-native-bpk-theming';

import themeAttributes from '../../storybook/themeAttributes';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkText, { WEIGHT_STYLES } from './index';

const TEXT = 'Lorem ipsum';

storiesOf('react-native-bpk-component-text', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View>
      <BpkText textStyle="xxxl">{TEXT}</BpkText>
      <BpkText textStyle="xxl">{TEXT}</BpkText>
      <BpkText textStyle="xl">{TEXT}</BpkText>
      <BpkText textStyle="lg">{TEXT}</BpkText>
      <BpkText textStyle="base">{TEXT}</BpkText>
      <BpkText textStyle="sm">{TEXT}</BpkText>
      <BpkText textStyle="xs">{TEXT}</BpkText>
      <BpkText textStyle="caps">{TEXT.toUpperCase()}</BpkText>
    </View>
  ))
  .add('docs:emphasize', () => (
    <View>
      <BpkText textStyle="xxxl" weight={WEIGHT_STYLES.emphasized}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="xxl" weight={WEIGHT_STYLES.emphasized}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="xl" weight={WEIGHT_STYLES.emphasized}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="lg" weight={WEIGHT_STYLES.emphasized}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="base" weight={WEIGHT_STYLES.emphasized}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="sm" weight={WEIGHT_STYLES.emphasized}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="xs" weight={WEIGHT_STYLES.emphasized}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="caps" weight={WEIGHT_STYLES.emphasized}>
        {TEXT.toUpperCase()}
      </BpkText>
    </View>
  ))
  .add('docs:heavy', () => (
    <View>
      <BpkText textStyle="xxxl" weight={WEIGHT_STYLES.heavy}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="xxl" weight={WEIGHT_STYLES.heavy}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="xl" weight={WEIGHT_STYLES.heavy}>
        {TEXT}
      </BpkText>
    </View>
  ))
  .add('Themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <View>
        <BpkText textStyle="xxxl">{TEXT}</BpkText>
        <BpkText textStyle="xxl">{TEXT}</BpkText>
        <BpkText textStyle="xl">{TEXT}</BpkText>
        <BpkText textStyle="lg">{TEXT}</BpkText>
        <BpkText textStyle="base">{TEXT}</BpkText>
        <BpkText textStyle="sm">{TEXT}</BpkText>
        <BpkText textStyle="xs">{TEXT}</BpkText>
        <BpkText textStyle="caps">{TEXT.toUpperCase()}</BpkText>
      </View>
    </BpkThemeProvider>
  ))
  .add('Colours', () => (
    <View>
      <BpkText textStyle="xxxl" style={{ color: colorBlue700 }}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="xxl" style={{ color: colorRed500 }}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="xl" style={{ color: colorGreen500 }}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="lg" style={{ color: colorYellow500 }}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="base" style={{ color: colorPink500 }}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="sm" style={{ color: colorBlue700 }}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="xs" style={{ color: colorGray500 }}>
        {TEXT}
      </BpkText>
      <BpkText textStyle="caps" style={{ color: colorRed500 }}>
        {TEXT.toUpperCase()}
      </BpkText>
    </View>
  ))
  .add('Emphasised (deprecated)', () => (
    <View>
      <BpkText emphasize>{TEXT}</BpkText>
    </View>
  ));
