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

import { StyleSheet } from 'react-native';
import {
  colorMonteverde,
  colorSagano,
  colorGlencoe,
  borderRadiusSm,
  borderRadiusPill,
  borderSizeSm,
  colorBlackTint03,
  colorWhite,
  spacingBase,
  spacingMd,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';

import { shadows } from '../../bpk-styles';

const sharedStyles = {
  wrapper: {
    ...shadows.base(),
    paddingHorizontal: spacingLg / 4, // eslint-disable-line backpack/use-tokens
    paddingVertical: spacingLg / 4, // eslint-disable-line backpack/use-tokens
  },
  wrapperFocused: {
    paddingHorizontal: spacingMd,
    paddingVertical: spacingMd,
  },
  pointer: {
    backgroundColor: colorMonteverde,
    borderRadius: borderRadiusSm,
    height: spacingBase,
    transform: [{ rotate: '45deg' }],
    width: spacingBase,
    left: '38%',
    position: 'absolute',
    bottom: -3,
  },
  pointerDisabled: {
    backgroundColor: colorSagano,
  },
  pointerFocused: {
    backgroundColor: { light: colorWhite, dark: colorBlackTint03 },
    borderColor: colorMonteverde,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderStyle: 'solid',
    height: 17, // eslint-disable-line backpack/use-tokens
    width: 17, // eslint-disable-line backpack/use-tokens
    borderWidth: borderSizeSm,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  underlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colorMonteverde,
    borderRadius: borderRadiusPill,
  },
  underlayDisabled: {
    backgroundColor: colorSagano,
  },
  underlayFocused: {
    backgroundColor: { light: colorWhite, dark: colorBlackTint03 },
    borderLeftColor: colorMonteverde,
    borderTopColor: colorMonteverde,
    borderRightColor: colorMonteverde,
    borderBottomColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: borderSizeSm,
  },
  icon: {
    color: colorWhite,
  },
  iconFocused: {
    color: colorMonteverde,
  },
  iconDisabled: {
    color: colorGlencoe,
  },
};

export const iOSStyles = {
  ...sharedStyles,
  pointerFocused: {
    ...sharedStyles.pointerFocused,
    bottom: -3.1,
    left: '46%',
  },
};

export const androidStyles = {
  ...sharedStyles,
  // This style ensures that the View on Android (due to view rendering) can accommodate both the pointer view and the icon view
  marker: {
    paddingHorizontal: spacingMd,
    paddingVertical: spacingMd,
  },
  pointer: {
    ...sharedStyles.pointer,
    left: '50%',
    bottom: 5, // eslint-disable-line backpack/use-tokens
  },
  pointerFocused: {
    ...sharedStyles.pointerFocused,
    bottom: 5, // eslint-disable-line backpack/use-tokens
    left: '48%',
  },
};
