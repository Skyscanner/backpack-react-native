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

import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import {
  borderRadiusSm,
  colorBlackTint03,
  colorBlackTint05,
  colorWhite,
  colorSkyBlue,
  colorSkyBlueTint01,
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
    paddingVertical: spacingSm,
    paddingHorizontal: spacingMd,
  },
  wrapperFocused: {
    paddingVertical: spacingMd,
  },
  pointer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colorSkyBlue,
    borderRadius: borderRadiusSm,
    height: spacingBase,
    transform: [{ rotate: '45deg' }],
    width: spacingBase,
    left: '50%',
    top: '100%',
    marginTop: -spacingSm,
  },
  pointerDisabled: {
    backgroundColor: {
      dark: colorBlackTint03,
      light: colorWhite,
    },
  },
  pointerFocused: {
    backgroundColor: colorSkyBlue,
    marginTop: spacingSm,
  },
  pointerViewed: {
    backgroundColor: colorSkyBlueTint03,
  },
  underlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colorSkyBlue,
    borderRadius: borderRadiusSm,
  },
  underlayDisabled: {
    backgroundColor: {
      dark: colorBlackTint03,
      light: colorWhite,
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
    color: colorSkyBlueTint01,
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

  return (
    <Marker coordinate={{ latitude, longitude }}>
      <TouchableHighlight onPress={onPress}>
        <View style={wrapperStyles}>
          <View style={pointerStyles} />
          <View style={underlayStyles} />
          <BpkText textStyle="base" weight="emphasized" style={labelStyles}>
            {label}
          </BpkText>
        </View>
      </TouchableHighlight>
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
