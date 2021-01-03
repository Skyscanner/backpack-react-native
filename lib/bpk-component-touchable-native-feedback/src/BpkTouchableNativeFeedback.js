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

import React, { type Node, type ElementProps } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  TouchableNativeFeedback,
  View,
  ViewPropTypes,
} from 'react-native';
import { colorSkyGrayTint02 } from 'bpk-tokens/tokens/base.react.native';

import { useBpkDynamicValue, type BpkDynamicValue } from '../../bpk-appearance';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export type Props = {
  children: Node,
  borderlessBackground: boolean,
  color: ?string | ?BpkDynamicValue<string>,
  style: ViewStyleProp,
};

const BpkTouchableNativeFeedback = (props: Props) => {
  const { children, style, borderlessBackground, color, ...rest } = props;
  const resolvedColor = useBpkDynamicValue(color);
  const defaultRippleColor = useBpkDynamicValue({
    light: null,
    dark: colorSkyGrayTint02,
  });
  const rippleColor = resolvedColor || defaultRippleColor;
  const preLollipop = Platform.Version < 21;
  const background = preLollipop
    ? TouchableNativeFeedback.SelectableBackground()
    : TouchableNativeFeedback.Ripple(rippleColor, borderlessBackground);

  return (
    <TouchableNativeFeedback style={style} background={background} {...rest}>
      {React.Children.only(children)}
    </TouchableNativeFeedback>
  );
};

BpkTouchableNativeFeedback.propTypes = {
  children: PropTypes.element.isRequired,
  borderlessBackground: PropTypes.bool,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      light: PropTypes.string,
      dark: PropTypes.string,
    }),
  ]),
  style: ViewPropTypes.style,
};

BpkTouchableNativeFeedback.defaultProps = {
  borderlessBackground: true,
  color: null,
  style: null,
};

export default BpkTouchableNativeFeedback;
