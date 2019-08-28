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

import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';
import {
  borderRadiusPill,
  borderSizeSm,
  colorBlue500,
  colorGray200,
  colorGray300,
  colorGray500,
  colorGray700,
  colorWhite,
  spacingSm,
  spacingMd,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import { shadows } from 'react-native-bpk-styles';
import { getThemeAttributes, withTheme } from 'react-native-bpk-theming';

import BpkChipInner from './BpkChipInner';
import { REQUIRED_THEME_ATTRIBUTES } from './theming';
import {
  type Props as CommonProps,
  commonPropTypes,
  commonDefaultProps,
  CHIP_TYPES,
} from './common-types';

const styles = StyleSheet.create({
  inner: {
    alignItems: 'center',
    backgroundColor: colorWhite,
    borderRadius: borderRadiusPill,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacingBase,
    paddingVertical: spacingMd,
    ...Platform.select({
      ios: shadows.base(),
    }),
  },
  innerSelected: {
    backgroundColor: colorBlue500,
  },
  innerDisabled: {
    backgroundColor: colorWhite,
  },
  text: {
    color: colorGray700,
    includeFontPadding: false,
  },
  textSelected: {
    color: colorWhite,
  },
  textDisabled: {
    color: colorGray300,
  },
  icon: {
    color: colorGray500,
    includeFontPadding: false,
    marginStart: spacingSm,
  },
  iconDisabled: {
    color: colorGray300,
  },
  innerOutline: {
    backgroundColor: 'transparent',
    borderColor: colorGray500,
    borderWidth: borderSizeSm,
    paddingVertical: spacingMd - borderSizeSm,
  },
  innerOutlineSelected: {
    backgroundColor: colorBlue500,
  },
  innerOutlineDisabled: {
    backgroundColor: 'transparent',
    borderColor: colorGray700,
  },
  textOutline: {
    color: colorWhite,
  },
  iconOutline: {
    color: colorGray200,
  },
  textOutlineDisabled: {
    color: colorGray700,
  },
  iconOutlineDisabled: {
    color: colorGray700,
  },
});

type Props = {
  ...$Exact<CommonProps>,
  dismissible: boolean,
  selected: boolean,
};

const BpkChipWrapper = (props: Props) => {
  const {
    accessibilityLabel,
    dismissible,
    disabled,
    label,
    selected,
    style,
    type,
    theme,
    ...rest
  } = props;

  const userStyle = [style];
  const innerStyle = [styles.inner];
  const textStyle = [styles.text];
  const iconStyle = [styles.icon];

  if (type === CHIP_TYPES.outline) {
    userStyle.push({ elevation: 0 });
    innerStyle.push(styles.innerOutline);
    textStyle.push(styles.textOutline);
    iconStyle.push(styles.iconOutline);
  }

  if (selected) {
    innerStyle.push(styles.innerSelected);
    textStyle.push(styles.textSelected);
    if (type === CHIP_TYPES.outline) {
      innerStyle.push(styles.innerOutlineSelected);
    }
  }

  if (disabled) {
    innerStyle.push(styles.innerDisabled);
    textStyle.push(styles.textDisabled);
    iconStyle.push(styles.iconDisabled);
    if (type === CHIP_TYPES.outline) {
      innerStyle.push(styles.innerOutlineDisabled);
      textStyle.push(styles.textOutlineDisabled);
      iconStyle.push(styles.iconOutlineDisabled);
    }
  }

  const themeAttributes = {
    ...getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme),
  };

  const shouldApplyTheme = themeAttributes && selected && !disabled;
  const shouldApplyPrimaryTheme =
    shouldApplyTheme &&
    type === CHIP_TYPES.primary &&
    themeAttributes.chipSelectedBackgroundColor &&
    themeAttributes.chipSelectedTextColor;

  const shouldApplyOutlineTheme =
    shouldApplyTheme &&
    type === CHIP_TYPES.outline &&
    themeAttributes.chipOutlineSelectedBackgroundColor &&
    themeAttributes.chipOutlineSelectedTextColor;

  if (shouldApplyPrimaryTheme) {
    innerStyle.push({
      backgroundColor: themeAttributes.chipSelectedBackgroundColor,
    });
    textStyle.push({
      color: themeAttributes.chipSelectedTextColor,
    });
  }
  if (shouldApplyOutlineTheme) {
    innerStyle.push({
      backgroundColor: themeAttributes.chipOutlineSelectedBackgroundColor,
    });
    textStyle.push({
      color: themeAttributes.chipOutlineSelectedTextColor,
    });
  }

  return (
    <BpkChipInner
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      selected={selected}
      style={innerStyle}
      userStyle={userStyle}
      {...rest}
    >
      <BpkText textStyle="sm" style={textStyle}>
        {label}
      </BpkText>
      {dismissible && <BpkIcon icon="close" small style={iconStyle} />}
    </BpkChipInner>
  );
};

BpkChipWrapper.propTypes = {
  ...commonPropTypes,
  dismissible: PropTypes.bool,
  selected: PropTypes.bool,
};

BpkChipWrapper.defaultProps = {
  ...commonDefaultProps,
  dismissible: false,
  selected: false,
};

export default withTheme(BpkChipWrapper);
