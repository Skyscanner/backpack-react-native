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

import React from 'react';
import { Modal, Picker, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import {
  colorSkyGrayTint05,
  spacingBase,
  backgroundSecondaryDarkColor,
  backgroundTertiaryDarkColor,
  primaryDarkColor,
  textPrimaryDarkColor,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkButtonLink from '../../bpk-component-button-link';

import {
  PICKER_MENU_PROP_TYPE,
  PICKER_MENU_DEFAULT_PROPS,
  type PickerMenuProps,
} from './common-types';

// Set to match built-in input accessory views in iOS.
const IOS_INPUT_ACCESSORY_VIEW_BACKGROUND_COLOR = {
  light: '#f9f9f9',
  dark: backgroundSecondaryDarkColor,
};
const IOS_INPUT_ACCESSORY_VIEW_HEIGHT = 45;
const IOS_INPUT_ACCESSORY_VIEW_DONE_LABEL_COLOR = {
  light: '#007aff',
  dark: primaryDarkColor,
};
const IOS_INPUT_ACCESSORY_VIEW_DONE_LABEL_FONT_SIZE = 17;
const IOS_PICKER_MODAL_BACKGROUND_COLOR = {
  light: '#d0d4da',
  dark: backgroundTertiaryDarkColor,
};

const dynamicStyles = BpkDynamicStyleSheet.create({
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
    borderTopWidth: { light: 1, dark: 0 },
    borderColor: colorSkyGrayTint05,
    justifyContent: 'flex-end',
    height: IOS_INPUT_ACCESSORY_VIEW_HEIGHT,
    alignItems: 'center',
  },
  doneLabel: {
    color: IOS_INPUT_ACCESSORY_VIEW_DONE_LABEL_COLOR,
    fontSize: IOS_INPUT_ACCESSORY_VIEW_DONE_LABEL_FONT_SIZE,
  },
  itemStyle: {
    color: { light: null, dark: textPrimaryDarkColor },
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
    onShow,
    pickerContentRef,
  } = props;
  const pickerItems = React.Children.map(children, (child) =>
    React.cloneElement(child, { key: child.props.value }),
  );
  const styles = useBpkDynamicStyleSheet(dynamicStyles);

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      transparent
      visible={visible}
      animationType="slide"
      onShow={onShow}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.dismissOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modal} ref={pickerContentRef}>
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
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          itemStyle={styles.itemStyle}
        >
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
