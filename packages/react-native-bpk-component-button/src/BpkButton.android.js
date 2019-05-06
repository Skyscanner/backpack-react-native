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
import {
  getThemeAttributes,
  withTheme,
  type Theme,
} from 'react-native-bpk-theming';

import BpkStandardButton from './BpkStandardButton.android';
import BpkBorderedButton from './BpkBorderedButton.android';
import BpkButtonInner from './BpkButtonInner';
import {
  type ButtonType,
  type CommonProps,
  commonPropTypes,
  commonDefaultProps,
  BUTTON_TYPES,
  ICON_ALIGNMENTS,
  REQUIRED_THEME_ATTRIBUTES,
  OPTIONAL_THEME_ATTRIBUTES,
} from './common-types';
import {
  backgroundColorForType,
  borderColorForType,
  borderRadiusForType,
  textColorForType,
} from './theming-functions';

export type Props = CommonProps;

const buttonComponentForType = (type: ButtonType) => {
  if (type === BUTTON_TYPES.primary || type === BUTTON_TYPES.featured) {
    return BpkStandardButton;
  }
  return BpkBorderedButton;
};

const buttonColorsForType = (
  type: ButtonType,
  themeAttributes: ?Theme,
  disabled: boolean,
) => {
  const buttonColors: { backgroundColor: string, borderColor?: string } = {
    backgroundColor: backgroundColorForType(type, themeAttributes, disabled),
  };

  if (type === 'secondary' || type === 'destructive') {
    buttonColors.borderColor = borderColorForType(
      type,
      themeAttributes,
      disabled,
    );
  }

  return buttonColors;
};

const BpkButton = (props: Props) => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconAlignment,
    iconOnly,
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

  const themeAttributes = {
    ...getThemeAttributes(REQUIRED_THEME_ATTRIBUTES[type], theme),
    ...getThemeAttributes(OPTIONAL_THEME_ATTRIBUTES[type], theme),
  };

  const ButtonComponent = buttonComponentForType(type);
  const buttonColors = buttonColorsForType(type, themeAttributes, disabled);
  const textColor = textColorForType(type, themeAttributes, disabled);

  const accessibilityTraits = ['button'];
  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  return (
    <ButtonComponent
      disabled={disabled}
      title={title}
      icon={icon}
      iconOnly={iconOnly}
      iconTrailing={iconAlignment === ICON_ALIGNMENTS.trailing}
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityTraits={accessibilityTraits}
      borderRadius={borderRadiusForType(type, themeAttributes)}
      {...buttonColors}
      {...rest}
    >
      <BpkButtonInner
        large={false}
        icon={icon}
        iconOnly={iconOnly}
        iconTrailing={iconAlignment === ICON_ALIGNMENTS.trailing}
        textColor={textColor}
        title={title}
      />
    </ButtonComponent>
  );
};

BpkButton.propTypes = commonPropTypes;
BpkButton.defaultProps = commonDefaultProps;

export default (withTheme(BpkButton): typeof BpkButton);
