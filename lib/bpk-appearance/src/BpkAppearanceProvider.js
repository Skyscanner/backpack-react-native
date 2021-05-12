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
import React, {
  createContext,
  useState,
  useEffect,
  type Context,
  type Node,
} from 'react';
import { Appearance } from 'react-native';

import BpkAppearance, { type BpkAppearancePreferences } from './BpkAppearance';

export const BpkAppearanceProviderContext: Context<BpkAppearancePreferences> = createContext(
  Appearance.getColorScheme(),
);
BpkAppearanceProviderContext.displayName = 'BpkAppearanceProviderContext';

export type Props = {
  children: Node,
  appearanceOverride: $Shape<BpkAppearancePreferences>,
};

const BpkAppearanceProvider = ({ children, appearanceOverride }: Props) => {
  const [currentAppearance, setCurrentAppearance] = useState(
    Appearance.getColorScheme(),
  );

  useEffect(() => {
    function handler(newAppearance: BpkAppearancePreferences) {
      setCurrentAppearance(newAppearance);
    }

    Appearance.addChangeListener(handler);
    return () => {
      Appearance.removeChangeListener(handler);
    };
  }, []);

  return (
    <BpkAppearanceProviderContext.Provider
      value={{ ...currentAppearance, ...appearanceOverride }}
    >
      {children}
    </BpkAppearanceProviderContext.Provider>
  );
};

BpkAppearanceProvider.defaultProps = {
  appearanceOverride: {},
};

export default BpkAppearanceProvider;
