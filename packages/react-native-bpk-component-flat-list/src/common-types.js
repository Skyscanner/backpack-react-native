/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import { type Element, type ElementProps } from 'react';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export type FlatListItemImage = Element<any>;

export type FlatListItemProps = {
  onPress: () => void,
  title: string,
  selected: boolean,
  image: ?FlatListItemImage,
  style: ViewStyleProp,
};

export const LIST_ITEM_PROP_TYPES = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.element,
  selected: PropTypes.bool,
  style: ViewPropTypes.style,
};

export const LIST_ITEM_DEFAULT_PROPS = {
  image: null,
  selected: false,
  style: null,
};
