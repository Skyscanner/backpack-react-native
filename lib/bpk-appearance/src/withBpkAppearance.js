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

import React, { type AbstractComponent } from 'react';

import { useBpkAppearance } from './hooks';
import { type BpkAppearancePreferences } from './BpkAppearance';

export type InjectedProps = {| bpkAppearance: BpkAppearancePreferences |};

const getDisplayName = (Component) =>
  Component.displayName || Component.name || 'Component';

/**
 * This HOC wraps a component and provides the current `BpkAppearancePreferences`
 * as provided by the nearest `BpkAppearanceProvider`.
 *
 * NOTE: If you are using a functional component use one of the provided hooks instead.
 *
 * @example
 * import React, { type Config } from 'react';
 * import { type WithBpkAppearanceInjectedProps, withBpkAppearance } from '../../bpk-appearance';
 *
 * class MyComponent extends Component<Props & WithBpkAppearanceInjectedProps> {
 *  render() {
 *    const { bpkAppearance, ...rest } = this.props;
 *    ....
 *  }
 * }
 *
 * export default withBpkAppearance<Config<Props, DefaultProps>>(MyComponent);
 *
 * @argument {Component} Component the component to be wrapped
 * @returns {Component} the wrapped component with an extra `bpkAppearance` prop.
 */
const withBpkAppearance = <Config>(
  Component: AbstractComponent<{| ...$Exact<Config>, ...InjectedProps |}>,
): AbstractComponent<Config> => {
  const WithBpkAppearance = React.forwardRef((props, ref) => {
    const appearance = useBpkAppearance();
    return <Component {...props} ref={ref} bpkAppearance={appearance} />;
  });

  WithBpkAppearance.displayName = `withBpkAppearance(${getDisplayName(
    Component,
  )})`;

  return WithBpkAppearance;
};

export default withBpkAppearance;
