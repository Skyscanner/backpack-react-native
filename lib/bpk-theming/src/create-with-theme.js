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

// This is the same as https://github.com/iamstarkov/theming/blob/master/src/create-with-theme.js
// but using the custom themeListener from above.
import React from 'react';
import PropTypes from 'prop-types';

import createThemeListener from './create-theme-listener';

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

const createWithTheme = () => {
  const themeListener = createThemeListener();

  return Component => {
    class WithTheme extends React.Component {
      static propTypes = {
        forwardedRef: PropTypes.func,
      };

      static defaultProps = {
        forwardedRef: undefined,
      };

      constructor(props, context) {
        super(props, context);
        this.state = { theme: themeListener.initial(context) };
        this.setTheme = theme => this.setState({ theme });
      }

      componentDidMount() {
        this.unsubscribe = themeListener.subscribe(this.context, this.setTheme);
      }

      componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') {
          this.unsubscribe();
        }
      }

      render() {
        const { theme } = this.state;
        const { forwardedRef, ...rest } = this.props;
        return <Component theme={theme} ref={forwardedRef} {...rest} />;
      }
    }
    WithTheme.contextTypes = themeListener.contextTypes;

    const WithThemeForwardRef = React.forwardRef((props, ref) => (
      <WithTheme {...props} forwardedRef={ref} />
    ));

    // Without this, the component will get the name 'ForwardedRef'.
    WithThemeForwardRef.displayName = `withTheme(${getDisplayName(Component)})`;

    return WithThemeForwardRef;
  };
};

export default createWithTheme;
