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
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import BpkText, { WEIGHT_STYLES } from 'react-native-bpk-component-text';
import {
  colorBlue500,
  colorGray300,
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';

export const BUTTON_TYPES = {
  default: 'default',
  primary: 'primary',
};

export type ButtonType = $Keys<typeof BUTTON_TYPES>;

export type Props = {
  title: string,
  type: ButtonType,
  emphasize: boolean,
  disabled: boolean,
  onPress: ?() => mixed,

  // Internal only
  leading: boolean,
  tintColor: ?string,
  disabledTintColor: ?string,
  primaryTintColor: ?string,
};

const styles = StyleSheet.create({
  button: {
    zIndex: 2,
  },
  leading: {
    marginStart: 8, // eslint-disable-line backpack/use-tokens
  },
  trailing: {
    marginEnd: 8, // eslint-disable-line backpack/use-tokens
  },
});

const tintColors = {
  [BUTTON_TYPES.default]: colorGray700,
  [BUTTON_TYPES.primary]: colorBlue500,
};

const BpkNavigationBarTextButtonIOS = (props: Props) => {
  const {
    title,
    type,
    disabled,
    emphasize,
    onPress,
    disabledTintColor,
    tintColor,
    primaryTintColor,
    leading,
  } = props;

  let tintColorFinal = tintColors[type];
  if (type === BUTTON_TYPES.primary && primaryTintColor) {
    tintColorFinal = primaryTintColor;
  } else if (tintColor) {
    tintColorFinal = tintColor;
  }

  const accessibilityTraits = ['button'];
  if (disabled) {
    accessibilityTraits.push('disabled');
    tintColorFinal = disabledTintColor || colorGray300;
  }

  const titleStyle = [{ color: tintColorFinal }];
  const buttonStyle = [
    styles.button,
    leading ? styles.leading : styles.trailing,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityComponentType="button"
      accessibilityTraits={accessibilityTraits}
      accessibilityLabel={title}
      accessible
      style={buttonStyle}
      disabled={disabled}
    >
      <BpkText
        textStyle="base"
        weight={emphasize ? WEIGHT_STYLES.emphasized : WEIGHT_STYLES.regular}
        style={titleStyle}
      >
        {title}
      </BpkText>
    </TouchableOpacity>
  );
};

BpkNavigationBarTextButtonIOS.propTypes = {
  title: PropTypes.string.isRequired,
  emphasize: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  type: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),

  // Internal only
  leading: PropTypes.bool,
  tintColor: PropTypes.string,
  disabledTintColor: PropTypes.string,
  primaryTintColor: PropTypes.string,
};

BpkNavigationBarTextButtonIOS.defaultProps = {
  emphasize: false,
  disabled: false,
  onPress: null,
  type: BUTTON_TYPES.default,

  // Internal only
  leading: false,
  tintColor: null,
  disabledTintColor: null,
  primaryTintColor: null,
};

export default BpkNavigationBarTextButtonIOS;
