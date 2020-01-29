/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import { Appearance } from 'react-native-appearance';

export type ColorSchemeName = 'light' | 'dark';
type NativeColorSchemeName = 'no-preference' | ColorSchemeName;

export type BpkAppearancePreferences = {
  colorScheme?: ColorSchemeName,
};

export type BpkAppearanceChangeListener = BpkAppearancePreferences => void;

const normalizeColorScheme = (
  colorScheme: NativeColorSchemeName,
): ColorSchemeName => {
  if (colorScheme === 'no-preference') {
    return 'light';
  }

  return colorScheme;
};

let currentPreferences: BpkAppearancePreferences = {
  colorScheme: normalizeColorScheme(Appearance.getColorScheme()),
};

const listeners: Set<BpkAppearanceChangeListener> = new Set([]);

const appearance = {
  get: () => currentPreferences,
  set: (preferences: BpkAppearancePreferences) => {
    if (currentPreferences.colorScheme !== preferences.colorScheme) {
      currentPreferences = preferences;
      listeners.forEach(listener => listener(currentPreferences));
    }
  },
  addChangeListener: (listener: BpkAppearanceChangeListener) => {
    listeners.add(listener);
  },
  removeChangeListener: (listener: BpkAppearanceChangeListener) => {
    listeners.delete(listener);
  },
};

Appearance.addChangeListener(
  ({ colorScheme }: { colorScheme: NativeColorSchemeName }) => {
    appearance.set({
      ...currentPreferences,
      colorScheme: normalizeColorScheme(colorScheme),
    });
  },
);

export default appearance;
