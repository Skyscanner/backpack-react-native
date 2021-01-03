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
import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import {
  colorSkyGray,
  colorSkyGrayTint07,
  colorErfoud,
  colorGlencoe,
  colorPanjin,
  colorWhite,
  borderRadiusXs,
  borderSizeSm,
  spacingSm,
  spacingMd,
} from 'bpk-tokens/tokens/base.react.native';
import { View, ViewPropTypes, StyleSheet } from 'react-native';

import { getThemeAttributes, withTheme, type Theme } from '../../bpk-theming';
import BpkText from '../../bpk-component-text';

import { REQUIRED_THEME_ATTRIBUTES, themePropType } from './theming';

const styles = StyleSheet.create({
  viewBase: {
    alignItems: 'center',
    paddingHorizontal: spacingMd,
    height: spacingSm * 5,
    justifyContent: 'center',
  },
  viewBaseWithLeadingAccessoryView: {
    flexDirection: 'row',
  },
  viewBaseWithTrailingAccessoryView: {
    flexDirection: 'row-reverse',
  },
  viewWarning: {
    backgroundColor: colorErfoud,
  },
  viewSuccess: {
    backgroundColor: colorGlencoe,
  },
  viewDestructive: {
    backgroundColor: colorPanjin,
  },
  viewLight: {
    backgroundColor: colorSkyGrayTint07,
  },
  viewInverse: {
    backgroundColor: colorWhite,
  },
  viewOutline: {
    paddingHorizontal: spacingMd - borderSizeSm,
    backgroundColor: setOpacity(colorWhite, 0.2),
  },
  textBase: {
    color: colorSkyGray,
    includeFontPadding: false,
  },
  textDestructive: {
    color: colorWhite,
  },
  textOutline: {
    color: colorWhite,
  },
  textWithLeadingAccessoryView: {
    marginStart: spacingSm,
  },
  textWithTrailingAccessoryView: {
    marginEnd: spacingSm,
  },
  borderBase: {
    borderTopLeftRadius: borderRadiusXs,
    borderBottomLeftRadius: borderRadiusXs,
    borderTopRightRadius: borderRadiusXs,
    borderBottomRightRadius: borderRadiusXs,
  },
  borderOutline: {
    borderWidth: borderSizeSm,
    borderColor: colorWhite,
  },
  borderLeft: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: borderRadiusXs,
  },
  borderRight: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: borderRadiusXs,
    borderBottomRightRadius: 0,
  },
});

export const BADGE_TYPES = {
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  light: 'light',
  inverse: 'inverse',
  outline: 'outline',
};

export const BADGE_DOCKED_TYPES = {
  start: 'start',
  end: 'end',
};

export const BADGE_ACCESSORY_VIEW_ALIGNMENTS = {
  leading: 'leading',
  trailing: 'trailing',
};

export type Props = {
  type: $Keys<typeof BADGE_TYPES>,
  accessoryViewAlignment: $Keys<typeof BADGE_ACCESSORY_VIEW_ALIGNMENTS>,
  accessibilityLabel: ?string,
  accessoryView: ?Element<*>,
  docked: ?$Keys<typeof BADGE_DOCKED_TYPES>,
  message: ?string,
  style: ?(Object | Array<Object>),
  theme: ?Theme,
};

const viewStyleMap: { [key: string]: Object | Array<Object> } = {
  [BADGE_TYPES.success]: styles.viewSuccess,
  [BADGE_TYPES.warning]: styles.viewWarning,
  [BADGE_TYPES.destructive]: styles.viewDestructive,
  [BADGE_TYPES.light]: styles.viewLight,
  [BADGE_TYPES.inverse]: styles.viewInverse,
  [BADGE_TYPES.outline]: [styles.viewOutline, styles.borderOutline],
};

const textStyleMap: { [key: string]: Object | Array<Object> } = {
  [BADGE_TYPES.destructive]: styles.textDestructive,
  [BADGE_TYPES.outline]: styles.textOutline,
};

