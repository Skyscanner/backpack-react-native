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

import BpkAppearance, {
  type BpkAppearancePreferences,
} from './src/BpkAppearance';
import {
  useBpkAppearance,
  useBpkColorScheme,
  useBpkDynamicValue,
  useBpkDynamicStyleSheet,
  type BpkDynamicValue,
} from './src/hooks';
import BpkAppearanceProvider, {
  BpkAppearanceProviderContext,
  type Props as BpkAppearanceProviderProps,
} from './src/BpkAppearanceProvider';
import BpkDynamicStyleSheet, {
  type BpkDynamicStyle,
  type BpkDynamicStyleProp,
} from './src/BpkDynamicStyleSheet';

export default BpkAppearance;
export {
  useBpkAppearance,
  useBpkColorScheme,
  useBpkDynamicValue,
  useBpkDynamicStyleSheet,
  BpkAppearanceProviderContext,
  BpkAppearanceProvider,
  BpkDynamicStyleSheet,
};
export type {
  BpkAppearancePreferences,
  BpkAppearanceProviderProps,
  BpkDynamicStyle,
  BpkDynamicStyleProp,
  BpkDynamicValue,
};
