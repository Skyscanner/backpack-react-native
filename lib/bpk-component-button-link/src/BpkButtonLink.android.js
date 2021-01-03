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
import { View, ViewPropTypes, StyleSheet } from 'react-native';

import BpkIcon from '../../bpk-component-icon';
import BpkText, { WEIGHT_STYLES } from '../../bpk-component-text';
import { getThemeAttributes, withTheme } from '../../bpk-theming';
import BpkTouchableNativeFeedback from '../../bpk-component-touchable-native-feedback';

import {
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
  ICON_ALIGNMENTS,
  REQUIRED_THEME_ATTRIBUTES,
} from './common-types';
import useStyles from './styles';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 0, // this is required to prevent BpkTouchableNativeFeedback to go out bounds
    overflow: 'hidden',
  },
});

export type Props = {
  ...$Exact<CommonProps>,
  borderlessBackground: boolean,
  uppercase: boolean,
  style: ?any,
};

const BpkButtonLink = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconAlignment,
    onPress,
    style: userStyle,
    title,
    borderlessBackground,
    uppercase,
    theme,
    textProps,
    ...rest
  } = props;

  const themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);
  const themeStyle = themeAttributes
    ? { color: themeAttributes.buttonLinkTextColor }
    : null;

  const commonStyles = useStyles();
  const textStyle = [commonStyles.text];
  const viewStyle = [commonStyles.view];
  const iconStyle = [commonStyles.icon];

  if (iconAlignment === ICON_ALIGNMENTS.leading) {
    viewStyle.push(commonStyles.viewLeading);
    iconStyle.push(commonStyles.iconLeading);
  }

  if (themeStyle) {
    textStyle.push(themeStyle);
    iconStyle.push(themeStyle);
  }

  const accessibilityStates = [];

  if (disabled) {
    textStyle.push(commonStyles.textDisabled);
    accessibilityStates.push('disabled');
  }

  return (
    <View style={[styles.wrapper, userStyle]}>
      <BpkTouchableNativeFeedback
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityStates={accessibilityStates}
        onPress={onPress}
        disabled={disabled}
        borderlessBackground={borderlessBackground}
        {...rest}
      >
        <View style={viewStyle}>
          <BpkText
            textStyle="sm"
            weight={WEIGHT_STYLES.emphasized}
            numberOfLines={1}
            style={textStyle}
            {...textProps}
          >
            {uppercase ? title.toUpperCase() : title}
          </BpkText>
          {typeof icon === 'string' ? (
            <BpkIcon icon={icon} style={iconStyle} small />
          ) : (
            icon
          )}
        </View>
      </BpkTouchableNativeFeedback>
    </View>
  );
};

BpkButtonLink.propTypes = {
  ...commonPropTypes,
  borderlessBackground: PropTypes.bool,
  uppercase: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkButtonLink.defaultProps = {
  ...commonDefaultProps,
  borderlessBackground: true,
  uppercase: true,
  style: null,
};

export default (withTheme(BpkButtonLink): typeof BpkButtonLink);
