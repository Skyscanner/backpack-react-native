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

import React, { type Element, type ElementProps, type Node } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import {
  borderRadiusPill,
  buttonBorderWidth,
  spacingSm,
  spacingMd,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: borderRadiusPill,
    overflow: 'hidden',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacingMd,
    paddingHorizontal: spacingBase - spacingSm,
  },
  buttonIconTrailing: {
    flexDirection: 'row-reverse',
  },
  buttonIconOnly: {
    paddingHorizontal: spacingMd + buttonBorderWidth,
  },
});

export type Props = {
  backgroundColor: string,
  children: Node,
  disabled: boolean,
  iconOnly: boolean,
  iconTrailing: boolean,
  style: ViewStyleProp,
  title: string,
  icon: ?Element<typeof BpkIcon>,
};

const BpkGradientButton = (props: Props) => {
  const {
    children,
    disabled,
    backgroundColor,
    icon,
    iconOnly,
    iconTrailing,
    style: userStyle,
    title,
    ...rest
  } = props;
  const borderRadius = borderRadiusPill;

  const wrapperStyle = [styles.wrapper, userStyle];

  const buttonStyle = [styles.button, { borderRadius }, { backgroundColor }];

  if (iconTrailing) {
    buttonStyle.push(styles.buttonIconTrailing);
  }

  if (iconOnly) {
    buttonStyle.push(styles.buttonIconOnly);
  }

  return (
    <View style={wrapperStyle}>
      <BpkTouchableNativeFeedback
        disabled={disabled}
        borderlessBackground={Platform.Version !== 28}
        {...rest}
      >
        <View style={buttonStyle}>{children}</View>
      </BpkTouchableNativeFeedback>
    </View>
  );
};

export default BpkGradientButton;
