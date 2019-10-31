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
import { useContext } from 'react';

import {
  type ColorSchemeName,
  type BpkAppearancePreferences,
} from './BpkAppearance';
import { BpkAppearanceProviderContext } from './BpkAppearanceProvider';
import {
  type BpkDynamicStyle,
  type BpkDynamicStyleProp,
} from './BpkDynamicStyleSheet';

// TODO: move this to bpk-tokens?
export type BpkDynamicValue<T> = { light: T, dark: T };

export function useBpkAppearance(): BpkAppearancePreferences {
  return useContext(BpkAppearanceProviderContext);
}

export function useBpkColorScheme(): ColorSchemeName {
  return useBpkAppearance().colorScheme || 'light';
}

export function useBpkDynamicValue<T>(value: BpkDynamicValue<T>): T {
  return value[useBpkColorScheme()];
}

export function useBpkDynamicStyleSheet<T>(
  style: BpkDynamicStyle<T>,
): BpkDynamicStyleProp<T> {
  return useBpkDynamicValue(style);
}
