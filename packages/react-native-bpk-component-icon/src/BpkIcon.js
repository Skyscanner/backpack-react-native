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

import PropTypes from 'prop-types';
import {
  spacingBase,
  spacingLg,
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';
import { Text, StyleSheet } from 'react-native';
import React, { type ElementProps } from 'react';
import iconMappings from 'bpk-svgs/dist/font/iconMapping.json';
import { withTheme, grayForTheme, type Theme } from 'react-native-bpk-theming';

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'BpkIcon',
    fontSize: spacingLg,
    includeFontPadding: false,
    color: colorGray700,
  },
  small: {
    fontSize: spacingBase,
  },
});

const mapCharacterCode = characterCode =>
  String.fromCharCode(parseInt(characterCode, 16));

type TextProps = ElementProps<typeof Text>;
type TextStyleProp = $PropertyType<TextProps, 'style'>;

export type Props = {
  icon: string,
  small?: boolean,
  style: TextStyleProp,
  theme: ?Theme,
};

const BpkIcon = (props: Props) => {
  const { icon, small, style, theme, ...rest } = props;

  const characterCode = iconMappings[icon];

  const textStyleFinal = [styles.icon];

  if (theme) {
    textStyleFinal.push({ color: grayForTheme(theme, 'colorGray700') });
  }

  if (small) {
    textStyleFinal.push(styles.small);
  }

  if (style) {
    textStyleFinal.push(style);
  }

  return (
    // eslint-disable-next-line backpack/use-components
    <Text allowFontScaling={false} style={textStyleFinal} {...rest}>
      {mapCharacterCode(characterCode)}
    </Text>
  );
};

BpkIcon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(iconMappings)).isRequired,
  small: PropTypes.bool,
  style: Text.propTypes.style,
};

BpkIcon.defaultProps = {
  small: false,
  style: null,
  theme: null,
};

/*
Expose icon mapping keys as both key and value
so they can be used by consumers.
*/
const icons: Object = {};
Object.keys(iconMappings).forEach(name => {
  icons[name] = name;
});

export default withTheme(BpkIcon);
export { icons };
