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

import React, { type ElementProps, type Node } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  buttonBorderWidth,
  spacingSm,
  spacingMd,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import BpkTouchableOverlay from '../../bpk-component-touchable-overlay';

import { type IconType } from './common-types';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const BORDER_WIDTH = buttonBorderWidth;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: BORDER_WIDTH,
    justifyContent: 'center',
    paddingVertical: spacingMd - buttonBorderWidth,
    paddingHorizontal: spacingBase - spacingSm - buttonBorderWidth,
  },
  buttonIconTrailing: {
    flexDirection: 'row-reverse',
  },
  buttonIconOnly: {
    paddingHorizontal: spacingMd - buttonBorderWidth,
  },
  buttonLarge: {
    paddingVertical: spacingBase - spacingSm - buttonBorderWidth,
    paddingHorizontal: spacingBase - buttonBorderWidth,
  },
  buttonLargeIconOnly: {
    paddingHorizontal: spacingBase - spacingSm - buttonBorderWidth,
  },
});

export type Props = {
  backgroundColor: string,
  borderColor: string,
  borderRadius: number,
  children: Node,
  disabled: boolean,
  iconOnly: boolean,
  iconTrailing: boolean,
  large: boolean,
  style: ViewStyleProp,
  title: string,
  icon: ?IconType,
};

const BpkBorderedButton = (props: Props) => {
  const {
    backgroundColor,
    borderColor,
    borderRadius,
    children,
    disabled,
    icon,
    iconOnly,
    iconTrailing,
    large,
    title,
    ...rest
  } = props;

  const buttonStyle = [
    styles.button,
    large ? styles.buttonLarge : null,
    {
      backgroundColor,
      borderColor,
      borderRadius,
    },
  ];

  if (iconTrailing) {
    buttonStyle.push(styles.buttonIconTrailing);
  }

  if (iconOnly) {
    buttonStyle.push(
      large ? styles.buttonLargeIconOnly : styles.buttonIconOnly,
    );
  }

  return (
    <BpkTouchableOverlay
      overlayStyle={{
        borderColor,
        borderWidth: BORDER_WIDTH,
      }}
      borderRadius={borderRadius}
      disabled={disabled}
      {...rest}
    >
      <View style={buttonStyle}>{children}</View>
    </BpkTouchableOverlay>
  );
};

export default BpkBorderedButton;
