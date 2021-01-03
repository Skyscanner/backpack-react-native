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

import React, { type Node, type ElementProps } from 'react';
import PropTypes from 'prop-types';
import {
  borderRadiusXs,
  borderRadiusSm,
  borderRadiusMd,
  borderRadiusLg,
  borderRadiusPill,
  // TODO: Make touchableOverlayColor a semantic colour, will require a breaking change.
  textPrimaryColor as touchableOverlayColor,
  touchableOverlayOpacity,
} from 'bpk-tokens/tokens/base.react.native';
import { View, ViewPropTypes, TouchableWithoutFeedback } from 'react-native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

const dynamicStyles = BpkDynamicStyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: touchableOverlayColor,
    opacity: 0,
  },
  overlayborderRadiusXs: {
    borderRadius: borderRadiusXs,
  },
  overlayborderRadiusSm: {
    borderRadius: borderRadiusSm,
  },
  overlayborderRadiusMd: {
    borderRadius: borderRadiusMd,
  },
  overlayBorderRadiusLg: {
    borderRadius: borderRadiusLg,
  },
  overlayBorderRadiusPill: {
    borderRadius: borderRadiusPill,
  },
  overlayShow: {
    opacity: touchableOverlayOpacity,
  },
});

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export type Props = {
  children: Node,
  borderRadius: ?('xs' | 'sm' | 'md' | 'lg' | 'pill' | number),
  style: ViewStyleProp,
  overlayStyle: ViewStyleProp,
  onPressIn: ?() => mixed,
  onPressOut: ?() => mixed,
};

const BpkTouchableOverlay = (props: Props) => {
  const {
    children,
    borderRadius,
    style,
    overlayStyle,
    onPressIn,
    onPressOut,
    ...rest
  } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  let overlayRef;

  const overlayStyles = [styles.overlay];
  if (borderRadius) {
    if (borderRadius === 'xs') {
      overlayStyles.push(styles.overlayborderRadiusXs);
    } else if (borderRadius === 'sm') {
      overlayStyles.push(styles.overlayborderRadiusSm);
    } else if (borderRadius === 'md') {
      overlayStyles.push(styles.overlayborderRadiusMd);
    } else if (borderRadius === 'lg') {
      overlayStyles.push(styles.overlayBorderRadiusLg);
    } else if (borderRadius === 'pill') {
      overlayStyles.push(styles.overlayBorderRadiusPill);
    } else {
      overlayStyles.push({ borderRadius });
    }
  }
  if (overlayStyle) {
    overlayStyles.push(overlayStyle);
  }

  return (
    <TouchableWithoutFeedback
      {...rest}
      onPressIn={() => {
        if (overlayRef) {
          overlayRef.setNativeProps({
            style: [styles.overlay, styles.overlayShow],
          });
        }

        if (onPressIn) {
          onPressIn();
        }
      }}
      onPressOut={() => {
        if (overlayRef) {
          overlayRef.setNativeProps({ style: [styles.overlay] });
        }

        if (onPressOut) {
          onPressOut();
        }
      }}
    >
      <View style={style}>
        {children}
        <View
          style={overlayStyles}
          ref={(ref) => {
            overlayRef = ref;
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

BpkTouchableOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  borderRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['sm', 'lg', 'pill']),
  ]),
  style: ViewPropTypes.style,
  overlayStyle: ViewPropTypes.style,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
};

BpkTouchableOverlay.defaultProps = {
  borderRadius: null,
  style: null,
  overlayStyle: null,
  onPressIn: null,
  onPressOut: null,
};

export default BpkTouchableOverlay;
