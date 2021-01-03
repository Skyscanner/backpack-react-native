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

import { type BpkAppearancePreferences } from './BpkAppearance';
import { type UnpackedBpkDynamicValue } from './common-types';

/**
 * Check if a value is a `BpkDynamicValue`
 *
 * @param {mixed} value the value to be checked
 * @returns {boolean} true if is a `BpkDynamicValue` or false otherwise
 */
const isBpkDynamicValue = (value: any): boolean %checks =>
  // %checks doesn't work unless we use double negation https://github.com/facebook/flow/issues/8194
  value != null &&
  typeof value === 'object' &&
  Object.prototype.hasOwnProperty.call(value, 'light') &&
  Object.prototype.hasOwnProperty.call(value, 'dark');

/**
 * Takes in a `BpkDynamicValue` and returns the correct value for provided appearance.
 *
 * @example
 * const color = unpackBpkDynamicValue({ light: 'black', dark: 'white' }, bpkAppearance)
 *
 * @param {mixed} value a dynamic value.
 * @param {Object} appearance the appearance preferences.
 * @returns {mixed} the value for the current color scheme.
 *                  If `value` is not a valid dynamic value it will be returned back
 */
function unpackBpkDynamicValue<T>(
  value: T,
  appearance: BpkAppearancePreferences,
): UnpackedBpkDynamicValue<T> {
  if (isBpkDynamicValue(value)) {
    return value[appearance.colorScheme || 'light'];
  }
  return value;
}

/**
 * Takes in a style object and returns the correct value for all properties,
 * based on the current color scheme as provided by the nearest [BpkAppearanceProvider]
 *
 * @example
 * const style = unpackBpkDynamicStyle(
 *  {
 *    color: { light: 'black', dark: 'white' },
 *    flex: 1,
 *  },
 *  appearance
 *);
 *
 * @param {Object} style the style object
 * @param {Object} appearance the appearance preferences.
 * @returns {Object} object with mapped properties for the current color scheme
 */
function unpackBpkDynamicStyle<T: {}>(
  style: T,
  appearance: BpkAppearancePreferences,
): $ObjMap<T, <X>(item: X) => UnpackedBpkDynamicValue<X>> {
  return Object.keys(style).reduce((mapped, propName) => {
    const prop = style[propName];
    if (isBpkDynamicValue(prop)) {
      return { ...mapped, [propName]: unpackBpkDynamicValue(prop, appearance) };
    }
    return { ...mapped, [propName]: prop };
  }, {});
}

export { isBpkDynamicValue, unpackBpkDynamicValue, unpackBpkDynamicStyle };
