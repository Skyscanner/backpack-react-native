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
import { Marker } from 'react-native-maps';
import { View } from 'react-native';

import BpkIcon from '../../bpk-component-icon';
import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

import { androidStyles } from './BpkIconMarkerStyles';
import {
  ICON_MARKER_STATUSES,
  type Props,
  propTypes,
  defaultProps,
} from './icon-marker-common-types';

const dynamicStyles = BpkDynamicStyleSheet.create(androidStyles);

const BpkIconMarker = (props: Props) => {
  const { disabled, icon, latitude, longitude, onPress, status } = props;
  const styles = useBpkDynamicStyleSheet(dynamicStyles);

  const wrapperStyles = [styles.wrapper];
  const pointerStyles = [styles.pointer];
  const underlayStyles = [styles.underlay];
  const iconStyles = [styles.icon];

  if (disabled) {
    underlayStyles.push(styles.underlayDisabled);
    pointerStyles.push(styles.pointerDisabled);
    iconStyles.push(styles.iconDisabled);
  } else if (status === ICON_MARKER_STATUSES.focused) {
    wrapperStyles.push(styles.wrapperFocused);
    underlayStyles.push(styles.underlayFocused);
    pointerStyles.push(styles.pointerFocused);
    iconStyles.push(styles.iconFocused);
  }

  const onPressFn = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <Marker
      style={styles.marker}
      coordinate={{ latitude, longitude }}
      onPress={onPressFn}
    >
      <View style={pointerStyles} />
      <View style={wrapperStyles}>
        <View style={underlayStyles} />
        <BpkIcon icon={icon} small style={iconStyles} />
      </View>
    </Marker>
  );
};

BpkIconMarker.propTypes = {
  ...propTypes,
};

BpkIconMarker.defaultProps = {
  ...defaultProps,
};

export default BpkIconMarker;
