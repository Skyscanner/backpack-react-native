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

import {
  type NativeAction,
  type NativeSnackbarOptions,
  type IBpkSnackbar,
} from './common-types';
import NativeSnackbar, {
  LENGTH_SHORT,
  LENGTH_LONG,
  LENGTH_INDEFINITE,
} from './NativeSnackbar';

export const SNACKBAR_LENGTHS = {
  short: LENGTH_SHORT,
  long: LENGTH_LONG,
  indefinite: LENGTH_INDEFINITE,
};

const defaultOptions = {
  duration: SNACKBAR_LENGTHS.short,
  action: undefined,
};

const BpkSnackbar: IBpkSnackbar = {
  show(options) {
    const optionsWithDefault = { ...defaultOptions, ...options };
    const { action, ...rest } = optionsWithDefault;

    let callback = () => {};
    let nativeAction: NativeAction;

    if (action) {
      const { onPress, ...actionProps } = action;
      nativeAction = actionProps;
      callback = onPress;
    }

    const nativeOptions: NativeSnackbarOptions = {
      ...rest,
      action: nativeAction,
    };

    NativeSnackbar.show(nativeOptions, callback);
  },

  dismiss() {
    NativeSnackbar.dismiss();
  },
};

export default BpkSnackbar;
