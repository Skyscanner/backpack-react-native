/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import { Platform, View, ViewPropTypes } from 'react-native';
import React, { type ElementProps } from 'react';
import PropTypes from 'prop-types';
import {
  colorSkyGrayTint04,
  colorBlackTint05,
  primaryColor,
  spacingSm,
  spacingXl,
  borderSizeSm,
  borderSizeLg,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import { getThemeAttributes, withTheme } from 'react-native-bpk-theming';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from 'react-native-bpk-appearance';

import { REQUIRED_THEME_ATTRIBUTES, themePropType } from './theming';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const dynamicStyles = BpkDynamicStyleSheet.create({
  view: {
    height: spacingXl + spacingSm - borderSizeSm - borderSizeLg,
    justifyContent: 'center',
  },
  viewSmall: {
    height: spacingXl - borderSizeSm - borderSizeLg,
  },
  text: {
    paddingHorizontal: spacingBase,
  },
  textDisabled: {
    color: { light: colorSkyGrayTint04, dark: colorBlackTint05 },
  },
  textSelected: {
    color: primaryColor,
  },
});

export type Props = {
  id: string,
  onPress: (event: SyntheticEvent<>) => mixed,
  title: string,
  accessibilityLabel: ?string,
  disabled: boolean,
  selected: boolean,
  style: ViewStyleProp,
  small: boolean,
  theme: ?Object,
};

const BpkHorizontalNavItem = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    selected,
    style,
    theme,
    small,
    title,
    ...rest
  } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const accessibilityStates = [];
  const textSize = small ? 'sm' : 'base';
  const viewStyles = [styles.view];
  const textStyles = [styles.text];
  const themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);

  if (disabled) {
    accessibilityStates.push('disabled');
    textStyles.push(styles.textDisabled);
  } else if (selected) {
    textStyles.push(styles.textSelected);
    if (themeAttributes) {
      textStyles.push({
        color: themeAttributes.horizontalNavSelectedTextColor,
      });
    }
  }

  if (small) {
    viewStyles.push(styles.viewSmall);
  }

  if (style) {
    viewStyles.push(style);
  }

  const isAndroid = Platform.OS === 'android';
  const Touchable = isAndroid
    ? BpkTouchableNativeFeedback
    : BpkTouchableOverlay;
  const formattedTitle = isAndroid ? title.toUpperCase() : title;
  const platformProps = isAndroid ? { borderlessBackground: false } : {};
  return (
    <Touchable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityStates={accessibilityStates}
      disabled={disabled || selected}
      {...platformProps}
      {...rest}
    >
      <View style={viewStyles}>
        <BpkText style={textStyles} textStyle={textSize}>
          {formattedTitle}
        </BpkText>
      </View>
    </Touchable>
  );
};

BpkHorizontalNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  style: ViewPropTypes.style,
  small: PropTypes.bool,
  theme: themePropType,
};

BpkHorizontalNavItem.defaultProps = {
  accessibilityLabel: null,
  disabled: false,
  selected: false,
  small: false,
  style: null,
  theme: null,
};

export default (withTheme(BpkHorizontalNavItem): typeof BpkHorizontalNavItem);
