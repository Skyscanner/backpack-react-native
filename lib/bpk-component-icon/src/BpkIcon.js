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

import PropTypes from 'prop-types';
import {
  spacingBase,
  spacingLg,
  textPrimaryColor,
} from 'bpk-tokens/tokens/base.react.native';
import { Text } from 'react-native';
import { type TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import React, { type Node } from 'react';
import iconMappings from 'bpk-svgs/dist/font/iconMapping.json';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

const dynamicStyles = BpkDynamicStyleSheet.create({
  icon: {
    fontFamily: 'BpkIcon',
    fontSize: spacingLg,
    includeFontPadding: false,
    color: textPrimaryColor,
  },
  small: {
    fontSize: spacingBase,
  },
});

const mapCharacterCode = (characterCode) =>
  String.fromCharCode(parseInt(characterCode, 16));

const SMALL_SUFFIX = '-sm';

export type Props = {
  icon: string,
  small?: boolean,
  style?: TextStyleProp,
};

const BpkIcon = (props: Props): Node => {
  const { icon, small, style, ...rest } = props;

  // If they request a small icon, append the icon mapping for small.
  const characterCode = iconMappings[small ? `${icon}${SMALL_SUFFIX}` : icon];

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const textStyleFinal = [styles.icon];

  if (small) {
    textStyleFinal.push(styles.small);
  }

  if (style) {
    textStyleFinal.push(style);
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <Text allowFontScaling={false} style={textStyleFinal} {...rest}>
      {mapCharacterCode(characterCode)}
    </Text>
  );
};

BpkIcon.propTypes = {
  // $FlowIssue[signature-verification-failure] - As these are already prop types annotating these causes isRequired to no longer be accepted so causes the prop to be optional
  icon: PropTypes.oneOf(Object.keys(iconMappings)).isRequired,
  small: PropTypes.bool,
  // $FlowFixMe[incompatible-use] - Ignoring this as we will be moving away from propTypes and also there is no valid export in RN that can be replaced here
  style: Text.propTypes.style,
};

BpkIcon.defaultProps = {
  small: false,
  style: null,
};

/*
Expose icon mapping keys as both key and value
so they can be used by consumers.

We don't include the '-sm' versions because these are chosen by
the component automatically when the 'small' prop is truthy.
*/
const icons: Object = {};
Object.keys(iconMappings).forEach((name) => {
  let value = name;
  if (value.endsWith(SMALL_SUFFIX)) {
    // eslint-disable-next-line prefer-destructuring
    value = value.split(SMALL_SUFFIX)[0];
  }
  icons[value] = value;
});

export default BpkIcon;
export { icons };
