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

import { Platform, View } from 'react-native';
import React from 'react';
import {
  spacingMd,
  spacingBase,
  lineColor,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

const dynamicStyles = BpkDynamicStyleSheet.create({
  separator: {
    flex: 1,
    height: 1, // eslint-disable-line backpack/use-tokens
    backgroundColor: lineColor,
    ...Platform.select({
      ios: {
        marginLeft: spacingBase,
      },
      android: {
        marginHorizontal: spacingMd,
      },
    }),
  },
});

const BpkFlatListItemSeparator = () => {
  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  return <View style={styles.separator} />;
};

export default BpkFlatListItemSeparator;
