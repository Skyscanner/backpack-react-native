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

/*

In 2017, the iPhone X introduced a sensor housing (aka notch) that affected
the status bar height.

As of March 2021, React Native doesn't have a way to read the status bar height
from the device, so this file hard codes the heights for various devices.

It's up to date as of Apple's 2020 iOS devices (the iPhone 12 family).

Reference: https://useyourloaf.com/blog/iphone-12-screen-sizes/
*/

// Allow console errors here so that we can report errors but fail gracefully.
/* eslint-disable no-console */

import { DeviceInfo, Platform } from 'react-native';

const DEFAULT_STATUS_BAR_HEIGHT = 20;

export default () => {
  if (Platform.OS === 'android') {
    console.error('getIOSStatusBarHeight is not available on Android.');
    return DEFAULT_STATUS_BAR_HEIGHT;
  }

  const windowDimensions = DeviceInfo.getConstants().Dimensions.window;
  if (!windowDimensions) {
    console.error('Device does not appear to have accessible dimensions.');
    return DEFAULT_STATUS_BAR_HEIGHT;
  }

  const { width, height } = windowDimensions;

  // iPhone X, iPhone XS, iPhone 11 Pro, iPhone 12 mini
  if (width === 375 && height === 812) {
    return 44;
  }

  // iPhone XS Max, iPhone XR, iPhone 11, iPhone 11 Pro Max
  if (width === 414 && height === 896) {
    return 44;
  }

  // iPhone 12, iPhone 12 Pro
  if (width === 390 && height === 844) {
    return 47;
  }

  // iPhone 12 Pro Max
  if (width === 428 && height === 926) {
    return 47;
  }

  return DEFAULT_STATUS_BAR_HEIGHT;
};
