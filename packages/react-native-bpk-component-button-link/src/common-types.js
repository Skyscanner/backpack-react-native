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

import { type Node } from 'react';
import PropTypes from 'prop-types';
import { makeThemePropType } from 'react-native-bpk-theming';
import type { PressEvent } from 'react-native/Libraries/Types/CoreEventTypes';

export const REQUIRED_THEME_ATTRIBUTES = ['buttonLinkTextColor'];

const themePropType = makeThemePropType(REQUIRED_THEME_ATTRIBUTES);

export const ICON_ALIGNMENTS = {
  leading: 'leading',
  trailing: 'trailing',
};

export type CommonProps = {
  onPress: (event: PressEvent) => mixed,
  title: string,
  disabled: boolean,
  accessibilityLabel: ?string,
  icon: ?Node,
  iconAlignment: $Keys<typeof ICON_ALIGNMENTS>,
  theme: ?{
    buttonLinkTextColor: string,
  },
  textProps: ?Object,
};

export const commonPropTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  icon: PropTypes.node,
  iconAlignment: PropTypes.oneOf(Object.keys(ICON_ALIGNMENTS)),
  theme: themePropType,
  textProps: PropTypes.object,
};

export const commonDefaultProps = {
  accessibilityLabel: null,
  disabled: false,
  icon: null,
  iconAlignment: ICON_ALIGNMENTS.trailing,
  theme: null,
  textProps: null,
};
