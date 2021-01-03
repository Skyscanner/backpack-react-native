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

import { Platform } from 'react-native';

const londonTheme = {
  primaryColor300: '#F28494',
  primaryColor500: '#ED1B28',
  primaryColor600: '#D11622',
  primaryColor700: '#B1121C',
  secondaryColor300: '#6889AB',
  secondaryColor500: '#013A76',
  secondaryColor600: '#002F61',
  secondaryColor700: '#00254B',
};

// Because it's a theme, Backpack tokens shouldn't be used.
/* eslint-disable backpack/use-tokens */
const theme = {
  contentColor: londonTheme.secondaryColor500,
  contentGray: londonTheme.secondaryColor300,
  secondaryColor: londonTheme.secondaryColor500,
  backgroundColor: '#fff',
  brandColors: {
    gradientStart: londonTheme.primaryColor500,
    gradientEnd: londonTheme.primaryColor600,
  },
  borderRadius: 8,
};
/* eslint-enable backpack/use-tokens */

const themeAttributes = {
  // Used for color theming
  colorGray50: '#F1F2F8',
  colorSkyGrayTint06: '#DDDDE5',
  colorSkyGrayTint05: '#CDCDD7',
  colorSkyGrayTint04: '#B2B2BF',
  colorSkyGrayTint03: '#8F90A0',
  colorSkyGrayTint02: '#68697F',
  colorSkyGrayTint01: '#444560',
  colorSkyGray: '#111236',

  // Used in BpkButton.
  buttonPrimaryGradientStartColor: theme.brandColors.gradientStart,
  buttonPrimaryGradientEndColor: theme.brandColors.gradientEnd,
  buttonPrimaryTextColor: theme.contentColor,

  buttonSecondaryBackgroundColor: theme.backgroundColor,
  buttonSecondaryTextColor: theme.contentColor,
  buttonSecondaryBorderColor: theme.contentColor,

  buttonDestructiveBackgroundColor: theme.brandColors.gradientStart,
  buttonDestructiveTextColor: theme.backgroundColor,
  buttonDestructiveBorderColor: theme.brandColors.gradientStart,

  buttonFeaturedGradientStartColor: theme.contentColor,
  buttonFeaturedGradientEndColor: theme.brandColors.gradientStart,
  buttonFeaturedTextColor: theme.backgroundColor,

  buttonLinkTextColor: theme.contentColor,

  buttonBorderRadius: theme.borderRadius,

  // Used in BpkChip.
  chipSelectedBackgroundColor: theme.contentColor,
  chipSelectedTextColor: theme.backgroundColor,
  chipOutlineSelectedBackgroundColor: theme.brandColors.gradientStart,
  chipOutlineSelectedTextColor: theme.contentColor,

  // Used in BpkBadge.
  badgeSuccessBackgroundColor: 'blue',
  badgeWarningBackgroundColor: 'yellow',
  badgeDestructiveBackgroundColor: 'purple',
  badgeSuccessTextColor: 'white',
  badgeWarningTextColor: 'blue',
  badgeDestructiveTextColor: 'black',

  // Used in BpkHorizontalNavItem.
  horizontalNavSelectedTextColor: theme.contentColor,

  // Used in BpkSpinner.
  spinnerPrimaryColor: theme.contentColor,

  // Used in BpkSwitch.
  switchPrimaryColor: theme.contentColor,

  // Used in BpkNavigationBar
  navigationBarBackgroundColor: theme.brandColors.gradientStart,
  navigationBarTintColor: theme.contentColor,
  navigationBarDisabledTintColor: theme.contentGray,
  navigationBarStatusBarColor: theme.brandColors.gradientEnd,
  navigationBarShadowColor: theme.brandColors.gradientEnd,
  navigationBarPrimaryColor: theme.secondaryColor,

  // Used in BpkProgress
  progressFillBackgroundColor: theme.contentColor,
  progressTrackBackgroundColor: theme.contentGray,

  // Used in BpkStarRating
  starColor: theme.contentGray,
  starFilledColor: theme.contentColor,

  // Used in BpkText
  textFontFamily: Platform.OS === 'ios' ? 'Courier' : 'serif-monospace',

  // Used in BpkTextLink
  textLinkColor: theme.brandColors.contentColor,

  // Used in BpkFlatList and BpkSectionList
  flatListSelectedItemColor: theme.brandColors.gradientStart,

  // Used in BpkTextInput
  textInputFocusedColor: theme.contentColor,
};

export default themeAttributes;
