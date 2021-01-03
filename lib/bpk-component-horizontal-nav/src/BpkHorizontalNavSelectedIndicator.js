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

import React, { type ElementProps } from 'react';
import { Animated, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import {
  primaryColor,
  borderSizeLg,
} from 'bpk-tokens/tokens/base.react.native';

import { getThemeAttributes, withTheme, type Theme } from '../../bpk-theming';
import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

import { REQUIRED_THEME_ATTRIBUTES, themePropType } from './theming';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const dynamicStyles = BpkDynamicStyleSheet.create({
  selectedIndicator: {
    backgroundColor: primaryColor,
    height: borderSizeLg,
  },
});

export type Props = {
  style: ?ViewStyleProp,
  theme: ?Theme,
  width: ?(number | Object),
  xOffset: ?(number | Object),
};

const BpkHorizontalNavSelectedIndicator = (props: Props) => {
  const { style: userStyle, theme, width, xOffset } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const style = [styles.selectedIndicator];

  const themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);

  if (themeAttributes) {
    style.push({
      backgroundColor: themeAttributes.horizontalNavSelectedTextColor,
    });
  }

  if (userStyle) {
    style.push(userStyle);
  }

  const animationStyles = {
    transform: [
      {
        translateX: xOffset,
      },
    ],
    width,
  };

  return <Animated.View style={[style, animationStyles]} />;
};

BpkHorizontalNavSelectedIndicator.propTypes = {
  style: ViewPropTypes.style,
  theme: themePropType,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Object)]),
  xOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Object),
  ]),
};

BpkHorizontalNavSelectedIndicator.defaultProps = {
  style: null,
  theme: null,
  width: null,
  xOffset: null,
};

export default (withTheme(
  BpkHorizontalNavSelectedIndicator,
): typeof BpkHorizontalNavSelectedIndicator);
