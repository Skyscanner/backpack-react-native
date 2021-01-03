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

import React, {
  useEffect,
  useRef,
  type ComponentType,
  type ElementProps,
} from 'react';
import PropTypes from 'prop-types';
import { Animated, View, ViewPropTypes, Image } from 'react-native';
import {
  borderRadiusXs,
  animationDurationBase,
  colorSkyGrayTint04,
  backgroundTertiaryDarkColor,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
  useBpkDynamicValue,
  type BpkDynamicValue,
} from '../../bpk-appearance';
import BpkSpinner, { SPINNER_TYPES } from '../../bpk-component-spinner';

type ImageProps = ElementProps<typeof Image>;
type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;
type DynamicSpinnerType = BpkDynamicValue<$Keys<typeof SPINNER_TYPES>>;

const dynamicStyles = BpkDynamicStyleSheet.create({
  outer: {
    width: '100%',
    height: '100%',
  },
  outerWithBorderRadius: {
    borderRadius: borderRadiusXs,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingIndicatorView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: {
      light: colorSkyGrayTint04,
      dark: backgroundTertiaryDarkColor,
    },
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export type Props = {
  ...$Exact<ImageProps>,
  style: ViewStyleProp,
  inView: boolean,
  loaded: boolean,
  rounded: boolean,
  imageComponent: ComponentType<ImageProps>,
};

const useLoadingAnimation = (loaded: boolean) => {
  const showLoadingIndicator = useRef(!loaded);
  const imageOpacityRef = useRef(new Animated.Value(loaded ? 1 : 0));
  const loadingIndicatorOpacityRef = useRef(new Animated.Value(loaded ? 0 : 1));

  useEffect(() => {
    if (loaded) {
      Animated.sequence([
        Animated.timing(imageOpacityRef.current, {
          toValue: 1,
          duration: animationDurationBase,
          useNativeDriver: false,
        }),
        Animated.timing(loadingIndicatorOpacityRef.current, {
          toValue: 0,
          duration: animationDurationBase,
          useNativeDriver: false,
        }),
      ]).start(() => {
        showLoadingIndicator.current = false;
      });
    }
  }, [loaded]);

  return [
    showLoadingIndicator.current,
    imageOpacityRef.current,
    loadingIndicatorOpacityRef.current,
  ];
};

const BpkImage = (props: Props) => {
  const {
    style: userStyle,
    inView,
    rounded,
    loaded,
    imageComponent: ImageComponent,
    onLoad,
    ...rest
  } = props;

  const [
    showLoadingIndicator,
    imageOpacity,
    loadingIndicatorOpacity,
  ] = useLoadingAnimation(loaded);

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const outerStyle = [styles.outer];
  if (rounded) {
    outerStyle.push(styles.outerWithBorderRadius);
  }
  if (userStyle) {
    outerStyle.push(userStyle);
  }

  const spinnerType = useBpkDynamicValue<DynamicSpinnerType>({
    light: 'dark',
    dark: 'light',
  });

  return showLoadingIndicator ? (
    <View style={outerStyle}>
      <Animated.View
        style={[
          styles.loadingIndicatorView,
          { opacity: loadingIndicatorOpacity },
        ]}
      >
        {inView && <BpkSpinner small type={spinnerType} />}
      </Animated.View>
      {inView && (
        <ImageComponent
          onLoad={onLoad}
          style={[styles.image, { opacity: imageOpacity }]}
          {...rest}
        />
      )}
    </View>
  ) : (
    <ImageComponent onLoad={onLoad} style={outerStyle} {...rest} />
  );
};

BpkImage.propTypes = {
  // see: https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageSourcePropType.js#L82
  source: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  inView: PropTypes.bool,
  loaded: PropTypes.bool,
  onLoad: PropTypes.func,
  rounded: PropTypes.bool,
  style: ViewPropTypes.style,
  imageComponent: PropTypes.func,
};

BpkImage.defaultProps = {
  inView: true,
  loaded: true,
  onLoad: null,
  rounded: true,
  style: null,
  imageComponent: Animated.Image,
};

export default BpkImage;
