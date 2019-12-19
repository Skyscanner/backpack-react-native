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

import { TextInput, View } from 'react-native';
import React from 'react';
import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from 'react-native-bpk-appearance';

// All taken from Apple's iOS UI Sketch library.
const IOS_SEARCH_INPUT_HEIGHT = 36;
const IOS_SEARCH_INPUT_BACKGROUND_COLOR = 'rgba(142, 142, 147, 0.12)';
const IOS_SEARCH_INPUT_PLACEHOLDER_COLOR = 'rgb(142, 142, 147)';
const IOS_SEARCH_INPUT_FONT_SIZE = 17;
const IOS_SEARCH_INPUT_BORDER_RADIUS = 8;
const IOS_SEARCH_INPUT_HORIZONTAL_MARGIN = 12;
const IOS_SEARCH_INPUT_HORIZONTAL_PADDING = 8;

const dynamicStyles = BpkDynamicStyleSheet.create({
  textInput: {
    backgroundColor: IOS_SEARCH_INPUT_BACKGROUND_COLOR,
    borderRadius: IOS_SEARCH_INPUT_BORDER_RADIUS,
    fontSize: IOS_SEARCH_INPUT_FONT_SIZE,
    height: IOS_SEARCH_INPUT_HEIGHT,
    marginHorizontal: IOS_SEARCH_INPUT_HORIZONTAL_MARGIN,
    paddingHorizontal: IOS_SEARCH_INPUT_HORIZONTAL_PADDING,
  },
});

const BpkFlatListSearchField = () => {
  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor={IOS_SEARCH_INPUT_PLACEHOLDER_COLOR}
      />
    </View>
  );
};

export default BpkFlatListSearchField;
