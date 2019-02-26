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

import PropTypes from 'prop-types';
import { type Node, type ElementProps } from 'react';
import { View, ViewPropTypes } from 'react-native';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export type Props = {
  accessibilityLabel: string,
  disabled: boolean,
  onPress: () => mixed,
  label: string,
  style: ViewStyleProp,
};

export type InnerProps = {
  accessibilityLabel: string,
  children: Node,
  disabled: boolean,
  selected: boolean,
  style: ViewStyleProp,
  userStyle: ViewStyleProp,
};

export const commonPropTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

export const commonDefaultProps = {
  disabled: false,
  style: null,
};
