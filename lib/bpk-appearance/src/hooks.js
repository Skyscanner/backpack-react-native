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
import { useContext } from 'react';

import {
  type ColorSchemeName,
  type BpkAppearancePreferences,
} from './BpkAppearance';
import type {
  BpkDynamicStyle,
  BpkDynamicStyleProp,
} from './BpkDynamicStyleSheet';
import { BpkAppearanceProviderContext } from './BpkAppearanceProvider';
import { unpackBpkDynamicValue, unpackBpkDynamicStyle } from './dynamic-value';
import type { UnpackedBpkDynamicValue } from './common-types';

/**
 * Fetch the current appearance as provided by the nearest [BpkAppearanceProvider]
 *
 * @return {BpkAppearancePreferences} the current appearance
 */
export function useBpkAppearance(): BpkAppearancePreferences {
  return useContext(BpkAppearanceProviderContext);
}

/**
 * Fetch the current color scheme as provided by the nearest [BpkAppearanceProvider]
 *
 * @return {ColorSchemeName} the current color scheme
 */
export function useBpkColorScheme(): ColorSchemeName {
  return useBpkAppearance().colorScheme || 'light';
}

/**
 * Takes in a `BpkDynamicValue` and returns the correct value for the
 * current color scheme as provided by the nearest [BpkAppearanceProvider]
 *
 * @example
 * const color = useBpkDynamicValue({ light: 'black', dark: 'white' })
 *
 * @param {Object} value a dynamic value.
 * @returns {mixed} the value for the current color scheme.
 *                  If `value` is not a valid dynamic value it will be returned back
 */
export function useBpkDynamicValue<T>(value: T): UnpackedBpkDynamicValue<T> {
  return unpackBpkDynamicValue(value, useBpkAppearance());
}

/**
 * Takes in a style object and returns the correct value for all properties,
 * based on the current color scheme as provided by the nearest [BpkAppearanceProvider]
 *
 * @example
 * const color = useBpkDynamicStyle({
 *  color: { light: 'black', dark: 'white' },
 *  flex: 1,
 * });
 *
 * @param {Object} style the style object
 * @returns {Object} object with mapped properties for the current color scheme
 */
export function useBpkDynamicStyle<T: {}>(
  style: T,
): $ObjMap<T, <X>(item: X) => UnpackedBpkDynamicValue<X>> {
  return unpackBpkDynamicStyle(style, useBpkAppearance());
}

/**
 * Takes in a `BpkDynamicStyleSheet` and returns the correct value for
 * the current color scheme as provided by the nearest [BpkAppearanceProvider]
 *
 * @example
 * const dynamicStyles = BpkDynamicStyleSheet.create({
 *  color: { light: 'black', dark: 'white' },
 *  flex: 1,
 * })
 * const styles = useBpkDynamicStyleSheet(dynamicStyles);
 *
 * @param {BpkDynamicStyle} style the dynamic stylesheet
 * @returns {BpkDynamicStyleProp} the current stylesheet
 */
export function useBpkDynamicStyleSheet<T: {}>(
  style: BpkDynamicStyle<T>,
): BpkDynamicStyleProp<T> {
  return useBpkDynamicValue(style);
}
