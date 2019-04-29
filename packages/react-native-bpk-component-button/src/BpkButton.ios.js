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

import React, { type Element, type ElementProps } from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import BpkIcon from 'react-native-bpk-component-icon';
import {
  getThemeAttributes,
  makeThemePropType,
  withTheme,
  type Theme,
} from 'react-native-bpk-theming';
import {
  colorBlue500,
  colorGray100,
  colorGray300,
  colorGreen500,
  colorGreen600,
  colorPink500,
  colorPink600,
  colorRed500,
  colorWhite,
} from 'bpk-tokens/tokens/base.react.native';

import BpkGradientButton from './BpkGradientButton';
import BpkBorderedButton from './BpkBorderedButton';
import BpkButtonInner from './BpkButtonInner';
import { BUTTON_TYPES, ICON_ALIGNMENTS } from './common-types';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const REQUIRED_THEME_ATTRIBUTES = {
  primary: [
    'buttonPrimaryTextColor',
    'buttonPrimaryGradientStartColor',
    'buttonPrimaryGradientEndColor',
  ],
  secondary: [
    'buttonSecondaryTextColor',
    'buttonSecondaryBackgroundColor',
    'buttonSecondaryBorderColor',
  ],
  destructive: [
    'buttonDestructiveTextColor',
    'buttonDestructiveBackgroundColor',
    'buttonDestructiveBorderColor',
  ],
  featured: [
    'buttonFeaturedTextColor',
    'buttonFeaturedGradientStartColor',
    'buttonFeaturedGradientEndColor',
  ],
};

export type ButtonType = $Keys<typeof BUTTON_TYPES>;

export type Props = {
  disabled: boolean,
  iconAlignment: $Keys<typeof ICON_ALIGNMENTS>,
  iconOnly: boolean,
  large: boolean,
  style: ViewStyleProp,
  title: string,
  type: ButtonType,
  accessibilityLabel: ?string,
  icon: ?(string | Element<typeof BpkIcon>),
  theme: ?Theme,
};

const backgroundColors = {
  disabled: colorGray100,
  [BUTTON_TYPES.secondary]: colorWhite,
  [BUTTON_TYPES.destructive]: colorWhite,
};

const borderColors = {
  disabled: colorGray100,
  [BUTTON_TYPES.secondary]: colorGray100,
  [BUTTON_TYPES.destructive]: colorGray100,
};

const gradientColors = {
  [BUTTON_TYPES.primary]: { start: colorGreen500, end: colorGreen600 },
  [BUTTON_TYPES.featured]: { start: colorPink500, end: colorPink600 },
};

const textColors = {
  [BUTTON_TYPES.primary]: colorWhite,
  [BUTTON_TYPES.featured]: colorWhite,
  [BUTTON_TYPES.secondary]: colorBlue500,
  [BUTTON_TYPES.destructive]: colorRed500,
  disabled: colorGray300,
};

const getButtonComponent = (type: ButtonType) => {
  if (type === BUTTON_TYPES.primary || type === BUTTON_TYPES.featured) {
    return BpkGradientButton;
  }
  return BpkBorderedButton;
};

const getButtonColors = (
  type: ButtonType,
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  if (type === BUTTON_TYPES.primary) {
    if (disabled) {
      return {
        gradientStartColor: backgroundColors.disabled,
        gradientEndColor: backgroundColors.disabled,
      };
    }
    return themeAttributes
      ? {
          gradientStartColor: themeAttributes.buttonPrimaryGradientStartColor,
          gradientEndColor: themeAttributes.buttonPrimaryGradientEndColor,
        }
      : {
          gradientStartColor: gradientColors.primary.start,
          gradientEndColor: gradientColors.primary.end,
        };
  }
  if (type === BUTTON_TYPES.featured) {
    if (disabled) {
      return {
        gradientStartColor: backgroundColors.disabled,
        gradientEndColor: backgroundColors.disabled,
      };
    }
    return themeAttributes
      ? {
          gradientStartColor: themeAttributes.buttonFeaturedGradientStartColor,
          gradientEndColor: themeAttributes.buttonFeaturedGradientEndColor,
        }
      : {
          gradientStartColor: gradientColors.featured.start,
          gradientEndColor: gradientColors.featured.end,
        };
  }
  if (type === BUTTON_TYPES.secondary) {
    if (disabled) {
      return {
        backgroundColor: backgroundColors.disabled,
        borderColor: borderColors.disabled,
      };
    }
    return themeAttributes
      ? {
          backgroundColor: themeAttributes.buttonSecondaryBackgroundColor,
          borderColor: themeAttributes.buttonSecondaryBorderColor,
        }
      : {
          backgroundColor: backgroundColors.secondary,
          borderColor: borderColors.secondary,
        };
  }
  if (disabled) {
    return {
      backgroundColor: backgroundColors.disabled,
      borderColor: borderColors.disabled,
    };
  }
  return themeAttributes
    ? {
        backgroundColor: themeAttributes.buttonDestructiveBackgroundColor,
        borderColor: themeAttributes.buttonDestructiveBorderColor,
      }
    : {
        backgroundColor: backgroundColors.destructive,
        borderColor: borderColors.destructive,
      };
};

