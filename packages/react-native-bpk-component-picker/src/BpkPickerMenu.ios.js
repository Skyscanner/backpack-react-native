/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import React from 'react';
import {
  Modal,
  Picker,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import BpkButtonLink from 'react-native-bpk-component-button-link';
import { colorGray200, spacingBase } from 'bpk-tokens/tokens/base.react.native';

import {
  PICKER_MENU_PROP_TYPE,
  PICKER_MENU_DEFAULT_PROPS,
  type PickerMenuProps,
} from './common-types';

// Set to match built-in input accessory views in iOS.
const IOS_INPUT_ACCESSORY_VIEW_BACKGROUND_COLOR = '#f9f9f9';
const IOS_INPUT_ACCESSORY_VIEW_HEIGHT = 45;
const IOS_INPUT_ACCESSORY_VIEW_DONE_LABEL_COLOR = '#007aff';
const IOS_INPUT_ACCESSORY_VIEW_DONE_LABEL_FONT_SIZE = 17;
const IOS_PICKER_MODAL_BACKGROUND_COLOR = '#d0d4da';

const styles = StyleSheet.create({
  dismissOverlay: {
    flex: 1,
  },
  modal: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: IOS_PICKER_MODAL_BACKGROUND_COLOR,
    position: 'absolute',
    bottom: 0,
  },
  modalHeader: {
    flex: 1,
    paddingHorizontal: spacingBase,
    flexDirection: 'row',
    backgroundColor: IOS_INPUT_ACCESSORY_VIEW_BACKGROUND_COLOR,
    borderTopWidth: 1, // eslint-disable-line backpack/use-tokens
    borderColor: colorGray200,
    justifyContent: 'flex-end',
    height: IOS_INPUT_ACCESSORY_VIEW_HEIGHT,
    alignItems: 'center',
  },
  doneLabel: {
    color: IOS_INPUT_ACCESSORY_VIEW_DONE_LABEL_COLOR,
    fontSize: IOS_INPUT_ACCESSORY_VIEW_DONE_LABEL_FONT_SIZE,
  },
});

type Props = {
  ...$Exact<PickerMenuProps>,
  doneLabel: string,
};

const BpkPickerMenu = (props: Props) => {
  const {
    visible,
    selectedValue,
    children,
    onValueChange,
    onClose,
    doneLabel,
  } = props;
  const pickerItems = React.Children.map(children, child =>
    React.cloneElement(child, { key: child.props.value }),
  );

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      transparent
      visible={visible}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.dismissOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <BpkButtonLink
            title={doneLabel}
            onPress={onClose}
            textProps={{
              allowFontScaling: false,
              style: styles.doneLabel,
            }}
          />
        </View>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {pickerItems}
        </Picker>
      </View>
    </Modal>
  );
};

BpkPickerMenu.propTypes = {
  ...PICKER_MENU_PROP_TYPE,
  doneLabel: PropTypes.string.isRequired,
};

BpkPickerMenu.defaultProps = PICKER_MENU_DEFAULT_PROPS;

export default BpkPickerMenu;
