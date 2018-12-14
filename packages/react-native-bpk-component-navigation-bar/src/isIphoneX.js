/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import { DeviceInfo } from 'react-native';

export default (() => {
  const { width, height } = DeviceInfo.Dimensions.window;

  // iPhone X and XS
  if (width === 375 && height === 812) {
    return true;
  }

  // iPhone XS Max and XR
  if (width === 414 && height === 896) {
    return true;
  }

  return false;
})();
