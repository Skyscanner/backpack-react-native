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

import { type Element, type ElementProps } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import BpkIcon from '../../bpk-component-icon';
import { makeThemePropType, type Theme } from '../../bpk-theming';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export const REQUIRED_THEME_ATTRIBUTES = {
  primary: [
    'buttonPrimaryTextColor',
    'buttonPrimaryGradientStartColor',
    'buttonPrimaryGradientEndColor',
  ],
  secondary: [
    'buttonSecondaryTextColor',
    'buttonSecondaryBackgroundColor',
    'buttonSecondaryBorderColor',
  ],
  destructive: [
    'buttonDestructiveTextColor',
    'buttonDestructiveBackgroundColor',
    'buttonDestructiveBorderColor',
  ],
  featured: [
    'buttonFeaturedTextColor',
    'buttonFeaturedGradientStartColor',
    'buttonFeaturedGradientEndColor',
  ],
  outline: [],
};

export const BUTTON_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  destructive: 'destructive',
  featured: 'featured',
  outline: 'outline',
};

export const ICON_ALIGNMENTS = {
  leading: 'leading',
  trailing: 'trailing',
};

export type ButtonType = $Keys<typeof BUTTON_TYPES>;
export type IconType = string | Element<typeof BpkIcon>;

export type CommonProps = {
  disabled: boolean,
  iconAlignment: $Keys<typeof ICON_ALIGNMENTS>,
  iconOnly: boolean,
  onPress: (event: SyntheticEvent<>) => mixed,
  style: ViewStyleProp,
  title: string,
  type: ButtonType,
  accessibilityLabel: ?string,
  icon: ?IconType,
  theme: ?Theme,
};

const themePropType = (
  props: Object,
  propName: string,
  componentName: string,
  ...rest: { [string]: any }
) => {
  const { type } = props;
  return makeThemePropType(REQUIRED_THEME_ATTRIBUTES[type])(
    props,
    propName,
    componentName,
    ...rest,
  );
};

export const commonPropTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconAlignment: PropTypes.oneOf(Object.keys(ICON_ALIGNMENTS)),
  iconOnly: PropTypes.bool,
  style: ViewPropTypes.style,
  theme: themePropType,
  type: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
};

export const commonDefaultProps = {
  accessibilityLabel: null,
  disabled: false,
  icon: null,
  iconAlignment: ICON_ALIGNMENTS.trailing,
  iconOnly: false,
  style: null,
  theme: null,
  type: BUTTON_TYPES.primary,
};
