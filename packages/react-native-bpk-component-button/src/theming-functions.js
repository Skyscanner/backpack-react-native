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

import { type Theme } from 'react-native-bpk-theming';
import {
  borderRadiusPill,
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

import { BUTTON_TYPES, type ButtonType } from './common-types';

function valueOrDefault<T>(
  haystack: ?Theme,
  needle: string,
  defaultValue: T,
): T {
  return (haystack && haystack[needle]) || defaultValue;
}

export const borderRadiusForTheme = (
  themeAttributes: ?Theme,
  iconOnly: boolean,
): number =>
  iconOnly
    ? borderRadiusPill
    : valueOrDefault(themeAttributes, 'buttonBorderRadius', borderRadiusPill);

export const backgroundColorForType = (
  type: ButtonType,
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  const backgroundColors = {
    [BUTTON_TYPES.primary]: colorGreen500,
    [BUTTON_TYPES.featured]: colorPink500,
    [BUTTON_TYPES.secondary]: colorWhite,
    [BUTTON_TYPES.destructive]: colorWhite,
  };

  const backgroundColorThemePropsMappedToType = {
    [BUTTON_TYPES.primary]: 'buttonPrimaryGradientStartColor',
    [BUTTON_TYPES.featured]: 'buttonFeaturedGradientStartColor',
    [BUTTON_TYPES.secondary]: 'buttonSecondaryBackgroundColor',
    [BUTTON_TYPES.destructive]: 'buttonDestructiveBackgroundColor',
  };

  if (disabled) {
    return colorGray100;
  }

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
    return colorGray100;
  }

  const gradientColors = {
    [BUTTON_TYPES.primary]: { start: colorGreen500, end: colorGreen600 },
    [BUTTON_TYPES.featured]: { start: colorPink500, end: colorPink600 },
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
    return colorGray300;
  }

  const textColors = {
    [BUTTON_TYPES.primary]: colorWhite,
    [BUTTON_TYPES.featured]: colorWhite,
    [BUTTON_TYPES.secondary]: colorBlue500,
    [BUTTON_TYPES.destructive]: colorRed500,
  };

  const textColorThemePropsMappedToType = {
    [BUTTON_TYPES.primary]: 'buttonPrimaryTextColor',
    [BUTTON_TYPES.featured]: 'buttonFeaturedTextColor',
    [BUTTON_TYPES.secondary]: 'buttonSecondaryTextColor',
    [BUTTON_TYPES.destructive]: 'buttonDestructiveTextColor',
  };

  return valueOrDefault(
    themeAttributes,
    textColorThemePropsMappedToType[type],
    textColors[type],
  );
};

export const borderColorForType = (
  type: 'secondary' | 'destructive',
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  if (disabled) {
    return colorGray100;
  }

  const borderColors = {
    [BUTTON_TYPES.secondary]: colorGray100,
    [BUTTON_TYPES.destructive]: colorGray100,
  };

  const borderColorThemePropsMappedToType = {
    [BUTTON_TYPES.secondary]: 'buttonSecondaryBorderColor',
    [BUTTON_TYPES.destructive]: 'buttonDestructiveBorderColor',
  };

  return valueOrDefault(
    themeAttributes,
    borderColorThemePropsMappedToType[type],
    borderColors[type],
  );
};
