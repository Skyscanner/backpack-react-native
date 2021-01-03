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

/*

Rather than use RN's built-in Picker component, this has been reimplemented in
JS using a FlatList combined with a modal scrim.

Ordinarily we avoid reimplementing native functionality, but it was done for a good reason:

The Picker component for Android in RN (as of 0.61.5) is difficult to control, as it just exposes
a select-like component with limited styling options, which when pressed opens the picker UI.

On iOS you get the actual picker with no 'select' to trigger it appearing.

To normalise this across platforms we built on top of this, hence this native implementation.

If we were to start this again from scratch we would probably do it differently by providing two
different components, but there we are.

For now, this is why things are this way. Sorry!

*/

/* @flow */

import React from 'react';
import { FlatList, Modal, TouchableWithoutFeedback, View } from 'react-native';
import { setOpacity } from 'bpk-tokens';
import {
  borderRadiusXs,
  colorWhite,
  backgroundTertiaryDarkColor,
  lineHeightBase,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

import BpkPickerItem from './BpkPickerItem';
import {
  PICKER_MENU_PROP_TYPE,
  PICKER_MENU_DEFAULT_PROPS,
  type PickerMenuProps,
} from './common-types';

const MAX_ROWS_TO_DISPLAY = 6;

// To match the platform standard we mirror Android instead of using a
// Backpack colour.
const ANDROID_OVERLAY_COLOR = setOpacity('black', 0.6);

const dynamicStyles = BpkDynamicStyleSheet.create({
  overlay: {
    left: 0,
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: ANDROID_OVERLAY_COLOR,
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacingBase,
    width: '100%',
    height: '100%',
  },
  list: {
    backgroundColor: { light: colorWhite, dark: backgroundTertiaryDarkColor },
    borderRadius: borderRadiusXs,
    elevation: { light: 5, dark: 0 },
  },
});

const BpkPickerMenu = (props: PickerMenuProps) => {
  const {
    visible,
    children,
    onValueChange,
    onClose,
    selectedValue,
    onShow,
    pickerContentRef,
  } = props;

  // Instead of passing children through, we have to turn them into a data structure
  // in order to pass them to FlatList.
  let initialScrollIndex = 0;
  const pickerItems = React.Children.map(children, (child, index) => {
    const { label, value } = child.props;

    let selected = false;
    if (selectedValue && selectedValue === value) {
      selected = true;

      // If selected item will be off-screen, set initialScrollIndex.
      if (index >= MAX_ROWS_TO_DISPLAY) {
        initialScrollIndex = index;
      }
    }
    return { index, label, value, selected };
  });

  const rowsToDisplay =
    pickerItems.length > MAX_ROWS_TO_DISPLAY
      ? MAX_ROWS_TO_DISPLAY
      : pickerItems.length;
  const heightOfOneItem = spacingBase * 2 + lineHeightBase;
  const maxListHeight = heightOfOneItem * rowsToDisplay;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const listStyle = [styles.list];
  listStyle.push({
    maxHeight: maxListHeight,
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      onShow={onShow}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.listWrapper} ref={pickerContentRef}>
        <FlatList
          data={pickerItems}
          getItemLayout={(data, index) => ({
            offset: heightOfOneItem * index,
            length: heightOfOneItem,
            index,
          })}
          initialScrollIndex={initialScrollIndex}
          initialNumToRender={MAX_ROWS_TO_DISPLAY}
          keyExtractor={(item) => `${item.index}`}
          renderItem={({ item }) => {
            const { index } = item;
            return (
              <BpkPickerItem
                {...item}
                onPress={(value) => {
                  onValueChange(value, index);
                  onClose();
                }}
              />
            );
          }}
          style={listStyle}
        />
      </View>
    </Modal>
  );
};

BpkPickerMenu.propTypes = PICKER_MENU_PROP_TYPE;
BpkPickerMenu.defaultProps = PICKER_MENU_DEFAULT_PROPS;

export default BpkPickerMenu;
