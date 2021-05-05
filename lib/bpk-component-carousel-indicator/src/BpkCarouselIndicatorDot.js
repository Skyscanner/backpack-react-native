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

import React from 'react';
import PropTypes from 'prop-types';
import {
  animationDurationSm,
  borderRadiusPill,
  colorSkyGrayTint04,
  colorWhite,
  spacingSm,
  carouselIndicatorDotSizeSm,
  carouselIndicatorDotSizeMd,
  carouselIndicatorDotSizeBase,
} from 'bpk-tokens/tokens/base.react.native';
import { Animated, StyleSheet } from 'react-native';
import AnimatedValue from 'react-native/Libraries/Animated/nodes/AnimatedValue';

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: colorSkyGrayTint04,
    borderRadius: borderRadiusPill,
    marginHorizontal: spacingSm / 2, // eslint-disable-line backpack/use-tokens
  },
  indicatorSelected: {
    backgroundColor: colorWhite,
  },
});

export const INDICATOR_SIZES = {
  base: 'base',
  md: 'md',
  sm: 'sm',
  invisible: 'invisible',
};

const indicatorDimensions = {
  [INDICATOR_SIZES.base]: carouselIndicatorDotSizeBase,
  [INDICATOR_SIZES.md]: carouselIndicatorDotSizeMd,
  [INDICATOR_SIZES.sm]: carouselIndicatorDotSizeSm,
  [INDICATOR_SIZES.invisible]: 0,
};

type Props = {
  selected: boolean,
  size: $Keys<typeof INDICATOR_SIZES>,
};

class BpkCarouselIndicatorDot extends React.PureComponent<Props, {}> {
  size: AnimatedValue;

  static propTypes = {
    selected: PropTypes.bool,
    size: PropTypes.oneOf(Object.keys(INDICATOR_SIZES)),
  };

  static defaultProps = {
    selected: false,
    size: INDICATOR_SIZES.base,
  };

  constructor(props: Props) {
    super(props);

    this.size = new Animated.Value(indicatorDimensions[this.props.size]);
  }

  componentDidUpdate() {
    this.animate(this.props.size);
  }

  componentWillEnter(callback: () => void) {
    this.size.setValue(indicatorDimensions[INDICATOR_SIZES.invisible]);

    this.animate(this.props.size, callback);
  }

  componentWillLeave(callback: () => void) {
    this.animate(INDICATOR_SIZES.invisible, callback);
  }

  animate = (size: $Keys<typeof INDICATOR_SIZES>, callback: ?() => void) => {
    Animated.timing(this.size, {
      duration: animationDurationSm,
      toValue: indicatorDimensions[size],
      useNativeDriver: false,
    }).start(callback);
  };

  render() {
    const { selected } = this.props;
    const indicatorStyle = [styles.indicator];

    const style = [
      indicatorStyle,
      {
        height: this.size,
        width: this.size,
      },
    ];

    if (selected) {
      style.push(styles.indicatorSelected);
    }

    return <Animated.View style={style} />;
  }
}

export default BpkCarouselIndicatorDot;
