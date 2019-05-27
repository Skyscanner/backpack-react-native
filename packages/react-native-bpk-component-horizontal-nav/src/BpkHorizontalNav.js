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

import {
  I18nManager,
  ScrollView,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import React, { type Node, type ElementProps } from 'react';
import PropTypes from 'prop-types';
import {
  colorGray100,
  borderSizeSm,
} from 'bpk-tokens/tokens/base.react.native';
import { withTheme, grayForTheme, type Theme } from 'react-native-bpk-theming';

import withAnimatedProps from './withAnimatedProps';
import BpkHorizontalNavSelectedIndicator from './BpkHorizontalNavSelectedIndicator';

// $FlowFixMe, because HOCs
const AnimatedIndicator: typeof BpkHorizontalNavSelectedIndicator = withAnimatedProps(
  BpkHorizontalNavSelectedIndicator,
  ['xOffset', 'width'],
);

const styles = StyleSheet.create({
  nav: {
    borderColor: 'transparent',
    borderBottomColor: colorGray100,
    flexDirection: 'column',
    borderBottomWidth: borderSizeSm,
  },
  // to allow ScrollView item to be properly positioned in the spaceAround config
  // the contentContainerStyle needs flexGrow to have the children define the end
  // width and allow overflow from the view
  navSpaceAround: {
    flexGrow: 1,
  },
  inner: {
    flexDirection: 'row',
  },
  innerSpaceAround: {
    justifyContent: 'space-around',
  },
  indicatorWrapper: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
});

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export type Props = {
  children: Node,
  selectedId: string,
  spaceAround: boolean,
  style: ViewStyleProp,
  theme: ?Theme,
};

type State = {
  indicatorOffsetX: ?number,
  indicatorWidth: ?number,
};

class BpkHorizontalNav extends React.Component<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    selectedId: PropTypes.string.isRequired,
    spaceAround: PropTypes.bool,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    spaceAround: false,
    style: null,
    theme: null,
  };

  constructor() {
    super();

    this.state = {
      indicatorOffsetX: null,
      indicatorWidth: null,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedId && this.childrenPositions[nextProps.selectedId]) {
      const nextLayoutProps = this.childrenPositions[nextProps.selectedId];

      this.setState({
        indicatorOffsetX: nextLayoutProps.x,
        indicatorWidth: nextLayoutProps.width,
      });
    }
  }

  onChildLayout = (event: any, id: string) => {
    const { width, x } = event.nativeEvent.layout;
    this.childrenPositions[id] = { width, x };

    // If the child in question is the initially selected one, the indicator can now be positioned.
    if (this.props.selectedId === id) {
      this.setState({
        indicatorOffsetX: x,
        indicatorWidth: width,
      });
    }
  };

  childrenPositions = {};

  render() {
    const {
      children,
      selectedId,
      spaceAround,
      style,
      theme,
      ...rest
    } = this.props;

    const navStyle = [styles.nav];
    const innerViewStyle = [styles.inner];

    if (theme) {
      navStyle.push({ borderBottomColor: grayForTheme(theme, 'colorGray100') });
    }

    if (spaceAround) {
      navStyle.push(styles.navSpaceAround);
      innerViewStyle.push(styles.innerSpaceAround);
    }

    if (style) {
      navStyle.push(style);
    }

    const enhancedChildren = React.Children.map(
      children,
      child =>
        React.isValidElement(child) &&
        React.cloneElement(child, {
          key: child.props.id,
          selected: selectedId === child.props.id,

          // Have children report their layout details after being laid out.
          // This allows the selected indicator to be correctly positioned.
          onLayout: event => this.onChildLayout(event, child.props.id),
        }),
    );

    const renderIndicator = () => {
      if (this.state.indicatorOffsetX === null) {
        return null;
      }

      return (
        <View style={styles.indicatorWrapper}>
          <AnimatedIndicator
            xOffset={this.state.indicatorOffsetX}
            width={this.state.indicatorWidth}
          />
        </View>
      );
    };

    return (
      <ScrollView
        alwaysBounceHorizontal={false}
        contentContainerStyle={navStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        {...rest}
      >
        <View style={innerViewStyle}>{enhancedChildren}</View>
        {renderIndicator()}
      </ScrollView>
    );
  }
}

export default withTheme(BpkHorizontalNav);
