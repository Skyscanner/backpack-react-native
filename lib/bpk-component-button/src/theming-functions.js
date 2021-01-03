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

import {
  borderRadiusPill,
  borderRadiusSm,
  primaryColor,
  colorSkyBlue,
  colorSkyGrayTint02,
  colorSkyGrayTint04,
  colorSkyGrayTint06,
  colorBlackTint02,
  colorBlackTint04,
  colorBlackTint06,
  colorMonteverde,
  colorPanjin,
  colorWhite,
} from 'bpk-tokens/tokens/base.react.native';

import { type Theme } from '../../bpk-theming';

import { BUTTON_TYPES, type ButtonType } from './common-types';

const disabledBackgroundColor = {
  light: colorSkyGrayTint06,
  dark: colorBlackTint04,
};

const borderedButtonBackgroundColor = {
  light: colorWhite,
  dark: colorBlackTint02,
};

const borderedButtonBorderColor = {
  light: colorSkyGrayTint06,
  dark: colorSkyGrayTint02,
};

function valueOrDefault<T>(
  haystack: ?Theme,
  needle: ?string,
  defaultValue: T,
): T {
  if (!needle) {
    return defaultValue;
  }
  return (haystack && haystack[needle]) || defaultValue;
}

export const borderRadiusForTheme = (
  themeAttributes: ?Theme,
  iconOnly: boolean,
): number =>
  iconOnly
    ? borderRadiusPill
    : valueOrDefault(themeAttributes, 'buttonBorderRadius', borderRadiusSm);

export const backgroundColorForType = (
  type: ButtonType,
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  if (disabled) {
    return disabledBackgroundColor;
  }

  const backgroundColors = {
    [BUTTON_TYPES.primary]: colorMonteverde,
    [BUTTON_TYPES.featured]: colorSkyBlue,
    [BUTTON_TYPES.secondary]: borderedButtonBackgroundColor,
    [BUTTON_TYPES.destructive]: borderedButtonBackgroundColor,
    [BUTTON_TYPES.outline]: { dark: 'transparent', light: 'transparent' },
  };

  const backgroundColorThemePropsMappedToType = {
    [BUTTON_TYPES.primary]: 'buttonPrimaryGradientStartColor',
    [BUTTON_TYPES.featured]: 'buttonFeaturedGradientStartColor',
    [BUTTON_TYPES.secondary]: 'buttonSecondaryBackgroundColor',
    [BUTTON_TYPES.destructive]: 'buttonDestructiveBackgroundColor',
    [BUTTON_TYPES.outline]: null,
  };

  return valueOrDefault(
    themeAttributes,
    backgroundColorThemePropsMappedToType[type],
    backgroundColors[type],
  );
};

export const gradientColorForType = (
  gradientType: 'start' | 'end',
  buttonType: 'primary' | 'featured',
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  if (disabled) {
    return disabledBackgroundColor;
  }

  const gradientColors = {
    [BUTTON_TYPES.primary]: { start: colorMonteverde, end: colorMonteverde },
    [BUTTON_TYPES.featured]: { start: colorSkyBlue, end: colorSkyBlue },
  };

  const gradientColorThemePropsMappedToType = {
    [BUTTON_TYPES.primary]: {
      start: 'buttonPrimaryGradientStartColor',
      end: 'buttonPrimaryGradientEndColor',
    },
    [BUTTON_TYPES.featured]: {
      start: 'buttonFeaturedGradientStartColor',
      end: 'buttonFeaturedGradientEndColor',
    },
  };

  return valueOrDefault(
    themeAttributes,
    gradientColorThemePropsMappedToType[buttonType][gradientType],
    gradientColors[buttonType][gradientType],
  );
};

export const textColorForType = (
  type: ButtonType,
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  if (disabled) {
    return { light: colorSkyGrayTint04, dark: colorBlackTint06 };
  }

  const textColors = {
    [BUTTON_TYPES.primary]: colorWhite,
    [BUTTON_TYPES.featured]: colorWhite,
    [BUTTON_TYPES.secondary]: primaryColor,
    [BUTTON_TYPES.destructive]: colorPanjin,
    [BUTTON_TYPES.outline]: colorWhite,
  };

  const textColorThemePropsMappedToType = {
    [BUTTON_TYPES.primary]: 'buttonPrimaryTextColor',
    [BUTTON_TYPES.featured]: 'buttonFeaturedTextColor',
    [BUTTON_TYPES.secondary]: 'buttonSecondaryTextColor',
    [BUTTON_TYPES.destructive]: 'buttonDestructiveTextColor',
    [BUTTON_TYPES.outline]: null,
  };

  return valueOrDefault(
    themeAttributes,
    textColorThemePropsMappedToType[type],
    textColors[type],
  );
};

export const borderColorForType = (
  type: 'secondary' | 'destructive' | 'outline',
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  if (disabled) {
    return disabledBackgroundColor;
  }

  const borderColors = {
    [BUTTON_TYPES.secondary]: borderedButtonBorderColor,
    [BUTTON_TYPES.destructive]: borderedButtonBorderColor,
    [BUTTON_TYPES.outline]: colorWhite,
  };

  const borderColorThemePropsMappedToType = {
    [BUTTON_TYPES.secondary]: 'buttonSecondaryBorderColor',
    [BUTTON_TYPES.destructive]: 'buttonDestructiveBorderColor',
    [BUTTON_TYPES.outline]: null,
  };

  return valueOrDefault(
    themeAttributes,
    borderColorThemePropsMappedToType[type],
    borderColors[type],
  );
};
