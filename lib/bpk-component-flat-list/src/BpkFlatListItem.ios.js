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

import { View } from 'react-native';
import React, { type Config } from 'react';
import {
  spacingMd,
  spacingBase,
  spacingLg,
  primaryColor,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  withBpkAppearance,
  unpackBpkDynamicValue,
  type WithBpkAppearanceInjectedProps,
} from '../../bpk-appearance';
import BpkText from '../../bpk-component-text';
import BpkTouchableOverlay from '../../bpk-component-touchable-overlay';
import BpkIcon, { icons } from '../../bpk-component-icon';
import { getThemeAttributes, withTheme } from '../../bpk-theming';

import { REQUIRED_THEME_ATTRIBUTES } from './theming';
import {
  type FlatListItemProps,
  LIST_ITEM_PROP_TYPES,
  LIST_ITEM_DEFAULT_PROPS,
} from './common-types';

const IOS_CELL_HEIGHT = 44;

const dynamicStyles = BpkDynamicStyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacingBase,
    paddingVertical: spacingMd,
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: IOS_CELL_HEIGHT,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  textSelected: {
    color: primaryColor,
  },
  image: {
    marginRight: spacingLg,
  },
  tick: {
    color: primaryColor,
    opacity: 0,
  },
  tickVisible: {
    opacity: 1,
  },
});

class BpkFlatListItem extends React.PureComponent<
  FlatListItemProps & WithBpkAppearanceInjectedProps,
> {
  static propTypes = LIST_ITEM_PROP_TYPES;

  static defaultProps = LIST_ITEM_DEFAULT_PROPS;

  render() {
    const {
      image,
      title,
      selected,
      style,
      theme,
      titleProps,
      bpkAppearance,
      ...rest
    } = this.props;

    const styles = unpackBpkDynamicValue(dynamicStyles, bpkAppearance);
    const iconStyles = [styles.tick];
    const textStyles = [styles.text];

    if (selected) {
      iconStyles.push(styles.tickVisible);
      textStyles.push(styles.textSelected);

      const themeAttributes = getThemeAttributes(
        REQUIRED_THEME_ATTRIBUTES,
        theme,
      );
      if (themeAttributes) {
        iconStyles.push({
          color: themeAttributes.flatListSelectedItemColor,
        });
        textStyles.push({
          color: themeAttributes.flatListSelectedItemColor,
        });
      }
    }

    const styledImage = image
      ? React.cloneElement(image, {
          style: [image.props.style, styles.image],
        })
      : null;

    return (
      <BpkTouchableOverlay
        accessibilityRole="button"
        accessibilityLabel={title}
        style={[styles.outer, style]}
        {...rest}
      >
        <View style={styles.content}>
          {styledImage}
          <BpkText textStyle="base" style={textStyles} {...titleProps}>
            {title}
          </BpkText>
        </View>
        <BpkIcon small icon={icons.tick} style={iconStyles} />
      </BpkTouchableOverlay>
    );
  }
}

BpkFlatListItem.defaultProps = LIST_ITEM_DEFAULT_PROPS;

const WithTheme = withTheme(BpkFlatListItem);
type FlatListConfig = Config<FlatListItemProps, typeof LIST_ITEM_DEFAULT_PROPS>;
export default withBpkAppearance<FlatListConfig>(WithTheme);
