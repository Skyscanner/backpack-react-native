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
import React, { type Node } from 'react';
import addon from '@storybook/addons';
import { I18nManager, YellowBox, View } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { backgroundColor } from 'bpk-tokens/tokens/base.react.native';

import BpkAppearance, {
  BpkAppearanceProvider,
  useBpkDynamicValue,
} from '../src/js/bpk-appearance';

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
      fns.map(fn => fn(channel));
      return true;
    } catch (exe) {
      return false;
    }
  }, CHANNEL_POLL_INTERVAL);
};

const initRtlAddon = channel => {
  channel.emit(RTL_INIT, I18nManager.isRTL);
  channel.on(RTL_EVENT, rtlEnabled => I18nManager.forceRTL(rtlEnabled));
};

const initDarkModeAddon = channel => {
  channel.emit(DM_INIT, BpkAppearance.get().colorScheme || 'light');
  channel.on(DM_EVENT, colorScheme => BpkAppearance.set({ colorScheme }));
};

const hideWarnings = () => {
  // TODO: this warning is being trigger by an internal react code, we can remove it when it gets fixed
  // see: https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
};

/* eslint-disable global-require */
configure(() => {
  require('../src/js/bpk-component-alert/stories');
  require('../src/js/bpk-component-animate-height/stories');
  require('../src/js/bpk-component-badge/stories');
  require('../src/js/bpk-component-banner-alert/stories');
  require('../src/js/bpk-component-button-link/stories');
  require('../src/js/bpk-component-button/stories');
  require('../src/js/bpk-component-calendar/stories');
  require('../src/js/bpk-component-card/stories');
  require('../src/js/bpk-component-carousel-indicator/stories');
  require('../src/js/bpk-component-carousel/stories');
  require('../src/js/bpk-component-chip/stories');
  require('../src/js/bpk-component-dialog/stories');
  require('../src/js/bpk-component-flat-list/stories');
  require('../src/js/bpk-component-horizontal-nav/stories');
  require('../src/js/bpk-component-icon/stories');
  require('../src/js/bpk-component-image/stories');
  require('../src/js/bpk-component-map/stories');
  require('../src/js/bpk-component-navigation-bar/stories');
  require('../src/js/bpk-component-nudger/stories');
  require('../src/js/bpk-component-panel/stories');
  require('../src/js/bpk-component-phone-input/stories');
  require('../src/js/bpk-component-picker/stories');
  require('../src/js/bpk-component-progress/stories');
  require('../src/js/bpk-component-rating/stories');
  require('../src/js/bpk-component-section-list/stories');
  require('../src/js/bpk-component-select/stories');
  require('../src/js/bpk-component-spinner/stories');
  require('../src/js/bpk-component-star-rating/stories');
  require('../src/js/bpk-component-switch/stories');
  require('../src/js/bpk-component-text-input/stories');
  require('../src/js/bpk-component-text/stories');
  require('../src/js/bpk-component-touchable-native-feedback/stories');
  require('../src/js/bpk-component-touchable-overlay/stories');
  require('../src/js/bpk-appearance/stories');
  require('../src/js/bpk-styles/stories');
  require('../src/js/bpk-theming/stories');
}, module);
/* eslint-enable global-require */

const StorybookUI = getStorybookUI({ onDeviceUI: false });

onChannelAvailable(hideWarnings, initRtlAddon, initDarkModeAddon);

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
