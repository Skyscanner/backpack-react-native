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

import React, { type ComponentType } from 'react';
import { Text, I18nManager, StyleSheet } from 'react-native';

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

// Based loosely on https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js
const getDisplayName = (Component: ComponentType<*>) => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return 'Unknown';
  }

  return Component.displayName || Component.name || 'Component';
};

const withRtlSupport = (IconComponent: typeof BpkIcon): typeof BpkIcon => {
  const WithRtlSupport = (props: BpkIconProps) => {
    const { style: userStyle, ...rest } = props;
    const rtlStyle = [styles.rtl];

    if (userStyle) {
      rtlStyle.push(userStyle);
    }

    return <IconComponent style={rtlStyle} {...rest} />;
  };

  WithRtlSupport.propTypes = {
    ...BpkIcon.propTypes,
    style: Text.propTypes.style,
  };

  WithRtlSupport.defaultProps = {
    ...BpkIcon.defaultProps,
    style: null,
  };

  if (process.env.NODE_ENV !== 'production') {
    WithRtlSupport.displayName = `withRtlSupport(${getDisplayName(
      IconComponent,
    )})`;
  }

  // $FlowFixMe
  return WithRtlSupport;
};

export default withRtlSupport;
