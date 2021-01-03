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

import React, { type Element, type ElementProps, type Node } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  buttonBorderWidth,
  elevationSm,
  spacingSm,
  spacingMd,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import BpkIcon from '../../bpk-component-icon';
import BpkTouchableNativeFeedback from '../../bpk-component-touchable-native-feedback';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    elevation: elevationSm,
  },
  wrapperDisabled: {
    elevation: 0,
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
  borderRadius: number,
  children: Node,
  disabled: boolean,
  iconOnly: boolean,
  iconTrailing: boolean,
  style: ViewStyleProp,
  title: string,
  icon: ?(string | Element<typeof BpkIcon>),
};

const BpkStandardButton = (props: Props) => {
  const {
    borderRadius,
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

  const wrapperStyle = [styles.wrapper, { borderRadius }];
  const buttonStyle = [styles.button, { borderRadius, backgroundColor }];

  if (disabled) {
    wrapperStyle.push(styles.wrapperDisabled);
  }

  if (userStyle) {
    wrapperStyle.push(userStyle);
  }

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

export default BpkStandardButton;
