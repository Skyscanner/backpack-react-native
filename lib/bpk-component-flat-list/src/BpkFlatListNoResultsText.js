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

import React, { type Node, type ElementProps } from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import {
  textPrimaryColor,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkText from '../../bpk-component-text';

const dynamicStyles = BpkDynamicStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacingBase,
  },
  text: {
    color: textPrimaryColor,
    flex: 1,
  },
});

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

type Props = {
  children: Node,
  style: ViewStyleProp,
};

const BpkFlatListNoResultsText = (props: Props) => {
  const { children, style: userStyle, ...rest } = props;
  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  return (
    <View style={[styles.wrapper, userStyle]}>
      <BpkText {...rest}>{children}</BpkText>
    </View>
  );
};

BpkFlatListNoResultsText.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
};

BpkFlatListNoResultsText.defaultProps = {
  style: null,
};

export default BpkFlatListNoResultsText;
