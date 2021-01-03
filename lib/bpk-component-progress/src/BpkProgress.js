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

import React, { Component, type ElementProps, type Config } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Easing, Platform, ViewPropTypes } from 'react-native';
import {
  animationDurationBase,
  spacingMd,
  colorSkyGrayTint06,
  colorBlackTint02,
  colorMonteverde,
  colorSagano,
  borderRadiusPill,
  spacingXxl,
} from 'bpk-tokens/tokens/base.react.native';

import { getThemeAttributes, withTheme, type Theme } from '../../bpk-theming';
import {
  BpkDynamicStyleSheet,
  type WithBpkAppearanceInjectedProps,
  unpackBpkDynamicValue,
  withBpkAppearance,
} from '../../bpk-appearance';

import { REQUIRED_THEME_ATTRIBUTES, themePropType } from './theming';

const dynamicStyles = BpkDynamicStyleSheet.create({
  track: {
    backgroundColor: Platform.select({
      ios: () => ({ light: colorSkyGrayTint06, dark: colorBlackTint02 }),
      android: () => colorSagano,
    })(),
    height: spacingMd,
  },
  fill: {
    height: spacingMd,
  },
  defaultTrackStyle: {
    borderRadius: borderRadiusPill,
    width: spacingXxl * 3,
  },
  defaultFillStyle: {
    backgroundColor: colorMonteverde,
    borderRadius: borderRadiusPill,
  },
  barTrackStyle: {
    width: '100%',
  },
  barFillStyle: {
    backgroundColor: colorMonteverde,
  },
});

const BAR_TYPES = {
  default: 'default',
  bar: 'bar',
};

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export type Props = {
  max: number,
  min: number,
  value: number,
  type: $Keys<typeof BAR_TYPES>,
  style: ViewStyleProp,
  fillStyle: ViewStyleProp,
  theme: ?Theme,
  accessibilityLabel: string | ((number, number, number) => string),
};

type EnhancedProps = Props & WithBpkAppearanceInjectedProps;

type State = {
  width: number,
};

const propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  type: PropTypes.oneOf(Object.keys(BAR_TYPES)),
  style: ViewPropTypes.style,
  fillStyle: ViewPropTypes.style,
  theme: themePropType,
  accessibilityLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
};

const defaultProps = {
  type: BAR_TYPES.default,
  style: null,
  fillStyle: null,
  theme: null,
};

class BpkProgress extends Component<EnhancedProps, State> {
  progressAnimation: Animated.Value;

  static propTypes = { ...propTypes };

  static defaultProps = { ...defaultProps };

  constructor(props: EnhancedProps) {
    super(props);
    this.progressAnimation = new Animated.Value(this.getWithinBoundsProgress());

    this.state = {
      width: 0,
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.value >= 0 && this.props.value !== prevProps.value) {
      Animated.timing(this.progressAnimation, {
        easing: Easing.inOut(Easing.ease),
        duration: animationDurationBase,
        toValue: this.getWithinBoundsProgress(),
        useNativeDriver: false,
      }).start();
    }
  }

  onLayout = (event: any) => {
    this.setState({ width: event.nativeEvent.layout.width });
  };

  getWithinBoundsProgress() {
    return Math.max(Math.min(this.props.value, this.props.max), this.props.min);
  }

  render() {
    const {
      min,
      max,
      type,
      style,
      fillStyle,
      theme,
      bpkAppearance,
      accessibilityLabel,
    } = this.props;
    const styles = unpackBpkDynamicValue(dynamicStyles, bpkAppearance);
    const { width } = this.state;
    const [baseTrackStyle, baseFillStyle] = ['TrackStyle', 'FillStyle'].map(
      (stylePart) => styles[`${type}${stylePart}`],
    );

    const fillWidth = this.progressAnimation.interpolate({
      inputRange: [min, max],
      outputRange: [0, width],
    });

    const themeAttributes = getThemeAttributes(
      REQUIRED_THEME_ATTRIBUTES,
      theme,
    );

    const themeStyle = {
      track: themeAttributes && {
        backgroundColor: themeAttributes.progressTrackBackgroundColor,
      },
      fill: themeAttributes && {
        backgroundColor: themeAttributes.progressFillBackgroundColor,
      },
    };

    const label =
      typeof accessibilityLabel === 'string'
        ? accessibilityLabel
        : accessibilityLabel(min, max, this.getWithinBoundsProgress());

    return (
      <View
        style={[styles.track, baseTrackStyle, themeStyle.track, style]}
        onLayout={this.onLayout}
        accessibilityLabel={label}
      >
        <Animated.View
          style={[
            styles.fill,
            baseFillStyle,
            { width: fillWidth },
            themeStyle.fill,
            fillStyle,
          ]}
        />
      </View>
    );
  }
}

const WithTheme = withTheme(BpkProgress);
type BpkProgressConfig = Config<Props, typeof defaultProps>;
export default withBpkAppearance<BpkProgressConfig>(WithTheme);
