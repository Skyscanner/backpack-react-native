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

import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { type Element, type ElementProps, type Config } from 'react';

import {
  type BpkTextProps,
  type BpkTextDefaultProps,
} from '../../bpk-component-text';
import { type Theme } from '../../bpk-theming';

import { themePropType } from './theming';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export type FlatListItemImage = Element<any>;

type TextConfig = Config<BpkTextProps, BpkTextDefaultProps>;

export type FlatListItemProps = {
  onPress: () => mixed,
  title: string,
  selected: boolean,
  image: ?FlatListItemImage,
  style: ViewStyleProp,
  theme: ?Theme,
  titleProps?: $Diff<TextConfig, { children: any }>,
};

export const LIST_ITEM_PROP_TYPES = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.element,
  selected: PropTypes.bool,
  style: ViewPropTypes.style,
  theme: themePropType,
};

export const LIST_ITEM_DEFAULT_PROPS = {
  image: null,
  selected: false,
  style: null,
  theme: null,
};
