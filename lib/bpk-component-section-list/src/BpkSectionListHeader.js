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
import PropTypes from 'prop-types';
import {
  spacingSm,
  spacingBase,
  backgroundTertiaryDarkColor,
  colorSkyGrayTint07,
  colorSkyGrayTint06,
  lineDarkColor,
  textPrimaryColor,
  textSecondaryColor,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkText, { WEIGHT_STYLES } from '../../bpk-component-text';

const ANDROID_LIST_ITEM_HEIGHT = 48;

const dynamicStyles = BpkDynamicStyleSheet.create({
  outer: {
    paddingHorizontal: spacingBase,
    ...Platform.select({
      ios: {
        backgroundColor: {
          light: colorSkyGrayTint07,
          dark: backgroundTertiaryDarkColor,
        },
        paddingVertical: spacingSm,
      },
      android: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopColor: { light: colorSkyGrayTint06, dark: lineDarkColor },
        borderTopWidth: 1, // eslint-disable-line backpack/use-tokens
        flexDirection: 'row',
        height: ANDROID_LIST_ITEM_HEIGHT,
      },
    }),
  },
  text: {
    color: Platform.OS === 'android' ? textSecondaryColor : textPrimaryColor,
  },
});

export type Props = {
  title: string,
};

const BpkSectionHeader = (props: Props) => {
  const { title } = props;
  const styles = useBpkDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.outer}>
      <BpkText
        weight={WEIGHT_STYLES.emphasized}
        textStyle={Platform.OS === 'android' ? 'sm' : 'base'}
        style={styles.text}
      >
        {title}
      </BpkText>
    </View>
  );
};

BpkSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BpkSectionHeader;
