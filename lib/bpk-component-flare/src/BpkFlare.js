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
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ViewPropTypes } from 'react-native';
import { type ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import NativeFlare from './NativeFlare';

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});

export const FLARE_POINTER_DIRECTIONS = {
  down: 'down',
  up: 'up',
};

export type Props = {
  children: Node,
  pointerDirection: $Keys<typeof FLARE_POINTER_DIRECTIONS>,
  style: ViewStyleProp,
};

const BpkFlare = (props: Props): Node => {
  const { children, style: userStyle, ...rest } = props;

  const style = [styles.base];
  if (userStyle) {
    style.push(userStyle);
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <NativeFlare style={style} {...rest}>
      {children}
    </NativeFlare>
  );
};

BpkFlare.propTypes = {
  children: PropTypes.node.isRequired,
  // $FlowIssue[signature-verification-failure] - As these are already prop types
  pointerDirection: PropTypes.oneOf(Object.keys(FLARE_POINTER_DIRECTIONS)),
  style: ViewPropTypes.style,
};

BpkFlare.defaultProps = {
  pointerDirection: FLARE_POINTER_DIRECTIONS.down,
  style: null,
};

export default BpkFlare;
