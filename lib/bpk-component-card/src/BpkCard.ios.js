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
  backgroundTertiaryColor,
  backgroundSecondaryColor,
  borderRadiusMd,
  borderRadiusLg,
  spacingBase,
  colorWhite,
} from 'bpk-tokens/tokens/base.react.native';
import React, { type Node, type ElementProps } from 'react';
import { View, ViewPropTypes } from 'react-native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkTouchableOverlay from '../../bpk-component-touchable-overlay';
import { shadows } from '../../bpk-styles';

import CORNER_STYLES, { defaultCornerStyle } from './BpkCardCornerStyles';

const dynamicStyles = BpkDynamicStyleSheet.create({
  card: {
    light: {
      backgroundColor: colorWhite,
      borderRadius: borderRadiusMd,
      ...shadows.base(),
    },
    dark: {
      backgroundColor: backgroundSecondaryColor,
      borderRadius: borderRadiusMd,
    },
  },
  cardCornerStyleLarge: {
    borderRadius: borderRadiusLg,
  },
  cardPadded: {
    padding: spacingBase,
  },
  cardFocused: {
    light: { ...shadows.large() },
    dark: { backgroundColor: backgroundTertiaryColor },
  },
  cardInner: {
    backgroundColor: 'transparent', // otherwise this view's corners would bleed outwith the outer container
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

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const style = [styles.card];
  const innerStyle = [styles.cardInner];

  if (padded) {
    style.push(styles.cardPadded);
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
    <BpkTouchableOverlay
      accessibilityRole="button"
      style={style}
      // We set sm to 'md' here so that the overlay corner styles selected match the card borderRadius
      // Rather than introducing a new style which is not in the design system we are modifying the default to align correctly.
      borderRadius={cornerStyle === CORNER_STYLES.sm ? 'md' : cornerStyle}
      {...rest}
    >
      <View style={innerStyle}>{children}</View>
    </BpkTouchableOverlay>
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
