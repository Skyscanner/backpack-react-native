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

import { NativeModules } from 'react-native';

NativeModules.RNDarkMode = {
  initialMode: 'light',
  supportsDarkMode: true,
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

NativeModules.AndroidBpkSnackbar = {
  LENGTH_SHORT: 0,
  LENGTH_LONG: 1,
  LENGTH_INDEFINITE: 2,
  show: jest.fn(),
  dismiss: jest.fn(),
};

NativeModules.BPKSnackbarManager = {
  LENGTH_SHORT: 0,
  LENGTH_LONG: 1,
  LENGTH_INDEFINITE: 2,
  showWithArgs: jest.fn(),
  dismissAll: jest.fn(),
};
