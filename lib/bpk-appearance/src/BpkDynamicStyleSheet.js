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

/** @module BpkDynamicStyleSheet */

/* @flow */
import { StyleSheet } from 'react-native';
import type {
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

import { type ColorSchemeName } from './BpkAppearance';
import { isBpkDynamicValue } from './dynamic-value';
import type {
  BpkDynamicValue,
  BpkDynamicStyleSheetTypeEnhancer,
} from './common-types';

type ReactStylesProps = {|
  ...$Exact<TextStyle>,
  ...$Exact<ViewStyle>,
  ...$Exact<ImageStyle>,
|};

type EnhancedReactStylesProps = $Exact<
  $Call<BpkDynamicStyleSheetTypeEnhancer, ReactStylesProps>,
>;

export type BpkStyleSheetStyle = {|
  ...EnhancedReactStylesProps,
  // This is to ensure if we are missing any props in `EnhancedReactStylesProps` we
  // still keep them in the resulting style, although in this case without dynamic support
  ...$Diff<ReactStylesProps, EnhancedReactStylesProps>,
|};

export type BpkStyleSheetNamedStyles = {
  +[key: string]: BpkStyleSheetStyle | BpkDynamicValue<BpkStyleSheetStyle>,
};

export type BpkDynamicStyleProp<S: Object> = $ObjMap<S, (Object) => any>;
export type BpkDynamicStyle<S> = {
  light: BpkDynamicStyleProp<S>,
  dark: BpkDynamicStyleProp<S>,
};

function unpackValue<T>(
  value: T | BpkDynamicValue<T>,
  variation: ColorSchemeName,
): T {
  if (isBpkDynamicValue(value)) {
    return value[variation];
  }
  // $FlowFixMe
  return (value: T);
}

function extractDynamicValues(
  styleDef: BpkStyleSheetStyle,
  variation: ColorSchemeName,
) {
  return Object.keys(styleDef).reduce((mapped, key) => {
    mapped[key] = unpackValue(styleDef[key], variation); // eslint-disable-line no-param-reassign
    return mapped;
  }, {});
}

function extractStyleForVariation<+S: BpkStyleSheetNamedStyles>(
  style: S,
  variation: ColorSchemeName,
) {
  return Object.keys(style).reduce((mapped, topLevelKey) => {
    const styleDef = style[topLevelKey];
    if (styleDef == null) {
      mapped[topLevelKey] = styleDef; // eslint-disable-line no-param-reassign
      return mapped;
    }
    // $FlowFixMe
    const unpacked = unpackValue(styleDef, variation);
    mapped[topLevelKey] = extractDynamicValues(unpacked, variation); // eslint-disable-line no-param-reassign
    return mapped;
  }, {});
}

function memo<T>(compute: () => T): () => T {
  let cached = null;
  return function momoized(): T {
    if (cached == null) {
      cached = compute();
    }
    return cached;
  };
}

/**
 * Creates a new dynamic stylesheet that transforms all `BpkDynamicValues` into
 * a plain `StyleSheet` for each color scheme.
 *
 * This should generally be used in conjunction with `useBpkDynamicStyleSheet` hook.
 *
 * @example
 * BpkDynamicStyleSheet.create({
 *   view: {
 *     shadowColor: { light: '#fff', dark: '#ff0' },
 *   }
 * });
 *
 * @example
 * BpkDynamicStyleSheet.create({
 *   view: {
 *     light: {
 *       borderWidth: 1,
 *       borderColor: '#d6d7da',
 *     },
 *     dark: {
 *       backgroundColor: 'rgb(205, 205, 215)'
 *     },
 *   }
 * });
 *
 * @param {Object} obj a style containing dynamic values
 * @returns {BpkDynamicStyle} an object containing a plain stylesheet for each color scheme.
 */
function create<+S: BpkStyleSheetNamedStyles>(obj: S): BpkDynamicStyle<S> {
  const lazyLight = memo(() =>
    StyleSheet.create(extractStyleForVariation(obj, 'light')),
  );
  const lazyDark = memo(() =>
    StyleSheet.create(extractStyleForVariation(obj, 'dark')),
  );

  return {
    get light() {
      return lazyLight();
    },
    get dark() {
      return lazyDark();
    },
  };
}

export default {
  create,
};
