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

import React, { type Ref, type ElementProps, type Node } from 'react';
import { Modal, View } from 'react-native';
import PropTypes from 'prop-types';

import BpkPickerMenu from './BpkPickerMenu';
import { PICKER_VALUE_PROP_TYPE, type PickerValue } from './common-types';

type ModalProps = ElementProps<typeof Modal>;

export type Props = {
  children: Node,
  doneLabel: string,
  onClose: () => void | Promise<void>,
  onValueChange: (PickerValue, number) => mixed,
  isOpen: boolean,
  selectedValue: PickerValue,
  onShow: $PropertyType<ModalProps, 'onShow'>,
  pickerContentRef: Ref<typeof View>,
};

const BpkPicker = (props: Props) => {
  const {
    children,
    doneLabel,
    isOpen,
    onValueChange,
    selectedValue,
    ...rest
  } = props;

  return (
    <BpkPickerMenu
      {...rest}
      doneLabel={doneLabel}
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      visible={isOpen}
    >
      {children}
    </BpkPickerMenu>
  );
};

BpkPicker.propTypes = {
  children: PropTypes.node.isRequired,
  doneLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  selectedValue: PICKER_VALUE_PROP_TYPE,
};

BpkPicker.defaultProps = {
  isOpen: false,
  selectedValue: null,
  onShow: () => undefined,
  pickerContentRef: React.createRef(),
};

export default BpkPicker;