const getTextColor = (
  type: ButtonType,
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  if (disabled) {
    return textColors.disabled;
  }
  switch (type) {
    case BUTTON_TYPES.primary:
      return themeAttributes
        ? themeAttributes.buttonPrimaryTextColor
        : textColors.primary;
    case BUTTON_TYPES.featured:
      return themeAttributes
        ? themeAttributes.buttonFeaturedTextColor
        : textColors.featured;
    case BUTTON_TYPES.secondary:
      return themeAttributes
        ? themeAttributes.buttonSecondaryTextColor
        : textColors.secondary;
    default:
      return themeAttributes
        ? themeAttributes.buttonDestructiveTextColor
        : textColors.destructive;
  }
};

const BpkButton = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconAlignment,
    iconOnly,
    large,
    theme,
    title,
    type,
    ...rest
  } = props;

  if (!Object.keys(BUTTON_TYPES).includes(type)) {
    throw new Error(
      `"${type}" is not a valid button type. Valid types are ${Object.keys(
        BUTTON_TYPES,
      ).join(', ')}`,
    );
  }

  const themeAttributes = getThemeAttributes(
    REQUIRED_THEME_ATTRIBUTES[type],
    theme,
  );

  const ButtonComponent = getButtonComponent(type);
  const buttonColors = getButtonColors(type, themeAttributes, disabled);
  const textColor = getTextColor(type, themeAttributes, disabled);

  const accessibilityTraits = ['button'];
  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  // Icons can be passed in as a string or a BpkIcon. This normalises it
  // so the inner component is always given a BpkIcon.
  const iconFinal =
    typeof icon === 'string' ? <BpkIcon icon={icon} small={!large} /> : icon;

  return (
    <ButtonComponent
      disabled={disabled}
      title={title}
      icon={iconFinal}
      iconOnly={iconOnly}
      large={large}
      iconTrailing={iconAlignment === ICON_ALIGNMENTS.trailing}
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityTraits={accessibilityTraits}
      {...buttonColors}
      {...rest}
    >
      <BpkButtonInner
        icon={iconFinal}
        iconOnly={iconOnly}
        iconTrailing={iconAlignment === ICON_ALIGNMENTS.trailing}
        large={large}
        textColor={textColor}
        title={title}
      />
    </ButtonComponent>
  );
};

const themePropType = (
  props: Object,
  propName: string,
  componentName: string,
  ...rest: { [string]: any }
) => {
  const { type } = props;
  return makeThemePropType(REQUIRED_THEME_ATTRIBUTES[type])(
    props,
    propName,
    componentName,
    ...rest,
  );
};

BpkButton.propTypes = {
  title: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconAlignment: PropTypes.oneOf(Object.keys(ICON_ALIGNMENTS)),
  iconOnly: PropTypes.bool,
  large: PropTypes.bool,
  style: ViewPropTypes.style,
  theme: themePropType,
  type: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
};

BpkButton.defaultProps = {
  accessibilityLabel: null,
  disabled: false,
  icon: null,
  iconAlignment: ICON_ALIGNMENTS.trailing,
  iconOnly: false,
  large: false,
  style: null,
  theme: null,
  type: BUTTON_TYPES.primary,
};

export { BUTTON_TYPES, ICON_ALIGNMENTS };
export default (withTheme(BpkButton): typeof BpkButton);
