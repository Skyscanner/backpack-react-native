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

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  borderRadiusXs,
  spacingMd,
} from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

import BpkText from '../bpk-component-text';
import action from '../../storybook/addons/actions';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkTouchableNativeFeedback from './index';

const styles = StyleSheet.create({
  view: {
    padding: spacingMd,
  },
  wrappingView: {
    borderRadius: borderRadiusXs,
  },
});

const textContent = (
  <BpkText>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa.
  </BpkText>
);

const viewContent = <View style={styles.view}>{textContent}</View>;

const onPress = action('Touchable native feedback press');

storiesOf('bpk-component-touchable-native-feedback', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <BpkTouchableNativeFeedback
      onPress={onPress}
      accessibilityLabel="Example touchable native feedback"
    >
      {viewContent}
    </BpkTouchableNativeFeedback>
  ))
  .add('View Wrapper', () => (
    <View style={styles.wrappingView}>
      <BpkTouchableNativeFeedback
        onPress={onPress}
        accessibilityLabel="Example touchable native feedback"
      >
        {viewContent}
      </BpkTouchableNativeFeedback>
    </View>
  ));
