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

import BpkIcon from '../../bpk-component-icon';


export const BUTTON_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  destructive: 'destructive',
  featured: 'featured',
  primaryOnLight: 'primaryOnLight',
  primaryOnDark: 'primaryOnDark'
};

export const ICON_ALIGNMENTS = {
  leading: 'leading',
  trailing: 'trailing',
};

export type ButtonType = $Keys<typeof BUTTON_TYPES>;
export type IconType = string | Element<typeof BpkIcon>;

export type CommonProps = {
  title: string,
  onPress: (event: SyntheticEvent<>) => mixed,
  disabled: boolean,
  icon: ?IconType,
  iconAlignment: $Keys<typeof ICON_ALIGNMENTS>,
  iconOnly: boolean,
  large: boolean,
  loading: boolean,
  type: ButtonType,
};

export const commonPropTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconAlignment: PropTypes.oneOf(Object.keys(ICON_ALIGNMENTS)),
  iconOnly: PropTypes.bool,
  large: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
};

export const commonDefaultProps = {
  disabled: false,
  icon: null,
  iconAlignment: ICON_ALIGNMENTS.trailing,
  iconOnly: false,
  large: false,
  loading: false,
  type: BUTTON_TYPES.primary,
};
