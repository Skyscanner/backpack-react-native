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

import PropTypes from 'prop-types';
import React, { type ComponentType, type Node } from 'react';
import { View, ViewPropTypes } from 'react-native';
import {
  colorSkyGrayTint06,
  lineDarkColor,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';

import BpkPanel, { type Props as BpkPanelProps } from './BpkPanel';

const dynamicStyles = BpkDynamicStyleSheet.create({
  panel: {
    flexDirection: 'row',
  },
  panelVertical: {
    flexDirection: 'column',
  },
  panelMain: {
    flex: 1,
  },
  panelMainVertical: {
    // $FlowFixMe, becuase how else are you supposed to reset a flex value?
    flex: null,
  },
  panelMainPadded: {
    paddingRight: spacingBase,
  },
  panelMainPaddedVertical: {
    paddingBottom: spacingBase,
  },
  panelPunchline: {
    width: 1, // eslint-disable-line backpack/use-tokens
    flexDirection: 'column',
    backgroundColor: { light: colorSkyGrayTint06, dark: lineDarkColor },
  },
  panelPunchlineVertical: {
    width: null,
    height: 1, // eslint-disable-line backpack/use-tokens
    flexDirection: 'row',
  },
  panelStub: {
    flex: 1,
  },
  panelStubVertical: {
    // $FlowFixMe, becuase how else are you supposed to reset a flex value?
    flex: null,
  },
  panelStubPadded: {
    paddingLeft: spacingBase,
  },
  panelStubPaddedVertical: {
    paddingTop: spacingBase,
  },
});

export type Props = {
  ...$Exact<BpkPanelProps>,
  stub: Node,
  vertical: boolean,
  mainStyle: ?any,
  stubStyle: ?any,
};

const withDivider = (PanelComponent: ComponentType<BpkPanelProps>) => {
  const WithDivider = (props: Props) => {
    const {
      children,
      stub,
      padded,
      vertical,
      mainStyle: userMainStyle,
      stubStyle: userStubStyle,
      style,
      ...rest
    } = props;

    const styles = useBpkDynamicStyleSheet(dynamicStyles);
    const panelStyle = [styles.panel];
    const mainStyle = [styles.panelMain];
    const punchlineStyle = [styles.panelPunchline];
    const stubStyle = [styles.panelStub];

    if (padded) {
      mainStyle.push(
        vertical ? styles.panelMainPaddedVertical : styles.panelMainPadded,
      );
      stubStyle.push(
        vertical ? styles.panelStubPaddedVertical : styles.panelStubPadded,
      );
    }
    if (vertical) {
      panelStyle.push(styles.panelVertical);
      mainStyle.push(styles.panelMainVertical);
      punchlineStyle.push(styles.panelPunchlineVertical);
      stubStyle.push(styles.panelStubVertical);
    }
    if (userMainStyle) {
      mainStyle.push(userMainStyle);
    }
    if (userStubStyle) {
      stubStyle.push(userStubStyle);
    }
    if (style) {
      panelStyle.push(style);
    }

    return (
      <PanelComponent padded={padded} style={panelStyle} {...rest}>
        <View style={mainStyle}>{children}</View>
        <View style={punchlineStyle} />
        <View style={stubStyle}>{stub}</View>
      </PanelComponent>
    );
  };

  WithDivider.propTypes = {
    ...BpkPanel.propTypes,
    stub: PropTypes.node.isRequired,
    vertical: PropTypes.bool,
    mainStyle: ViewPropTypes.style,
    stubStyle: ViewPropTypes.style,
  };

  WithDivider.defaultProps = {
    ...BpkPanel.defaultProps,
    vertical: false,
    mainStyle: null,
    stubStyle: null,
  };

  return WithDivider;
};

export default withDivider;
