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

import React, { type ComponentType, type Context } from 'react';
import hoist from 'hoist-non-react-statics';

// Based loosely on https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js
const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return 'Unknown';
  }

  return Component.displayName || Component.name || 'Component';
};

// This is the same as https://github.com/cssinjs/theming/blob/a2e1f4bdb1dc9c8ac705ee9987c86125c34ed485/src/create-with-theme.js
// except we have removed the warning when `theme` is not defined.
export default function createWithTheme<Theme>(context: Context<Theme>) {
  return function withTheme<
    InnerProps,
    InnerComponent: ComponentType<InnerProps>,
    OuterProps: { ...InnerProps, theme?: $NonMaybeType<Theme> },
  >(Component: InnerComponent): ComponentType<OuterProps> {
    // $FlowFixMe
    const WithTheme = React.forwardRef((props, ref) => (
      <context.Consumer>
        {theme => <Component theme={theme} ref={ref} {...props} />}
      </context.Consumer>
    ));

    if (process.env.NODE_ENV !== 'production') {
      WithTheme.displayName = `WithTheme(${getDisplayName(Component)})`;
    }

    hoist(WithTheme, Component);

    return WithTheme;
  };
}
