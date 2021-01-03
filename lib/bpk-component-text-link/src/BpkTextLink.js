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

import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { primaryColor } from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkText from '../../bpk-component-text';
import { getThemeAttributes, withTheme } from '../../bpk-theming';

import { type Props, propTypes, defaultProps } from './common-types';
import { REQUIRED_THEME_ATTRIBUTES } from './theming';

const dynamicStyles = BpkDynamicStyleSheet.create({
  text: {
    color: primaryColor,
  },
});

const BpkTextLink = (props: Props) => {
  const {
    children,
    onPress,
    accessibilityLabel,
    style,
    theme,
    ...rest
  } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);
  const textStyles = [styles.text];

  if (themeAttributes) {
    textStyles.push({
      color: themeAttributes.textLinkColor,
    });
  }

  if (style) {
    textStyles.push(style);
  }

  return (
    // We are using TouchableWithoutFeedback as there is incompatibility with embedding Non Text elements within text which causes errors
    // on Android and iOS devices
    <TouchableWithoutFeedback
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="link"
      onPress={onPress}
    >
      <BpkText style={textStyles} {...rest}>
        {children}
      </BpkText>
    </TouchableWithoutFeedback>
  );
};

BpkTextLink.propTypes = {
  ...propTypes,
};

BpkTextLink.defaultProps = {
  ...defaultProps,
};

export default (withTheme(BpkTextLink): typeof BpkTextLink);
