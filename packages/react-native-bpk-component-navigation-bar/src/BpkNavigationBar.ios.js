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

import PropTypes from 'prop-types';
import React, {
  Component,
  isValidElement,
  type Element,
  type ElementProps,
} from 'react';
import {
  withTheme,
  getThemeAttributes,
  makeThemePropType,
} from 'react-native-bpk-theming';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { colorGray50, colorGray100 } from 'bpk-tokens/tokens/base.react.native';

import {
  type CommonTheme,
  type TitleProp,
  THEME_ATTRIBUTES,
  TITLE_PROPTYPE,
} from './common-types';
import TitleView from './TitleView';
import isIphoneX from './isIphoneX';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

const IOS_THEME_ATTRIBUTES = [
  ...THEME_ATTRIBUTES,
  'navigationBarShadowColor',
  'navigationBarPrimaryColor',
];

const statusBarPadding = isIphoneX ? 44 : 20;

const styles = StyleSheet.create({
  barOuter: {
    flexDirection: 'column',
    paddingHorizontal: 8, // eslint-disable-line backpack/use-tokens
    width: '100%',
    backgroundColor: colorGray50,
    shadowColor: colorGray100,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 1 }, // eslint-disable-line backpack/use-tokens
  },
  barOuterWithSubtitle: {
    paddingBottom: 16, // eslint-disable-line backpack/use-tokens
  },
  barInner: {
    paddingTop: statusBarPadding, // Status bar
    // 44 for the bar + 20 for the status bar
    height: 64, // eslint-disable-line backpack/use-tokens
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barOnlyTrailingButton: {
    justifyContent: 'flex-end',
  },
  iPhoneXBar: {
    paddingTop: statusBarPadding,
    height: 88, // eslint-disable-line backpack/use-tokens
  },
  titleContainer: {
    position: 'absolute',
    top: statusBarPadding,
    left: 0,
    right: 0,
    bottom: 0,
    height: 44, // eslint-disable-line backpack/use-tokens
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    maxWidth: '60%',
  },
  subtitleViewContainer: {
    paddingHorizontal: 8, // eslint-disable-line backpack/use-tokens
  },
});

type IOSTheme = {
  ...$Exact<CommonTheme>,
  navigationBarShadowColor: string,
  navigationBarPrimaryColor: string,
};

export type Props = {
  title: TitleProp,
  theme: ?IOSTheme,
  leadingButton: ?Element<any>,
  trailingButton: ?Element<any>,
  subtitleView: ?Element<any>,
  style: ViewStyleProp,
};

class BpkNavigationBar extends Component<Props, {}> {
  theme: ?IOSTheme;

  static propTypes = {
    title: TITLE_PROPTYPE.isRequired,
    theme: makeThemePropType(IOS_THEME_ATTRIBUTES),
    leadingButton: PropTypes.element,
    trailingButton: PropTypes.element,
    subtitleView: PropTypes.element,

    style: ViewPropTypes.style,
  };

  static defaultProps = {
    theme: null,
    leadingButton: null,
    trailingButton: null,
    subtitleView: null,
    style: null,
  };

  constructor(props) {
    super(props);
    this.theme = getThemeAttributes(
      IOS_THEME_ATTRIBUTES,
      this.props.theme || {},
    );
  }

  componentDidUpdate() {
    this.theme = getThemeAttributes(
      IOS_THEME_ATTRIBUTES,
      this.props.theme || {},
    );
  }

  render() {
    const {
      title,
      leadingButton,
      trailingButton,
      subtitleView,
      style,
    } = this.props;
    const hasSubtitleView = subtitleView !== null;
    const titleStyle = [styles.title];
    const outerBarStyle = [styles.barOuter];
    const innerBarStyle = [styles.barInner, isIphoneX && styles.iPhoneXBar];

    let tintColor = null;
    let disabledTintColor = null;
    let primaryTintColor = null;

    if (this.theme) {
      const {
        navigationBarTintColor,
        navigationBarDisabledTintColor,
        navigationBarShadowColor,
        navigationBarBackgroundColor,
        navigationBarPrimaryColor,
      } = this.theme;
      outerBarStyle.push({
        shadowColor: navigationBarShadowColor,
        backgroundColor: navigationBarBackgroundColor,
      });
      titleStyle.push({ color: navigationBarTintColor });
      tintColor = navigationBarTintColor;
      disabledTintColor = navigationBarDisabledTintColor;
      primaryTintColor = navigationBarPrimaryColor;
    }

    let titleView = null;

    // This if ensures Flow correctly refines the type of
    // title in the body of the if to `'string' | TitleWithIcon
    if (
      typeof title === 'string' ||
      (typeof title === 'object' && title.icon)
    ) {
      titleView = (
        <TitleView title={title} tintColor={tintColor} style={styles.title} />
      );
    }

    // This if ensures Flow correctly refines the type of
    // title in the body of the if to `Element`.
    // While this if is mutually exclusive to the above it
    // cannot be an else if as Flow seems unable to handle this.
    if (typeof title === 'object' && title.type && isValidElement(title)) {
      titleView = React.cloneElement(title, {
        style: [
          title.props.style ? title.props.style : null,
          { maxHeight: 28 }, // eslint-disable-line backpack/use-tokens
        ],
      });
    }

    if (hasSubtitleView) {
      outerBarStyle.push(styles.barOuterWithSubtitle);
    }

    if (!leadingButton && trailingButton) {
      innerBarStyle.push(styles.barOnlyTrailingButton);
    }

    if (style) {
      outerBarStyle.push(style);
    }

    return (
      <View style={outerBarStyle}>
        <View style={innerBarStyle}>
          {leadingButton &&
            React.cloneElement(leadingButton, {
              disabledTintColor,
              tintColor,
              primaryTintColor,
              leading: true,
            })}
          <View style={styles.titleContainer}>{titleView}</View>
          {trailingButton &&
            React.cloneElement(trailingButton, {
              disabledTintColor,
              tintColor,
              primaryTintColor,
              leading: false,
            })}
        </View>
        {hasSubtitleView && (
          <View style={styles.subtitleViewContainer}>{subtitleView}</View>
        )}
      </View>
    );
  }
}

export default (withTheme(BpkNavigationBar): typeof BpkNavigationBar);
