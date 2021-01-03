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
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import {
  colorBlack,
  colorSkyGrayTint06,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

import { type Flag } from './common-types';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const ASPECT_RATIO = 3 / 2; // 3:2

export type Props = {
  width: number,
  flag: ?Flag,
  style: ViewStyleProp,
};

const dynamicStyles = BpkDynamicStyleSheet.create({
  flag: {
    borderColor: {
      light: colorSkyGrayTint06,
      dark: colorBlack,
    },
    borderWidth: 1, // eslint-disable-line backpack/use-tokens
  },
});

const BpkFlag = (props: Props) => {
  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const { flag, style, width, ...rest } = props;
  const imageStyle = { width, height: width / ASPECT_RATIO };
  const finalStyle = [styles.flag, imageStyle];

  if (style) {
    finalStyle.push(style);
  }

  const styledFlag = flag ? (
    React.cloneElement(flag, {
      resizeMode: 'contain',
      style: finalStyle,
      ...rest,
    })
  ) : (
    <View style={finalStyle} {...rest} />
  );

  return styledFlag;
};

BpkFlag.propTypes = {
  width: PropTypes.number,
  flag: PropTypes.element,
  style: ViewPropTypes.style,
};

BpkFlag.defaultProps = {
  width: spacingLg,
  flag: null,
  style: null,
};

export default BpkFlag;
