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

import React, { type Element, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText, { WEIGHT_STYLES } from 'react-native-bpk-component-text';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  icon: {
    marginEnd: spacingSm,
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
  icon: ?Element<typeof BpkIcon>,
};

const BpkButtonInner = (props: Props) => {
  const { icon, iconOnly, iconTrailing, large, textColor, title } = props;

  const iconStyle = [styles.icon, { color: textColor }];
  const textStyle = { color: textColor };

  if (iconTrailing) {
    iconStyle.push(styles.iconTrailing);
  }

  if (iconOnly) {
    iconStyle.push(styles.iconOnly);
  }

  const styledIcon = icon
    ? React.cloneElement(icon, { style: iconStyle })
    : null;

  return (
    <Fragment>
      {styledIcon}
      {!iconOnly && (
        <BpkText
          textStyle={large ? 'lg' : 'sm'}
          weight={WEIGHT_STYLES.emphasized}
          style={textStyle}
        >
          {title}
        </BpkText>
      )}
    </Fragment>
  );
};

export default BpkButtonInner;
