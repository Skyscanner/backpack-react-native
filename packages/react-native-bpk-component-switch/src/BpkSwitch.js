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
import { Platform, Switch } from 'react-native';
import {
  getThemeAttributes,
  makeThemePropType,
  withTheme,
} from 'react-native-bpk-theming';
import {
  colorBlue500,
  colorGray100,
  colorGray50,
} from 'bpk-tokens/tokens/base.react.native';

const REQUIRED_THEME_ATTRIBUTES = ['switchPrimaryColor'];
const OPTIONAL_THEME_ATTRIBUTES = ['colorGray100'];

const getColors = (themeAttributes: ?Object, value: ?boolean): Object => {
  const primaryColor = themeAttributes
    ? themeAttributes.switchPrimaryColor
    : colorBlue500;
  const secondaryColor =
    themeAttributes && themeAttributes.colorGray100
      ? themeAttributes.colorGray100
      : colorGray100;

  // The color props mean different things based on the platform.
  const colors = Platform.select({
    ios: {
      trackColor: {
        false: secondaryColor,
        true: primaryColor,
      },
    },
    android: {
      thumbColor: value ? primaryColor : colorGray50,
      trackColor: {
        false: secondaryColor,
        true: secondaryColor,
      },
    },
  });
  return colors;
};

export type Props = {
  value: ?boolean,
  theme: ?Object,
};

const BpkSwitch = (props: Props) => {
  const { value, theme, ...rest } = props;
  const themeAttributes = getThemeAttributes(
    REQUIRED_THEME_ATTRIBUTES,
    theme,
    OPTIONAL_THEME_ATTRIBUTES,
  );

  return (
    <Switch {...getColors(themeAttributes, value)} value={value} {...rest} />
  );
};

BpkSwitch.propTypes = {
  value: PropTypes.bool,
  theme: makeThemePropType(REQUIRED_THEME_ATTRIBUTES),
};

BpkSwitch.defaultProps = {
  value: false,
  theme: null,
};

export default (withTheme(BpkSwitch): typeof BpkSwitch);
