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

import { View, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { colorGray100 } from 'bpk-tokens/tokens/base.react.native';
import { withTheme, grayForTheme, type Theme } from 'react-native-bpk-theming';

// Not using a token as this is replicating an Android native UI element.
const radioSize = 20;
const innerSize = radioSize / 2;
const borderWidth = 1;

const styles = StyleSheet.create({
  outer: {
    borderRadius: radioSize,
    borderWidth,
    borderColor: colorGray100,
    height: radioSize,
    width: radioSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    backgroundColor: 'transparent',
    borderRadius: innerSize,
    height: innerSize,
    width: innerSize,
  },
});

type Props = {
  selected: boolean,
  tintColor: string,
  theme: ?Theme,
};

const BpkRadioIcon = ({ selected, tintColor, theme }: Props) => {
  const outerStyle = [styles.outer];
  const innerStyle = [styles.inner];

  if (theme) {
    outerStyle.push({ borderColor: grayForTheme(theme, 'colorGray100') });
  }
  if (selected) {
    outerStyle.push({ borderColor: tintColor });
    innerStyle.push({ backgroundColor: tintColor });
  }
  return (
    <View style={outerStyle}>
      <View style={innerStyle} />
    </View>
  );
};

BpkRadioIcon.propTypes = {
  selected: PropTypes.bool,
  tintColor: PropTypes.string.isRequired,
};

BpkRadioIcon.defaultProps = {
  selected: false,
  theme: null,
};

export default withTheme(BpkRadioIcon);
