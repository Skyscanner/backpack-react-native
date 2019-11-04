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

import React from 'react';
import addons from '@storybook/addons';

import BpkAppearance, {
  useBpkColorScheme,
  BpkAppearanceProvider,
} from '../../packages/react-native-bpk-appearance';
import BpkSwitch from '../../packages/react-native-bpk-component-switch';

import AddonPanel from './AddonPanel';

export const ID = 'dark-mode';
export const PANEL_ID = `${ID}/panel`;

const DarkModePanel = () => {
  const colorScheme = useBpkColorScheme();
  const onValueChange = value => {
    BpkAppearance.set({ colorScheme: value ? 'dark' : 'light' });
  };
  return (
    <BpkSwitch value={colorScheme === 'dark'} onValueChange={onValueChange} />
  );
};

type RenderProps = {
  active: boolean,
  key: string,
};

// Register the addon with a unique name.
addons.register(ID, () => {
  const render = ({ active, key }: RenderProps) => (
    <AddonPanel active={active} key={key}>
      <BpkAppearanceProvider>
        <DarkModePanel />
      </BpkAppearanceProvider>
    </AddonPanel>
  );
  // Also need to set a unique name to the panel.
  addons.addPanel(PANEL_ID, {
    title: 'Dark mode',
    render,
  });
});
