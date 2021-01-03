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
import React, { type Node } from 'react';
import addon from '@storybook/addons';
import { I18nManager, View } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { backgroundColor } from 'bpk-tokens/tokens/base.react.native';

import BpkAppearance, {
  BpkAppearanceProvider,
  useBpkDynamicValue,
} from '../lib/bpk-appearance';

import {
  RTL_EVENT,
  CHANNEL_POLL_INTERVAL,
  RTL_INIT,
  DM_EVENT,
  DM_INIT,
} from './constants';
import RelativeFontProvider from './RelativeFontProvider';

const onChannelAvailable = (...fns) => {
  const interval = setInterval(() => {
    try {
      const channel = addon.getChannel();
      clearInterval(interval);
      // $FlowFixMe
      fns.map((fn) => fn(channel));
      return true;
    } catch (exe) {
      return false;
    }
  }, CHANNEL_POLL_INTERVAL);
};

const initRtlAddon = (channel) => {
  channel.emit(RTL_INIT, I18nManager.isRTL);
  channel.on(RTL_EVENT, (rtlEnabled) => I18nManager.forceRTL(rtlEnabled));
};

const initDarkModeAddon = (channel) => {
  channel.emit(DM_INIT, BpkAppearance.get().colorScheme || 'light');
  channel.on(DM_EVENT, (colorScheme) => BpkAppearance.set({ colorScheme }));
};

/* eslint-disable global-require */
configure(() => {
  require('../lib/bpk-appearance/stories');
  require('../lib/bpk-component-alert/stories');
  require('../lib/bpk-component-animate-height/stories');
  require('../lib/bpk-component-badge/stories');
  require('../lib/bpk-component-banner-alert/stories');
  require('../lib/bpk-component-button-link/stories');
  require('../lib/bpk-component-button/stories');
  require('../lib/bpk-component-calendar/stories');
  require('../lib/bpk-component-card/stories');
  require('../lib/bpk-component-carousel-indicator/stories');
  require('../lib/bpk-component-carousel/stories');
  require('../lib/bpk-component-chip/stories');
  require('../lib/bpk-component-dialog/stories');
  require('../lib/bpk-component-flare/stories');
  require('../lib/bpk-component-flat-list/stories');
  require('../lib/bpk-component-horizontal-nav/stories');
  require('../lib/bpk-component-icon/stories');
  require('../lib/bpk-component-image/stories');
  require('../lib/bpk-component-map/stories');
  require('../lib/bpk-component-navigation-bar/stories');
  require('../lib/bpk-component-nudger/stories');
  require('../lib/bpk-component-panel/stories');
  require('../lib/bpk-component-phone-input/stories');
  require('../lib/bpk-component-picker/stories');
  require('../lib/bpk-component-progress/stories');
  require('../lib/bpk-component-rating/stories');
  require('../lib/bpk-component-section-list/stories');
  require('../lib/bpk-component-select/stories');
  require('../lib/bpk-component-snackbar/stories');
  require('../lib/bpk-component-spinner/stories');
  require('../lib/bpk-component-star-rating/stories');
  require('../lib/bpk-component-switch/stories');
  require('../lib/bpk-component-text-input/stories');
  require('../lib/bpk-component-text-link/stories');
  require('../lib/bpk-component-text/stories');
  require('../lib/bpk-component-touchable-native-feedback/stories');
  require('../lib/bpk-component-touchable-overlay/stories');
  require('../lib/bpk-styles/stories');
  require('../lib/bpk-theming/stories');
}, module);
/* eslint-enable global-require */

const StorybookUI = getStorybookUI({
  onDeviceUI: true,
  asyncStorage: null,
});

onChannelAvailable(initRtlAddon, initDarkModeAddon);

const BackgroundWrapper = ({ children }: { children: Node }) => (
  <View
    style={{
      backgroundColor: useBpkDynamicValue(backgroundColor),
      flex: 1,
    }}
  >
    {children}
  </View>
);

export default (props: Object) => (
  <RelativeFontProvider>
    <BpkAppearanceProvider>
      <BackgroundWrapper>
        <StorybookUI {...props} />
      </BackgroundWrapper>
    </BpkAppearanceProvider>
  </RelativeFontProvider>
);
