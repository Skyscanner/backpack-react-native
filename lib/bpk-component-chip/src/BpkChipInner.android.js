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
import { Platform, View, StyleSheet } from 'react-native';
import {
  borderRadiusPill,
  elevationSm,
} from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

import BpkTouchableNativeFeedback from '../../bpk-component-touchable-native-feedback';

import { type InnerProps } from './common-types';

const styles = StyleSheet.create({
  wrapper: {
    elevation: elevationSm,
    borderRadius: borderRadiusPill,
    overflow: 'hidden',
  },
});

const BpkChipInner = (props: InnerProps) => {
  const { accessibilityLabel, children, style, userStyle, ...rest } = props;

  return (
    <View style={[styles.wrapper, userStyle]}>
      <BpkTouchableNativeFeedback
        borderlessBackground={Platform.Version !== 28}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        {...rest}
      >
        <View style={style}>{children}</View>
      </BpkTouchableNativeFeedback>
    </View>
  );
};

export default BpkChipInner;
