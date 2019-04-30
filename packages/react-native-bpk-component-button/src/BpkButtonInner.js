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

import React, { Fragment } from 'react';
import { Platform, StyleSheet } from 'react-native';
import BpkText, { WEIGHT_STYLES } from 'react-native-bpk-component-text';
import { spacingSm, spacingLg } from 'bpk-tokens/tokens/base.react.native';

import BpkButtonIcon from './BpkButtonIcon';
import { type IconType } from './common-types';

const styles = StyleSheet.create({
  icon: {
    marginEnd: spacingSm,
    ...(Platform.OS === 'android' ? { lineHeight: spacingLg - spacingSm } : {}),
  },
  iconTrailing: {
    marginStart: spacingSm,
    marginEnd: 0,
  },
  iconOnly: {
    marginStart: 0,
    marginEnd: 0,
  },
});

export type Props = {
  iconOnly: boolean,
  iconTrailing: boolean,
  large: boolean,
  textColor: string,
  title: string,
  icon: ?IconType,
};

const BpkButtonInner = (props: Props) => {
  const {
    icon,
    iconOnly,
    iconTrailing,
    large,
    textColor: color,
    title,
  } = props;

  const iconStyle = [styles.icon, { color }];
  const textStyle = { color };

  if (iconTrailing) {
    iconStyle.push(styles.iconTrailing);
  }

  if (iconOnly) {
    iconStyle.push(styles.iconOnly);
  }

  return (
    <Fragment>
      {icon && <BpkButtonIcon icon={icon} style={iconStyle} small={!large} />}
      {!iconOnly && (
        <BpkText
          textStyle={large ? 'lg' : 'sm'}
          weight={WEIGHT_STYLES.emphasized}
          style={textStyle}
        >
          {Platform.OS === 'android' ? title.toUpperCase() : title}
        </BpkText>
      )}
    </Fragment>
  );
};

export default BpkButtonInner;
