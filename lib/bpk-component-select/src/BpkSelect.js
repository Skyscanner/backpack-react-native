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

import React, { cloneElement, type Element } from 'react';
import { Platform, View, ViewPropTypes, Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  colorSkyGrayTint06,
  colorBlackTint05,
  colorPanjin,
  borderSizeSm,
  spacingBase,
  spacingMd,
  spacingSm,
  lineDarkColor,
  backgroundSecondaryColor,
  primaryColor,
} from 'bpk-tokens/tokens/base.react.native';

import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkTouchableOverlay from '../../bpk-component-touchable-overlay';
import BpkTouchableNativeFeedback from '../../bpk-component-touchable-native-feedback';
import BpkText from '../../bpk-component-text';

import { ValidIcon, InvalidIcon, SelectIcon } from './BpkSelectIcons';

const dynamicStyles = BpkDynamicStyleSheet.create({
  select: {
    flexDirection: 'row',
    borderColor: { light: colorSkyGrayTint06, dark: lineDarkColor },
    borderBottomWidth: borderSizeSm,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacingSm,
  },
  invalid: {
    borderColor: colorPanjin,
  },
  focused: {
    borderColor: primaryColor,
  },
  selectContent: {
    marginEnd: 'auto',
  },
  selectContentDisabled: {
    color: { light: colorSkyGrayTint06, dark: colorBlackTint05 },
  },
  selectImage: {
    width: spacingBase,
    height: spacingSm + spacingMd,
    backgroundColor: backgroundSecondaryColor,
    marginEnd: spacingMd,
  },
  validationMessage: {
    color: colorPanjin,
    paddingTop: spacingSm,
  },
});

const TouchablePlatformComponent = Platform.select({
  ios: BpkTouchableOverlay,
  android: BpkTouchableNativeFeedback,
});

export type Props = {
  disabled: boolean,
  focused: boolean,
  onPress: () => mixed,
  label: ?(string | Element<any>),
  style: ?any,
  valid: ?boolean,
  validationMessage: ?string,
  // Image
  image: ?Element<typeof Image>,
  showImage: boolean,
};

const BpkSelect = (props: Props) => {
  const {
    disabled,
    focused,
    label,
    onPress,
    style,
    valid,
    validationMessage,
    image,
    showImage,
    ...rest
  } = props;

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  let content = null;
  const selectStyle = [styles.select];
  const selectDisabledStyle = [styles.selectContentDisabled];
  const selectImageStyle = [styles.selectImage];

  if (label && typeof label === 'string') {
    content = (
      <BpkText style={[styles.selectContent, disabled && selectDisabledStyle]}>
        {label}
      </BpkText>
    );
  }

  const platformProps = {};

  if (Platform.OS === 'android') {
    platformProps.borderlessBackground = false;
  }

  const accessibilityStates = [];
  if (disabled) {
    accessibilityStates.push('disabled');
  }
  const styledImage = image ? (
    cloneElement(image, {
      style: [image.props.style, selectImageStyle],
    })
  ) : (
    <View style={selectImageStyle} />
  );

  const validityIcon = valid ? (
    <ValidIcon />
  ) : (
    valid === false && <InvalidIcon />
  );

  let extraInfo = null;
  if (valid === false && validationMessage) {
    extraInfo = (
      <BpkText textStyle="xs" style={styles.validationMessage}>
        {validationMessage}
      </BpkText>
    );
  }

  if (valid === false) {
    selectStyle.push(styles.invalid);
  }

  if (focused && !disabled) {
    selectStyle.push(styles.focused);
  }

  const selectComponent = (
    <TouchablePlatformComponent
      disabled={disabled}
      style={style}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityStates={accessibilityStates}
      {...platformProps}
    >
      <View style={selectStyle} {...rest}>
        {showImage && styledImage}
        {content || label}
        {validityIcon}
        <SelectIcon disabled={disabled} />
      </View>
    </TouchablePlatformComponent>
  );

  if (extraInfo) {
    return (
      <View>
        {selectComponent}
        {extraInfo}
      </View>
    );
  }
  return selectComponent;
};

BpkSelect.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: ViewPropTypes.style,
  valid: PropTypes.oneOf([true, false, null]),
  validationMessage: PropTypes.string,

  // Image
  image: PropTypes.element,
  showImage: PropTypes.bool,
};

BpkSelect.defaultProps = {
  disabled: false,
  focused: false,
  label: null,
  style: null,
  valid: null,
  validationMessage: null,

  // Image
  image: null,
  showImage: false,
};

export default BpkSelect;
