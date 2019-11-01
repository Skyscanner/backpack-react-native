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
import { StyleSheet } from 'react-native';
import type {
  ViewStyle,
  TextStyle,
  ImageStyle,
  TypeForStyleKey,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

import { type ColorSchemeName } from './BpkAppearance';

type AllStylesProps = {
  ...$Exact<TextStyle>,
  ...$Exact<ViewStyle>,
  ...$Exact<ImageStyle>,
};

type SenanticColor = { light: string, dark: string };
type ColorValue<+key: $Keys<AllStylesProps>> =
  | TypeForStyleKey<key>
  | SenanticColor;

export type BpkStyleSheetStyle = {|
  ...$Exact<AllStylesProps>,
  shadowColor?: ColorValue<'shadowColor'>,
  backgroundColor?: ColorValue<'backgroundColor'>,
  borderColor?: ColorValue<'borderColor'>,
  borderBottomColor?: ColorValue<'borderBottomColor'>,
  borderEndColor?: ColorValue<'borderEndColor'>,
  borderLeftColor?: ColorValue<'borderLeftColor'>,
  borderRightColor?: ColorValue<'borderRightColor'>,
  borderStartColor?: ColorValue<'borderStartColor'>,
  borderTopColor?: ColorValue<'borderTopColor'>,
  color?: ColorValue<'color'>,
  textShadowColor?: ColorValue<'textShadowColor'>,
  textDecorationColor?: ColorValue<'textDecorationColor'>,
  overlayColor?: ColorValue<'overlayColor'>,
  tintColor?: ColorValue<'tintColor'>,
|};

export type NamedStyles = { +[key: string]: BpkStyleSheetStyle };

export type BpkDynamicStyleProp<S> = $ObjMap<S, (Object) => any>;
export type BpkDynamicStyle<S> = {
  light: BpkDynamicStyleProp<S>,
  dark: BpkDynamicStyleProp<S>,
};

const isSemanticColor = (value: any): boolean =>
  value != null &&
  typeof value === 'object' &&
  value.light != null &&
  value.dark != null;

function extractSemanticColors(
  styleDef: BpkStyleSheetStyle,
  variation: ColorSchemeName,
) {
  return Object.keys(styleDef).reduce((mapped, key) => {
    const value = styleDef[key];
    if (isSemanticColor(value)) {
      // $FlowFixMe
      mapped[key] = value[variation]; // eslint-disable-line no-param-reassign
    } else {
      mapped[key] = value; // eslint-disable-line no-param-reassign
    }
    return mapped;
  }, {});
}

function extractStyleForVariation<+S: NamedStyles>(
  style: S,
  variation: ColorSchemeName,
) {
  return Object.keys(style).reduce((mapped, topLevelKey) => {
    const styleDef = style[topLevelKey];
    mapped[topLevelKey] = extractSemanticColors(styleDef, variation); // eslint-disable-line no-param-reassign
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

function create<+S: NamedStyles>(obj: S): BpkDynamicStyle<S> {
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
