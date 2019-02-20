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

/*
 Higher order component that takes a component and an array of property names,
 then converts said properties into instances of Animated.Value, then adds
 a componentWillReceiveProps listener so that when they change, they are updated
 with an animation.

 Sample usage:

 const MyComponent (props) = <Animated.View style={{ width: props.someProp }} />;
 const animatedComponent = withAnimatedProps(MyComponent, ['someProp']);

 Now when `someProp` changes, it will be animated.
 */

import { Animated } from 'react-native';
import React, { Component, type ComponentType } from 'react';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';

function withAnimatedProps<Props: {}>(
  WrappedComponent: ComponentType<Props>,
  animatedProps: Array<string>,
): ComponentType<Props> {
  return class WithAnimatedProps extends Component<Props, {}> {
    constructor(props: Props) {
      super(props);

      this.state = {};

      animatedProps.forEach(prop => {
        this.state[prop] = new Animated.Value(props[prop]);
      });
    }

    componentWillReceiveProps(nextProps: Props) {
      const animations = animatedProps.map(prop =>
        Animated.timing(this.state[prop], {
          toValue: nextProps[prop],
          duration: animationDurationSm,
        }),
      );

      Animated.parallel(animations).start();
    }

    render() {
      const newProps = {};

      animatedProps.forEach(prop => {
        newProps[prop] = this.state[prop];
      });

      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default withAnimatedProps;
