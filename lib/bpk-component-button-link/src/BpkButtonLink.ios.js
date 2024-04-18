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
import { View, TouchableOpacity } from 'react-native';

import { getThemeAttributes, withTheme } from '../../bpk-theming';
import BpkIcon from '../../bpk-component-icon';
import BpkText, { WEIGHT_STYLES } from '../../bpk-component-text';
import { useBpkDynamicValue } from '../../bpk-appearance';

import {
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
  ICON_ALIGNMENTS,
  REQUIRED_THEME_ATTRIBUTES,
} from './common-types';
import useStyles from './styles';

export type Props = {
  ...$Exact<CommonProps>,
  large: boolean,
};

const BpkButtonLink = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconAlignment,
    large,
    onPress,
    title,
    theme,
    textProps,
    ...rest
  } = props;

  const themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);
  const themeStyle = themeAttributes
    ? { color: themeAttributes.buttonLinkTextColor }
    : null;

  const styles = useStyles();
  const viewStyle = [styles.view];
  const textStyle = [styles.text];
  const iconStyle = [styles.icon];

  const accessibilityStates = [];

  if (large) {
    viewStyle.push(styles.viewLarge);
  }

  if (iconAlignment === ICON_ALIGNMENTS.leading) {
    viewStyle.push(styles.viewLeading);
    iconStyle.push(styles.iconLeading);
  }

  if (themeStyle) {
    textStyle.push(themeStyle);
    iconStyle.push(themeStyle);
  }

  if (disabled) {
    textStyle.push(styles.textDisabled);
    accessibilityStates.push('disabled');
  }

  const activeOpacity = useBpkDynamicValue({ light: 0.2, dark: 0.6 });

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityStates={accessibilityStates}
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <View style={viewStyle}>
        <BpkText
          textStyle={large ? 'lg' : 'sm'}
          weight={WEIGHT_STYLES.emphasized}
          numberOfLines={1}
          style={textStyle}
          {...textProps}
        >
          {title}
        </BpkText>
        {typeof icon === 'string' ? (
          <BpkIcon icon={icon} style={iconStyle} small={!large} />
        ) : (
          icon
        )}
      </View>
    </TouchableOpacity>
  );
};

BpkButtonLink.propTypes = {
  ...commonPropTypes,
  large: PropTypes.bool,
};

BpkButtonLink.defaultProps = {
  ...commonDefaultProps,
  large: false,
};

export default (withTheme(BpkButtonLink): typeof BpkButtonLink);
