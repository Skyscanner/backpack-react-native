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

import { Platform, TextInput, View, ViewPropTypes } from 'react-native';
import React, { type ElementProps } from 'react';
import {
  backgroundTertiaryDarkColor,
  colorSkyGrayTint03,
  colorSkyGrayTint06,
  colorWhite,
  primaryColor,
  textPrimaryColor,
  elevationSm,
  elevationBase,
  fontSizeBase,
  spacingMd,
  spacingBase,
  spacingXxl,
} from 'bpk-tokens/tokens/base.react.native';
import { setOpacity } from 'bpk-tokens';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkIcon, { icons } from '../../bpk-component-icon';

// Taken from Apple's iOS UI Sketch library.
const IOS_SEARCH_INPUT_BACKGROUND_OPACITY = 0.12;

const dynamicStyles = BpkDynamicStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacingBase,
    marginBottom: spacingMd,
  },
  icon: {
    position: 'absolute',
    left: spacingMd,
    ...Platform.select({
      android: {
        color: primaryColor,
        zIndex: 100,
        // Elevation must be higher than the TextInput's elevation or it gets covered.
        elevation: elevationBase,
      },
      ios: {
        color: colorSkyGrayTint03,
      },
    }),
  },
  textInput: {
    ...Platform.select({
      android: {
        backgroundColor: {
          dark: backgroundTertiaryDarkColor,
          light: colorWhite,
        },
        elevation: { light: elevationSm, dark: 0 },
        // This is needed because otherwise the elevation shadow at the top is cut off
        marginTop: 2, // eslint-disable-line backpack/use-tokens
      },
      ios: {
        backgroundColor: {
          light: setOpacity(
            colorSkyGrayTint03,
            IOS_SEARCH_INPUT_BACKGROUND_OPACITY,
          ),
          dark: setOpacity(
            colorSkyGrayTint06,
            IOS_SEARCH_INPUT_BACKGROUND_OPACITY,
          ),
        },
      },
    }),
    borderRadius: spacingMd,
    color: textPrimaryColor,
    flex: 1,
    fontSize: fontSizeBase,
    paddingEnd: spacingMd,
    paddingStart: spacingXxl,
    paddingVertical: spacingMd,
  },
});

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

type Props = {
  style: ViewStyleProp,
};

const BpkFlatListSearchField = (props: Props) => {
  const { style: userStyle, ...rest } = props;
  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  return (
    <View style={[styles.wrapper, userStyle]}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={colorSkyGrayTint03}
        {...rest}
      />
      <BpkIcon icon={icons.search} style={styles.icon} />
    </View>
  );
};

BpkFlatListSearchField.propTypes = {
  style: ViewPropTypes.style,
};

BpkFlatListSearchField.defaultProps = {
  style: null,
};

export default BpkFlatListSearchField;
