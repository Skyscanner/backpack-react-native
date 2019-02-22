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

import React, { type ComponentType } from 'react';
import { I18nManager, StyleSheet } from 'react-native';

import BpkIcon, { type Props as BpkIconProps } from './BpkIcon';

const styles = StyleSheet.create({
  rtl: {
    transform: [
      {
        scaleX: I18nManager.isRTL ? -1 : 1,
      },
    ],
  },
});

export type Props = {
  ...$Exact<BpkIconProps>,
};

const withRtlSupport = (IconComponent: ComponentType<BpkIconProps>) => {
  const WithRtlSupport = (props: Props) => {
    const { style: userStyle, ...rest } = props;
    const rtlStyle = [styles.rtl];

    if (userStyle) {
      rtlStyle.push(userStyle);
    }

    return <IconComponent style={rtlStyle} {...rest} />;
  };

  withRtlSupport.propTypes = {
    ...BpkIcon.propTypes,
  };

  withRtlSupport.defaultProps = {
    ...BpkIcon.defaultProps,
  };

  return WithRtlSupport;
};

export default withRtlSupport;
