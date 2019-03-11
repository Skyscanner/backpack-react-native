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

import React, { Component, type ComponentType } from 'react';

// From Recompose: https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js
const getDisplayName = WrappedComponent => {
  if (typeof WrappedComponent === 'string') {
    return WrappedComponent;
  }

  if (!WrappedComponent) {
    return 'Unknown';
  }

  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLoadingBehavior = (
  WrappedComponent: ComponentType<any>,
): ComponentType<any> => {
  class WithLoadingBehavior extends Component<{}, { loaded: boolean }> {
    constructor() {
      super();

      this.state = {
        loaded: false,
      };
    }

    onLoad = () => {
      this.setState(() => ({
        loaded: true,
      }));
    };

    render() {
      return (
        <WrappedComponent
          onLoad={this.onLoad}
          loaded={this.state.loaded}
          {...this.props}
        />
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithLoadingBehavior.displayName = `withLoadingBehavior(${getDisplayName(
      WrappedComponent,
    )})`;
  }

  return WithLoadingBehavior;
};

export default withLoadingBehavior;
