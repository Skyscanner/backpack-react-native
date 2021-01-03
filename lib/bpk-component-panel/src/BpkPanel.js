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
import {
  backgroundSecondaryDarkColor,
  colorWhite,
  colorSkyGrayTint06,
  spacingBase,
  borderSizeSm,
  borderRadiusMd,
} from 'bpk-tokens/tokens/base.react.native';
import { View, ViewPropTypes } from 'react-native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

const dynamicStyles = BpkDynamicStyleSheet.create({
  panel: {
    backgroundColor: { light: colorWhite, dark: backgroundSecondaryDarkColor },
    borderRadius: borderRadiusMd,
    borderWidth: { light: borderSizeSm, dark: 0 },
    borderColor: { light: colorSkyGrayTint06, dark: null },
  },
  panelPadded: {
    padding: spacingBase,
  },
});

export type Props = {
  children: Node,
  padded: boolean,
  style: ?any,
};

const BpkPanel = (props: Props) => {
  const { padded, children, style, ...rest } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const panelStyle = [styles.panel];

  if (padded) {
    panelStyle.push(styles.panelPadded);
  }
  if (style) {
    panelStyle.push(style);
  }

  return (
    <View {...rest} style={panelStyle}>
      {children}
    </View>
  );
};

BpkPanel.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkPanel.defaultProps = {
  padded: true,
  style: null,
};

export default BpkPanel;
