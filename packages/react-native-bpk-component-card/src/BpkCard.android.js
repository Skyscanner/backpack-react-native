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
  colorWhite,
  elevationSm,
  elevationLg,
  borderRadiusSm,
  borderRadiusLg,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import React, { type Node, type ElementProps } from 'react';
import { Platform, View, StyleSheet, ViewPropTypes } from 'react-native';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';

import CORNER_STYLES, { defaultCornerStyle } from './BpkCardCornerStyles';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    elevation: elevationSm,
  },
  cardCornerStyleLarge: {
    borderRadius: borderRadiusLg,
  },
  cardPadded: {
    padding: spacingBase,
  },
  cardFocused: {
    elevation: elevationLg,
  },
});

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export type Props = {
  children: Node,
  onPress: (SyntheticEvent<>) => mixed,
  cornerStyle: ?$Keys<typeof CORNER_STYLES>,
  focused: boolean,
  padded: boolean,
  innerStyle: ViewStyleProp,
  style: ViewStyleProp,
};

const BpkCard = (props: Props) => {
  const {
    children,
    cornerStyle,
    focused,
    padded,
    style: userStyle,
    innerStyle: userInnerStyle,
    ...rest
  } = props;

  const style = [styles.card];
  const innerStyle = [];

  if (padded) {
    innerStyle.push(styles.cardPadded);
  }
  if (focused) {
    style.push(styles.cardFocused);
  }
  if (userStyle) {
    style.push(userStyle);
  }
  if (userInnerStyle) {
    innerStyle.push(userInnerStyle);
  }
  if (cornerStyle === CORNER_STYLES.lg) {
    style.push(styles.cardCornerStyleLarge);
  }

  return (
    <View style={style}>
      <BpkTouchableNativeFeedback
        borderlessBackground={Platform.Version !== 28}
        accessibilityComponentType="button"
        {...rest}
      >
        <View style={innerStyle}>{children}</View>
      </BpkTouchableNativeFeedback>
    </View>
  );
};

BpkCard.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  cornerStyle: PropTypes.oneOf(Object.keys(CORNER_STYLES)),
  focused: PropTypes.bool,
  padded: PropTypes.bool,
  innerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
};

BpkCard.defaultProps = {
  cornerStyle: defaultCornerStyle,
  focused: false,
  padded: true,
  innerStyle: null,
  style: null,
};

export default BpkCard;
