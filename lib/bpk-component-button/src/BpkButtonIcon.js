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

import React, { type Element, type ElementProps } from 'react';
import { Text } from 'react-native';

import BpkIcon from '../../bpk-component-icon';

type TextProps = ElementProps<typeof Text>;
type TextStyleProp = $PropertyType<TextProps, 'style'>;

type Props = {
  icon: string | Element<typeof BpkIcon>,
  large: boolean,
  style: TextStyleProp,
};

const BpkButtonIcon = ({ icon, large, style }: Props) => {
  if (typeof icon === 'string') {
    return <BpkIcon icon={icon} style={style} small={!large} />;
  }
  return React.cloneElement(icon, { style: [icon.props.style, style] });
};

export default BpkButtonIcon;
