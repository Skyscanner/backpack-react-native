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

import BpkAppearance, {
  type BpkAppearancePreferences,
} from './src/BpkAppearance';
import {
  useBpkAppearance,
  useBpkColorScheme,
  useBpkDynamicValue,
  useBpkDynamicStyleSheet,
  useBpkDynamicStyle,
} from './src/hooks';
import BpkAppearanceProvider, {
  BpkAppearanceProviderContext,
  type Props as BpkAppearanceProviderProps,
} from './src/BpkAppearanceProvider';
import BpkAppearanceConsumer, {
  type Props as BpkAppearanceConsumerProps,
  type ChildrenProps as BpkAppearanceConsumerChildrenProps,
} from './src/BpkAppearanceConsumer';
import BpkDynamicStyleSheet, {
  type BpkDynamicStyle,
  type BpkDynamicStyleProp,
  type BpkStyleSheetNamedStyles,
} from './src/BpkDynamicStyleSheet';
import type { BpkDynamicValue } from './src/common-types';
import withBpkAppearance, {
  type InjectedProps as WithBpkAppearanceInjectedProps,
} from './src/withBpkAppearance';
import {
  unpackBpkDynamicValue,
  unpackBpkDynamicStyle,
} from './src/dynamic-value';

export default BpkAppearance;
export {
  useBpkAppearance,
  useBpkColorScheme,
  useBpkDynamicValue,
  useBpkDynamicStyleSheet,
  useBpkDynamicStyle,
  unpackBpkDynamicValue,
  unpackBpkDynamicStyle,
  BpkAppearanceProviderContext,
  BpkAppearanceProvider,
  BpkAppearanceConsumer,
  BpkDynamicStyleSheet,
  withBpkAppearance,
};
export type {
  BpkAppearancePreferences,
  BpkAppearanceProviderProps,
  BpkAppearanceConsumerProps,
  BpkAppearanceConsumerChildrenProps,
  BpkDynamicStyle,
  BpkDynamicStyleProp,
  BpkDynamicValue,
  BpkStyleSheetNamedStyles,
  WithBpkAppearanceInjectedProps,
};
