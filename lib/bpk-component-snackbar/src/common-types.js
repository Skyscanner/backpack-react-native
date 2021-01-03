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

type TextAction = {|
  text: string,
|};

type IconAction = {|
  icon: string,
  accessibilityLabel: string,
|};

/**
 * NativeAction object only contains the text or icon props,
 * the onPress callback has to be send seperatly on the native side.
 */
export type NativeAction = TextAction | IconAction;

export type Action = {|
  ...NativeAction,
  onPress: () => void,
|};

export type BpkSnackbarOptions = {|
  text: string,
  title?: string,
  icon?: string,
  duration?: number,
  action?: Action,
|};

export type NativeSnackbarOptions = {|
  text: string,
  title?: string,
  icon?: string,
  duration: number,
  action?: NativeAction,
|};

export type IBpkSnackbar = {
  show(options: BpkSnackbarOptions): void,
  dismiss(): void,
};

export type INativeSnackbar = {
  show(options: NativeSnackbarOptions, callback: () => void): void,
  dismiss(): void,
};
