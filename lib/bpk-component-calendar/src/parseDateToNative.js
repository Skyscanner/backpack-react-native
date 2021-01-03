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

import { Platform } from 'react-native';

const parseDateToNative = (date: ?(Date | number)) => {
  if (date) {
    const timestamp = typeof date === 'number' ? date : date.getTime();
    // Return as unix timestamp for Android because the only number data type that allows null
    // in the native side is Integer, and the original milliseconds will overflow it.
    return Platform.OS === 'android' ? timestamp / 1000 : timestamp;
  }

  return date;
};

export default parseDateToNative;
