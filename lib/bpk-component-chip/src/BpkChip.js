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

import React, { type Element } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import {
  borderRadiusPill,
  borderSizeSm,
  textPrimaryColor,
  spacingSm,
  spacingMd,
  spacingBase,
  privateChipOnDarkNormalBackgroundDay,
  privateChipOnDarkOnBackgroundDay,
  privateChipDefaultNormalBackgroundNight,
  privateChipDefaultNormalBackgroundDay,
  privateChipDefaultOnBackgroundDay,
  privateChipDefaultOnBackgroundNight,
  privateChipDisabledBackgroundNight,
  privateChipDisabledBackgroundDay,
  textOnDarkDay,
  textOnDarkNight,
  textDisabledDay,
  textDisabledNight,
  textOnLightDay,
} from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkText from '../../bpk-component-text';
import { shadows } from '../../bpk-styles';
import { getThemeAttributes, withTheme } from '../../bpk-theming';

import BpkChipInner from './BpkChipInner';
import { REQUIRED_THEME_ATTRIBUTES } from './theming';
import {
  type Props as CommonProps,
  commonPropTypes,
  commonDefaultProps,
  CHIP_TYPES,
} from './common-types';

const disabledTextColor = { light: textDisabledDay, dark: textDisabledNight };

const dynamicStyles = BpkDynamicStyleSheet.create({
  inner: {
    alignItems: 'center',
    backgroundColor: {
      light: privateChipDefaultNormalBackgroundDay,
      dark: privateChipDefaultNormalBackgroundNight,
    },
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
    backgroundColor: {
      light: privateChipDefaultOnBackgroundDay,
      dark: privateChipDefaultOnBackgroundNight,
    },
  },
  innerDisabled: {
    backgroundColor: {
      light: privateChipDisabledBackgroundDay,
      dark: privateChipDisabledBackgroundNight,
    },
  },
  text: {
    color: textPrimaryColor,
    includeFontPadding: false,
  },
  textSelected: {
    color: { light: textOnDarkDay, dark: textOnDarkNight },
  },
  textDisabled: {
    color: disabledTextColor,
  },
  icon: {
    color: textPrimaryColor,
    includeFontPadding: false,
    marginStart: spacingSm,
  },
  iconSelected: {
    color: { light: textOnDarkDay, dark: textOnDarkNight },
  },
  iconDisabled: {
    color: disabledTextColor,
  },
  innerOutline: {
    backgroundColor: {
      light: privateChipOnDarkNormalBackgroundDay,
      dark: privateChipDefaultNormalBackgroundNight,
    },
    paddingVertical: spacingMd - borderSizeSm,
  },
  innerOutlineSelected: {
    backgroundColor: {
      light: privateChipOnDarkOnBackgroundDay,
      dark: privateChipDefaultOnBackgroundNight,
    },
  },
  innerOutlineDisabled: {
    backgroundColor: {
      light: privateChipDisabledBackgroundDay,
      dark: privateChipDisabledBackgroundNight,
    },
  },
  textOutline: {
    color: textOnDarkDay,
  },
  textOutlineSelected: {
    color: { light: textOnLightDay, dark: textOnDarkNight },
  },
  iconOutline: {
    color: textOnDarkDay,
  },
  iconOutlineSelected: {
    color: { light: textOnLightDay, dark: textOnDarkNight },
  },
  textOutlineDisabled: {
    color: disabledTextColor,
  },
  iconOutlineDisabled: {
    color: disabledTextColor,
  },
  textWithLeadingAccessoryView: {
    marginStart: spacingSm,
  },
  textWithTrailingAccessoryView: {
    marginEnd: spacingSm,
  },
});

export type Props = {
  ...$Exact<CommonProps>,
  selected: boolean,
  trailingAccessoryView: ?Element<*>,
};

const BpkChip = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    label,
    leadingAccessoryView,
    selected,
    style,
    innerChipStyle,
    type,
    theme,
    trailingAccessoryView,
    ...rest
  } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const userStyle = [];
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
    iconStyle.push(styles.iconSelected);
    if (type === CHIP_TYPES.outline) {
      innerStyle.push(styles.innerOutlineSelected);
      textStyle.push(styles.textOutlineSelected);
      iconStyle.push(styles.iconOutlineSelected);
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

  if (style) {
    userStyle.push(style);
  }

  if (innerChipStyle) {
    innerStyle.push(innerChipStyle);
  }

  let adjustedLeadingAccessoryView;
  const leadingAccessoryViewItemStyle = textStyle.slice(0);
  if (leadingAccessoryView) {
    textStyle.push(styles.textWithLeadingAccessoryView);
    adjustedLeadingAccessoryView = React.cloneElement(leadingAccessoryView, {
      style: leadingAccessoryViewItemStyle,
    });
  }

  let adjustedTrailingAccessoryView;
  const trailingAccessoryViewItemStyle = textStyle.slice(0);
  if (trailingAccessoryView) {
    textStyle.push(styles.textWithTrailingAccessoryView);
    adjustedTrailingAccessoryView = React.cloneElement(trailingAccessoryView, {
      style: trailingAccessoryViewItemStyle,
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
      {adjustedLeadingAccessoryView}
      <BpkText textStyle="sm" style={textStyle}>
        {label}
      </BpkText>
      {adjustedTrailingAccessoryView}
    </BpkChipInner>
  );
};

BpkChip.propTypes = {
  ...commonPropTypes,
  selected: PropTypes.bool,
  trailingAccessoryView: PropTypes.element,
};

BpkChip.defaultProps = {
  ...commonDefaultProps,
  selected: false,
  trailingAccessoryView: null,
};

export default withTheme(BpkChip);
