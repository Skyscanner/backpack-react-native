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

import { type Element } from 'react';
import PropTypes from 'prop-types';

import BpkIcon from '../../../bpk-component-icon';

export const BUTTON_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  destructive: 'destructive',
  featured: 'featured',
  primaryOnLight: 'primaryOnLight',
  primaryOnDark: 'primaryOnDark',
  secondaryOnDark: 'secondaryOnDark',
  link: 'link',
  linkOnDark: 'linkOnDark',
};

export const ICON_ALIGNMENTS = {
  leading: 'leading',
  trailing: 'trailing',
};

export type ButtonType = $Keys<typeof BUTTON_TYPES>;
export type IconType = string | Element<typeof BpkIcon>;

export type CommonPropsV2 = {
  title: string,
  onPress: (event: SyntheticEvent<>) => mixed,
  accessibilityLabel: ?string,
  icon: ?IconType,
  iconAlignment: $Keys<typeof ICON_ALIGNMENTS>,
  iconOnly: boolean,
  large: boolean,
  loading: boolean,
  type: ButtonType,
};

export const CommonPropTypesV2 = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  accessibilityLabel: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconAlignment: PropTypes.oneOf(Object.keys(ICON_ALIGNMENTS)),
  iconOnly: PropTypes.bool,
  large: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
};

export const CommonDefaultPropsV2 = {
  accessibilityLabel: null,
  icon: null,
  iconAlignment: ICON_ALIGNMENTS.trailing,
  iconOnly: false,
  large: false,
  loading: false,
  type: BUTTON_TYPES.primary,
};

export type PropsV2 = {
  ...$Exact<CommonPropsV2>,
  disabled: boolean,
};

export const PropTypesV2 = {
  ...CommonPropTypesV2,
  disabled: PropTypes.bool,
};

export const DefaultPropsV2 = {
  ...CommonDefaultPropsV2,
  disabled: false,
};
