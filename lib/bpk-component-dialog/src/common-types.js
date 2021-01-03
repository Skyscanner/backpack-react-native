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

import PropTypes from 'prop-types';

export const DIALOG_TYPE = {
  alert: 'alert',
  bottomSheet: 'bottomSheet',
};

export type DialogType = $Keys<typeof DIALOG_TYPE>;

export const BUTTON_TYPE = {
  primary: 'primary',
  secondary: 'secondary',
  featured: 'featured',
  destructive: 'destructive',
};

export type ButtonType = $Keys<typeof BUTTON_TYPE>;

type Icon = {
  iconId: string,
  iconColor: string,
};

export type ActionButton = {
  text: string,
  type: ButtonType,
  callback: () => void,
};

export type ScrimAction = {
  enabled: boolean,
  callback: () => void,
};

export type CommonProps = {
  dialogType: DialogType,
  title: ?string,
  description: ?string,
  icon: Icon,
  actions: Array<ActionButton>,
  scrimAction: ScrimAction,
  isOpen: ?boolean,
};

export const commonPropTypes = {
  dialogType: PropTypes.oneOf(Object.keys(DIALOG_TYPE)).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.shape({
    iconId: PropTypes.string,
    iconColor: PropTypes.string,
  }),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.keys(BUTTON_TYPE)),
      callback: PropTypes.func,
    }),
  ),
  scrimAction: PropTypes.shape({
    enabled: PropTypes.bool,
    callback: PropTypes.func,
  }),
  isOpen: PropTypes.bool,
};

export const nativePropsTypes = {
  ...commonPropTypes,
  onClick: PropTypes.func,
};

export const commonDefaultProps = {
  dialogType: DIALOG_TYPE.alert,
  actions: [],
  isOpen: false,
};