const BpkBadge = (props: Props) => {
  const {
    accessoryView,
    accessoryViewAlignment,
    accessibilityLabel,
    message,
    docked,
    type,
    style: userStyle,
    theme,
  } = props;

  const viewStyle = [styles.viewBase, styles.borderBase];
  const textStyle = [styles.textBase];

  if (accessoryView) {
    viewStyle.push(
      accessoryViewAlignment === BADGE_ACCESSORY_VIEW_ALIGNMENTS.leading
        ? styles.viewBaseWithLeadingAccessoryView
        : styles.viewBaseWithTrailingAccessoryView,
    );
  }

  viewStyle.push(viewStyleMap[type]);
  textStyle.push(textStyleMap[type]);

  const themeAttributes = {
    ...getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme),
  };

  const applySuccessTheme =
    type === BADGE_TYPES.success &&
    themeAttributes.badgeSuccessBackgroundColor &&
    themeAttributes.badgeSuccessTextColor;
  if (applySuccessTheme) {
    viewStyle.push({
      backgroundColor: themeAttributes.badgeSuccessBackgroundColor,
    });
    textStyle.push({
      color: themeAttributes.badgeSuccessTextColor,
    });
  }

  const applyWarningTheme =
    type === BADGE_TYPES.warning &&
    themeAttributes.badgeWarningBackgroundColor &&
    themeAttributes.badgeWarningTextColor;
  if (applyWarningTheme) {
    viewStyle.push({
      backgroundColor: themeAttributes.badgeWarningBackgroundColor,
    });
    textStyle.push({
      color: themeAttributes.badgeWarningTextColor,
    });
  }

  const applyDestructiveTheme =
    type === BADGE_TYPES.destructive &&
    themeAttributes.badgeDestructiveBackgroundColor &&
    themeAttributes.badgeDestructiveTextColor;
  if (applyDestructiveTheme) {
    viewStyle.push({
      backgroundColor: themeAttributes.badgeDestructiveBackgroundColor,
    });
    textStyle.push({
      color: themeAttributes.badgeDestructiveTextColor,
    });
  }

  if (docked === BADGE_DOCKED_TYPES.start) {
    viewStyle.push(styles.borderLeft);
  }

  if (docked === BADGE_DOCKED_TYPES.end) {
    viewStyle.push(styles.borderRight);
  }

  if (userStyle) {
    viewStyle.push(userStyle);
  }

  const accessoryViewItemStyle = textStyle.slice(0);
  const adjustedAccessoryView =
    accessoryView &&
    React.cloneElement(accessoryView, {
      itemStyle: accessoryViewItemStyle,
    });

  if (accessoryView) {
    textStyle.push(
      accessoryViewAlignment === BADGE_ACCESSORY_VIEW_ALIGNMENTS.leading
        ? styles.textWithLeadingAccessoryView
        : styles.textWithTrailingAccessoryView,
    );
  }

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel || message}
      accessibilityRole="text"
      style={viewStyle}
    >
      {adjustedAccessoryView}
      {message && (
        <BpkText allowFontScaling={false} style={textStyle} textStyle="xs">
          {message}
        </BpkText>
      )}
    </View>
  );
};

const accessibilityLabelPropType = (
  props: { [string]: any },
  propName: string,
  componentName: string,
  ...rest: [any]
) => {
  if (!props[propName] && !props.message) {
    return new Error(
      `${componentName}: "accessibilityLabel" is required when "message" is not provided.`,
    );
  }
  return PropTypes.string(props, propName, componentName, ...rest);
};

BpkBadge.propTypes = {
  accessibilityLabel: accessibilityLabelPropType,
  accessoryView: PropTypes.element,
  accessoryViewAlignment: PropTypes.oneOf(
    Object.keys(BADGE_ACCESSORY_VIEW_ALIGNMENTS),
  ),
  docked: PropTypes.oneOf(Object.keys(BADGE_DOCKED_TYPES)),
  message: PropTypes.string,
  style: ViewPropTypes.style,
  type: PropTypes.oneOf(Object.keys(BADGE_TYPES)),
  theme: themePropType,
};

BpkBadge.defaultProps = {
  accessibilityLabel: null,
  accessoryView: null,
  accessoryViewAlignment: BADGE_ACCESSORY_VIEW_ALIGNMENTS.leading,
  docked: null,
  message: null,
  style: null,
  type: BADGE_TYPES.warning,
  theme: null,
};

export default (withTheme(BpkBadge): typeof BpkBadge);
