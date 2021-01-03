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

import { StyleSheet, I18nManager } from 'react-native';
import AnimatedValue from 'react-native/Libraries/Animated/src/nodes/AnimatedValue';
import {
  borderSizeSm,
  primaryColor,
  lineDarkColor,
  colorBlackTint05,
  colorSkyGrayTint06,
  colorSkyGrayTint05,
  colorSkyGrayTint04,
  textSecondaryColor,
  textPrimaryColor,
  colorPanjin,
  fontFamily,
  spacingMd,
  spacingSm,
  lineHeightSm,
  lineHeightBase,
  textBaseFontSize,
  textBaseFontWeight,
  textSmFontSize,
  textSmFontWeight,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  unpackBpkDynamicValue,
  type BpkAppearancePreferences,
  type BpkDynamicStyleProp,
  type BpkDynamicValue,
} from '../../bpk-appearance';

const disabledColor = { light: colorSkyGrayTint06, dark: colorBlackTint05 };
const notFocusedColor = colorSkyGrayTint04;
const underlineColor = { light: colorSkyGrayTint06, dark: lineDarkColor };
const placeholderColor = {
  light: colorSkyGrayTint05,
  dark: colorSkyGrayTint04,
};

const INPUT_RANGE = [0, 1];

type LabelTypography = {| size: number, lineHeight: number, weight: string |};
const LARGE_LABEL_TYPOGRAPHY: LabelTypography = {
  size: textBaseFontSize,
  lineHeight: lineHeightBase,
  weight: textBaseFontWeight,
};

const SMALL_LABEL_TYPOGRAPHY: LabelTypography = {
  size: textSmFontSize,
  lineHeight: lineHeightSm,
  weight: textSmFontWeight,
};

// To increase the vertical spacing a bit.
const minHeight = lineHeightBase + spacingMd;

const styles = BpkDynamicStyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    paddingTop: lineHeightSm,
  },
  input: {
    flex: 1,
    paddingHorizontal: 0, // To override Android default padding.
    paddingVertical: spacingSm,
    minHeight,
    fontSize: textBaseFontSize,
    fontWeight: textBaseFontWeight,
    color: textPrimaryColor,
    borderBottomWidth: 0,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  validationMessage: {
    color: colorPanjin,
    paddingTop: spacingSm,
  },
  description: {
    color: textSecondaryColor,
    paddingTop: spacingSm,
  },
});

const getStyles = (
  bpkAppearance: BpkAppearancePreferences,
): BpkDynamicStyleProp<any> => unpackBpkDynamicValue(styles, bpkAppearance);

// Created in a separate StyleSheet as they are not exported.
const animatedStyles = StyleSheet.create({
  label: {
    fontFamily,
    position: 'absolute',
  },
  inputContainerWithAccessoryView: {
    marginStart: spacingSm,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: borderSizeSm,
  },
});

const getLabelColorValue = (
  value: string,
  valid: ?boolean,
  editable: boolean,
  hasAccessoryView: boolean,
  bpkAppearance: BpkAppearancePreferences,
) => {
  if (!editable) {
    return unpackBpkDynamicValue(disabledColor, bpkAppearance);
  }
  if (!value && !hasAccessoryView) {
    return unpackBpkDynamicValue(notFocusedColor, bpkAppearance);
  }
  return valid === false
    ? colorPanjin
    : unpackBpkDynamicValue(textSecondaryColor, bpkAppearance);
};

const getLabelPosition = (hasAccessoryView: boolean): number =>
  hasAccessoryView ? 0 : lineHeightSm + (spacingSm - borderSizeSm);

const getLabelTypography = (
  hasAccessoryView: boolean,
): {| size: number, lineHeight: number, weight: string |} =>
  hasAccessoryView ? SMALL_LABEL_TYPOGRAPHY : LARGE_LABEL_TYPOGRAPHY;

const getLabelStyle = (
  animatedColorValue: AnimatedValue,
  animatedLabelValue: AnimatedValue,
  {
    value,
    valid,
    editable,
    hasAccessoryView,
  }: {
    value: string,
    valid: ?boolean,
    editable: boolean,
    hasAccessoryView: boolean,
  },
  focusedColor: string | BpkDynamicValue<string> = primaryColor,
  bpkAppearance: BpkAppearancePreferences,
) => {
  const labelTypography = getLabelTypography(hasAccessoryView);
  const animatedStyle = {
    color: animatedColorValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        getLabelColorValue(
          value,
          valid,
          editable,
          hasAccessoryView,
          bpkAppearance,
        ),
        unpackBpkDynamicValue(focusedColor, bpkAppearance),
      ],
    }),
    top: animatedLabelValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [0, getLabelPosition(hasAccessoryView)],
    }),
    fontSize: animatedLabelValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [SMALL_LABEL_TYPOGRAPHY.size, labelTypography.size],
    }),
    lineHeight: animatedLabelValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        SMALL_LABEL_TYPOGRAPHY.lineHeight,
        labelTypography.lineHeight,
      ],
    }),
    fontWeight: animatedLabelValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [LARGE_LABEL_TYPOGRAPHY.weight, labelTypography.weight],
    }),
  };
  return [animatedStyles.label, animatedStyle];
};

const getInputContainerStyle = (
  animatedColorValue: AnimatedValue,
  hasAccessoryView: boolean,
  valid: ?boolean,
  focusedColor: string | BpkDynamicValue<string> = primaryColor,
  bpkAppearance: BpkAppearancePreferences,
) => {
  const underlineColorValue =
    valid === false
      ? colorPanjin
      : unpackBpkDynamicValue(underlineColor, bpkAppearance);

  const animatedStyle = {
    borderBottomColor: animatedColorValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        underlineColorValue,
        unpackBpkDynamicValue(focusedColor, bpkAppearance),
      ],
    }),
  };
  const result = [animatedStyles.inputContainer, animatedStyle];
  if (hasAccessoryView) {
    result.push(animatedStyles.inputContainerWithAccessoryView);
  }

  return result;
};

const getPlaceholderColor = (bpkAppearance: BpkAppearancePreferences) =>
  unpackBpkDynamicValue<typeof textSecondaryColor>(
    placeholderColor,
    bpkAppearance,
  );

export {
  getLabelStyle,
  getInputContainerStyle,
  getPlaceholderColor,
  getStyles,
};
