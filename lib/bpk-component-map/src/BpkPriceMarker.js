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

import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import {
  borderRadiusXs,
  colorBlackTint03,
  colorBlackTint05,
  colorWhite,
  colorSkyBlue,
  colorSkyBlueTint03,
  colorSkyGrayTint04,
  spacingSm,
  spacingMd,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import { shadows } from '../../bpk-styles';
import BpkText from '../../bpk-component-text';

export const PRICE_MARKER_STATUSES = {
  default: 'default',
  focused: 'focused',
  viewed: 'viewed',
};

const dynamicStyles = BpkDynamicStyleSheet.create({
  wrapper: {
    ...shadows.base(),
    paddingHorizontal: spacingMd,
    paddingVertical: spacingSm,
  },
  wrapperFocused: {
    paddingVertical: spacingMd,
  },
  pointer: {
    backgroundColor: colorSkyBlue,
    borderRadius: borderRadiusXs,
    height: spacingBase,
    transform: [{ rotate: '45deg' }],
    width: spacingBase,
    left: '50%',
    position: 'absolute',
    bottom: -spacingSm,
  },
  pointerDisabled: {
    backgroundColor: {
      light: colorWhite,
      dark: colorBlackTint03,
    },
  },
  pointerFocused: {
    backgroundColor: colorSkyBlue,
  },
  pointerViewed: {
    backgroundColor: colorSkyBlueTint03,
  },
  underlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colorSkyBlue,
    borderRadius: borderRadiusXs,
  },
  underlayDisabled: {
    backgroundColor: {
      light: colorWhite,
      dark: colorBlackTint03,
    },
  },
  underlayFocused: {
    backgroundColor: colorWhite,
    borderWidth: spacingSm * 0.5,
    borderColor: colorSkyBlue,
  },
  underlayViewed: {
    backgroundColor: colorSkyBlueTint03,
  },
  label: {
    color: colorWhite,
  },
  labelDisabled: {
    color: {
      light: colorSkyGrayTint04,
      dark: colorBlackTint05,
    },
  },
  labelFocused: {
    color: colorSkyBlue,
  },
  labelViewed: {
    color: colorSkyBlue,
  },
});

export type Props = {
  disabled: boolean,
  label: string,
  latitude: number,
  longitude: number,
  onPress: () => mixed,
  status: $Keys<typeof PRICE_MARKER_STATUSES>,
};

const BpkPriceMarker = (props: Props) => {
  const { disabled, label, latitude, longitude, onPress, status } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);

  const wrapperStyles = [styles.wrapper];
  const pointerStyles = [styles.pointer];
  const labelStyles = [styles.label];
  const underlayStyles = [styles.underlay];

  if (disabled) {
    underlayStyles.push(styles.underlayDisabled);
    pointerStyles.push(styles.pointerDisabled);
    labelStyles.push(styles.labelDisabled);
  } else {
    if (status === PRICE_MARKER_STATUSES.focused) {
      wrapperStyles.push(styles.wrapperFocused);
      underlayStyles.push(styles.underlayFocused);
      pointerStyles.push(styles.pointerFocused);
      labelStyles.push(styles.labelFocused);
    }
    if (status === PRICE_MARKER_STATUSES.viewed) {
      underlayStyles.push(styles.underlayViewed);
      pointerStyles.push(styles.pointerViewed);
      labelStyles.push(styles.labelViewed);
    }
  }

  const onPressFn = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <Marker coordinate={{ latitude, longitude }} onPress={onPressFn}>
      <View style={wrapperStyles}>
        <View style={pointerStyles} />
        <View style={underlayStyles} />
        <BpkText
          textStyle={status === PRICE_MARKER_STATUSES.focused ? 'base' : 'sm'}
          weight="emphasized"
          style={labelStyles}
        >
          {label}
        </BpkText>
      </View>
    </Marker>
  );
};

BpkPriceMarker.propTypes = {
  label: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  status: PropTypes.oneOf(Object.keys(PRICE_MARKER_STATUSES)),
};

BpkPriceMarker.defaultProps = {
  disabled: false,
  status: PRICE_MARKER_STATUSES.default,
};

export default BpkPriceMarker;
