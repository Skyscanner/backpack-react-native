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

import React from 'react';
import PropTypes from 'prop-types';
import {
  getThemeAttributes,
  withTheme,
  type Theme,
} from 'react-native-bpk-theming';

import BpkGradientButton from './BpkGradientButton.ios';
import BpkBorderedButton from './BpkBorderedButton.ios';
import BpkButtonInner from './BpkButtonInner';
import {
  type ButtonType,
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
  BUTTON_TYPES,
  ICON_ALIGNMENTS,
  REQUIRED_THEME_ATTRIBUTES,
} from './common-types';
import {
  borderColorForType,
  borderRadiusForType,
  gradientColorForType,
  textColorForType,
  backgroundColorForType,
} from './theming-functions';

export type Props = {
  ...$Exact<CommonProps>,
  large: boolean,
};

const buttonComponentForType = (type: ButtonType) => {
  if (type === BUTTON_TYPES.primary || type === BUTTON_TYPES.featured) {
    return BpkGradientButton;
  }
  return BpkBorderedButton;
};

const buttonColorsForType = (
  type: ButtonType,
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  if (type === 'primary' || type === 'featured') {
    return {
      gradientStartColor: gradientColorForType(
        'start',
        type,
        themeAttributes,
        disabled,
      ),
      gradientEndColor: gradientColorForType(
        'end',
        type,
        themeAttributes,
        disabled,
      ),
    };
  }

  return {
    backgroundColor: backgroundColorForType(type, themeAttributes, disabled),
    borderColor: borderColorForType(type, themeAttributes, disabled),
  };
};

const BpkButton = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconAlignment,
    iconOnly,
    large,
    theme,
    title,
    type,
    ...rest
  } = props;

  if (!Object.keys(BUTTON_TYPES).includes(type)) {
    throw new Error(
      `"${type}" is not a valid button type. Valid types are ${Object.keys(
        BUTTON_TYPES,
      ).join(', ')}`,
    );
  }

  const themeAttributes = getThemeAttributes(
    REQUIRED_THEME_ATTRIBUTES[type],
    theme,
  );

  const accessibilityTraits = ['button'];
  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  const ButtonComponent = buttonComponentForType(type);

  return (
    <ButtonComponent
      disabled={disabled}
      title={title}
      icon={icon}
      iconOnly={iconOnly}
      large={large}
      iconTrailing={iconAlignment === ICON_ALIGNMENTS.trailing}
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityTraits={accessibilityTraits}
      borderRadius={borderRadiusForType(type, themeAttributes)}
      {...buttonColorsForType(type, themeAttributes, disabled)}
      {...rest}
    >
      <BpkButtonInner
        icon={icon}
        iconOnly={iconOnly}
        iconTrailing={iconAlignment === ICON_ALIGNMENTS.trailing}
        large={large}
        textColor={textColorForType(type, themeAttributes, disabled)}
        title={title}
      />
    </ButtonComponent>
  );
};

BpkButton.propTypes = {
  ...commonPropTypes,
  large: PropTypes.bool,
};

BpkButton.defaultProps = {
  ...commonDefaultProps,
  large: false,
};

export default (withTheme(BpkButton): typeof BpkButton);
