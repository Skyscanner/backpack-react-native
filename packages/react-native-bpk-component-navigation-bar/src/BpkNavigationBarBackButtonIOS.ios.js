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
import PropTypes from 'prop-types';
import { I18nManager, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { withTheme, grayForTheme, type Theme } from 'react-native-bpk-theming';

const chevron = I18nManager.isRTL
  ? require('./chevron-right.png')
  : require('./chevron-left.png');

export type Props = {
  title: string,
  showTitle: boolean,
  onPress: ?() => mixed,
  tintColor: ?string,
  theme: ?Theme,
};

// NOTE: this file explicitly does not use the Backpack tokens(for spacing) because it's based on UIKit design tokens not Backpack.
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    zIndex: 2,
    alignItems: 'center',
    height: '100%',
  },
  backIcon: {
    marginEnd: 8, // eslint-disable-line backpack/use-tokens
  },
  backIconWithoutTitle: {
    marginEnd: 16, // eslint-disable-line backpack/use-tokens
  },
});

const BpkNavigationBarBackButtonIOS = (props: Props) => {
  const { title, showTitle, onPress, tintColor, theme } = props;
  const gray900 = grayForTheme(theme, 'colorGray900');
  const tintColorFinal = tintColor || gray900;
  const titleStyle = [{ color: tintColorFinal }];
  const iconStyle = [showTitle ? styles.backIcon : styles.backIconWithoutTitle];

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessible
      style={styles.button}
    >
      {/* TODO: replace with BpkImage */}
      {/* eslint-disable-next-line backpack/use-components */}
      <Image
        source={chevron}
        style={[iconStyle, { tintColor: tintColorFinal }]}
      />
      {showTitle && (
        <BpkText textStyle="base" style={titleStyle}>
          {title}
        </BpkText>
      )}
    </TouchableOpacity>
  );
};

BpkNavigationBarBackButtonIOS.propTypes = {
  title: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  onPress: PropTypes.func,
  // Internal only
  tintColor: PropTypes.string,
};

BpkNavigationBarBackButtonIOS.defaultProps = {
  showTitle: false,
  onPress: null,
  theme: null,
  // Internal only
  tintColor: null,
};

export default withTheme(BpkNavigationBarBackButtonIOS);
