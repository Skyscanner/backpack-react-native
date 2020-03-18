/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import React, { type ElementProps, type Node } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';

import NativeFlare from './NativeFlare';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});

export const INSET_PADDING_MODES = {
  none: 'none',
  bottom: 'bottom',
};

export type Props = {
  children: Node,
  insetPaddingMode: $Keys<typeof INSET_PADDING_MODES>,
  style: ViewStyleProp,
};

const BpkFlare = (props: Props) => {
  const { children, insetPaddingMode, style: userStyle, ...rest } = props;

  const style = [styles.base];
  if (userStyle) {
    style.push(userStyle);
  }

  return (
    <NativeFlare style={style} {...rest}>
      {children}
    </NativeFlare>
  );
};

BpkFlare.propTypes = {
  children: PropTypes.node.isRequired,

  /*
  Note for iOS implementation:

  insetPaddingMode is used in the Android flare component to determine whether or not
  to remove padding when placing an image inside the flare.

  When placing an image, users will want 'bottom' set, as this places the image inside the flare
  instead of above it.

  Therefore, when insetPaddingMode === INSET_PADDING_MODES.bottom, the iOS component should
  set the backgroundView. When it's INSET_PADDING_MODES.none it should set contentView.

  Please remove this comment when the iOS implementation is complete.
  */
  insetPaddingMode: PropTypes.oneOf(Object.keys(INSET_PADDING_MODES)),
  style: ViewPropTypes.style,
};

BpkFlare.defaultProps = {
  insetPaddingMode: INSET_PADDING_MODES.none,
  style: null,
};

export default BpkFlare;
