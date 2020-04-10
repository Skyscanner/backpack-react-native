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
import { type INativeSnackbar } from './common-types';

export const LENGTH_SHORT = 0;
export const LENGTH_LONG = 0;
export const LENGTH_INDEFINITE = 0;

const NativeSnackbar: INativeSnackbar = {
  show() {
    // eslint-disable-next-line
    console.warn('BpkSnackbar is not available for iOS yet');
  },
  dismiss() {
    // eslint-disable-next-line
    console.warn('BpkSnackbar is not available for iOS yet');
  },
};

export default NativeSnackbar;
