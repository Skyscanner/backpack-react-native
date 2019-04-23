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

const theme = {
  contentColor: londonTheme.secondaryColor500,
  contentGray: londonTheme.secondaryColor300,
  secondaryColor: londonTheme.secondaryColor500,
  // Because it's a theme, Backpack tokens shouldn't be used.
  // eslint-disable-next-line backpack/use-tokens
  backgroundColor: '#fff',
  brandColors: {
    gradientStart: londonTheme.primaryColor500,
    gradientEnd: londonTheme.primaryColor600,
  },
};

const themeAttributes = {
  // Used in BpkButton.
  buttonPrimaryGradientStartColor: theme.brandColors.gradientStart,
  buttonPrimaryGradientEndColor: theme.brandColors.gradientEnd,
  buttonPrimaryTextColor: theme.contentColor,
  buttonSecondaryBackgroundColor: theme.backgroundColor,
  buttonSecondaryTextColor: theme.contentColor,
  buttonSecondaryBorderColor: theme.contentColor,
  buttonDestructiveBackgroundColor: theme.brandColors.gradientStart,
  buttonDestructiveTextColor: theme.backgroundColor,
  buttonDestructiveBorderColor: theme.contentColor,
  buttonFeaturedGradientStartColor: theme.contentColor,
  buttonFeaturedGradientEndColor: theme.brandColors.gradientStart,
  buttonFeaturedTextColor: theme.backgroundColor,
  buttonLinkTextColor: theme.contentColor,

  // Used in BpkChip.
  chipSelectedBackgroundColor: theme.contentColor,
  chipSelectedTextColor: theme.backgroundColor,

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
  navigationBarStatusBarStyle: 'dark-content',
  navigationBarShadowColor: theme.brandColors.gradientEnd,
  navigationBarPrimaryColor: theme.secondaryColor,

  // Used in BpkProgress
  progressFillBackgroundColor: theme.contentColor,
  progressTrackBackgroundColor: theme.contentGray,

  // Used in BpkText
  textFontFamily: Platform.OS === 'ios' ? 'Courier' : 'serif-monospace',

  // Used in BpkFlatList and BpkSectionList
  flatListSelectedItemColor: theme.brandColors.gradientStart,

  // Used in BpkTextInput
  textInputFocusedColor: theme.contentColor,
};

export default themeAttributes;
