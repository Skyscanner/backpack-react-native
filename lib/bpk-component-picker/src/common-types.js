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

import { type Node, type ElementProps, type Ref } from 'react';
import { Modal, View } from 'react-native';
import PropTypes from 'prop-types';

export type PickerValue = ?(string | number);

type ModalProps = ElementProps<typeof Modal>;
export type PickerMenuProps = {
  children: Node,
  onClose: () => void | Promise<void>,
  onValueChange: (PickerValue, number) => mixed,
  selectedValue: PickerValue,
  visible: boolean,
  onShow: $PropertyType<ModalProps, 'onShow'>,
  pickerContentRef: Ref<typeof View>,
};

export const PICKER_VALUE_PROP_TYPE = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const PICKER_MENU_PROP_TYPE = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  selectedValue: PICKER_VALUE_PROP_TYPE,
  visible: PropTypes.bool,
};

export const PICKER_MENU_DEFAULT_PROPS = {
  visible: false,
  selectedValue: null,
};
