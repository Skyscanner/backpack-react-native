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
import BpkIcon from 'react-native-bpk-component-icon';
import {
  getThemeAttributes,
  withTheme,
  type Theme,
} from 'react-native-bpk-theming';
import {
  colorBlue500,
  colorGray100,
  colorGray300,
  colorGreen500,
  colorPink500,
  colorRed500,
  colorWhite,
} from 'bpk-tokens/tokens/base.react.native';

import BpkFlatButton from './BpkFlatButton.android';
import BpkBorderedButton from './BpkBorderedButton.android';
import BpkButtonInner from './BpkButtonInner';
import {
  type ButtonType,
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
  BUTTON_TYPES,
  ICON_ALIGNMENTS,
  REQUIRED_THEME_ATTRIBUTES,
} from './common-types';

export type Props = CommonProps;

const backgroundColors = {
  disabled: colorGray100,
  [BUTTON_TYPES.primary]: colorGreen500,
  [BUTTON_TYPES.featured]: colorPink500,
  [BUTTON_TYPES.secondary]: colorWhite,
  [BUTTON_TYPES.destructive]: colorWhite,
};

const borderColors = {
  disabled: colorGray100,
  [BUTTON_TYPES.secondary]: colorGray100,
  [BUTTON_TYPES.destructive]: colorGray100,
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
    return BpkFlatButton;
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
        backgroundColor: backgroundColors.disabled,
      };
    }
    return {
      backgroundColor: themeAttributes
        ? themeAttributes.buttonPrimaryGradientStartColor
        : backgroundColors.primary,
    };
  }
  if (type === BUTTON_TYPES.featured) {
    if (disabled) {
      return {
        backgroundColor: backgroundColors.disabled,
      };
    }
    return {
      backgroundColor: themeAttributes
        ? themeAttributes.buttonFeaturedGradientStartColor
        : backgroundColors.featured,
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
    typeof icon === 'string' ? <BpkIcon icon={icon} small /> : icon;

  return (
    <ButtonComponent
      disabled={disabled}
      title={title}
      icon={iconFinal}
      iconOnly={iconOnly}
      iconTrailing={iconAlignment === ICON_ALIGNMENTS.trailing}
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityTraits={accessibilityTraits}
      {...buttonColors}
      {...rest}
    >
      <BpkButtonInner
        large={false}
        icon={iconFinal}
        iconOnly={iconOnly}
        iconTrailing={iconAlignment === ICON_ALIGNMENTS.trailing}
        textColor={textColor}
        title={title}
      />
    </ButtonComponent>
  );
};

BpkButton.propTypes = commonPropTypes;
BpkButton.defaultProps = commonDefaultProps;

export default (withTheme(BpkButton): typeof BpkButton);
