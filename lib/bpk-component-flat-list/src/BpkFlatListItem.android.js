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
import { spacingBase, primaryColor } from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  withBpkAppearance,
  unpackBpkDynamicValue,
  type WithBpkAppearanceInjectedProps,
} from '../../bpk-appearance';
import BpkText from '../../bpk-component-text';
import BpkTouchableNativeFeedback from '../../bpk-component-touchable-native-feedback';
import { getThemeAttributes, withTheme } from '../../bpk-theming';

import { REQUIRED_THEME_ATTRIBUTES } from './theming';
import BpkRadioIcon from './BpkRadioIcon.android';
import {
  type FlatListItemProps,
  LIST_ITEM_PROP_TYPES,
  LIST_ITEM_DEFAULT_PROPS,
} from './common-types';

const ANDROID_LIST_ITEM_HEIGHT = 48;
const ANDROID_LIST_ITEM_IMAGE_MARGIN = 32;
const tintColor = primaryColor;

const dynamicStyles = BpkDynamicStyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'row',
    padding: spacingBase,
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ANDROID_LIST_ITEM_HEIGHT,
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
    color: tintColor,
  },
  image: {
    marginRight: ANDROID_LIST_ITEM_IMAGE_MARGIN,
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
      theme,
      titleProps,
      bpkAppearance,
      ...rest
    } = this.props;

    let tintColorFinal = unpackBpkDynamicValue(tintColor, bpkAppearance);
    const styles = unpackBpkDynamicValue(dynamicStyles, bpkAppearance);
    const textStyles = [styles.text];
    const themeAttributes = getThemeAttributes(
      REQUIRED_THEME_ATTRIBUTES,
      theme,
    );
    if (selected) {
      textStyles.push(styles.textSelected);
      if (themeAttributes) {
        textStyles.push({
          color: themeAttributes.flatListSelectedItemColor,
        });
        tintColorFinal = themeAttributes.flatListSelectedItemColor;
      }
    }

    const styledImage = image
      ? React.cloneElement(image, {
          style: [image.props.style, styles.image],
        })
      : null;

    return (
      <BpkTouchableNativeFeedback
        borderlessBackground={false}
        accessibilityLabel={title}
        accessibilityRole="button"
        {...rest}
      >
        <View style={styles.outer}>
          <View style={styles.content}>
            {styledImage}
            <BpkText textStyle="base" style={textStyles} {...titleProps}>
              {title}
            </BpkText>
          </View>
          <BpkRadioIcon selected={selected} tintColor={tintColorFinal} />
        </View>
      </BpkTouchableNativeFeedback>
    );
  }
}

BpkFlatListItem.defaultProps = LIST_ITEM_DEFAULT_PROPS;

const WithTheme = withTheme(BpkFlatListItem);
type FlatListConfig = Config<FlatListItemProps, typeof LIST_ITEM_DEFAULT_PROPS>;
export default withBpkAppearance<FlatListConfig>(WithTheme);
