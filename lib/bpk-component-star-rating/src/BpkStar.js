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
import { I18nManager, View } from 'react-native';
import {
  spacingMd,
  spacingSm,
  colorErfoud,
  colorSkyGrayTint06,
  colorBlackTint04,
} from 'bpk-tokens/tokens/base.react.native';

import { getThemeAttributes, withTheme, type Theme } from '../../bpk-theming';
import {
  BpkDynamicStyleSheet,
  useBpkDynamicStyleSheet,
} from '../../bpk-appearance';
import BpkIcon, { icons } from '../../bpk-component-icon';

import { REQUIRED_THEME_ATTRIBUTES, themePropType } from './theming';
import { STAR_TYPES } from './star-types';

const STAR_SIZE = spacingMd + spacingSm;
const dynamicStyles = BpkDynamicStyleSheet.create({
  container: {
    width: STAR_SIZE,
    height: STAR_SIZE,
  },
  star: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    fontSize: STAR_SIZE,
    lineHeight: STAR_SIZE,
    color: { light: colorSkyGrayTint06, dark: colorBlackTint04 },
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  foregroundStar: {
    zIndex: 2,
  },
  filled: {
    color: colorErfoud,
  },
  rightToLeftHalfStar: {
    transform: [{ scaleX: -1 }],
  },
});

export type Props = {
  type: $Keys<typeof STAR_TYPES>,
  theme: ?Theme,
};

const BpkStar = (props: Props) => {
  const { type, theme, ...rest } = props;

  let iconType = icons['star-outline'];
  if (type === STAR_TYPES.FULL) {
    iconType = icons.star;
  } else if (type === STAR_TYPES.HALF) {
    iconType = icons['star-half'];
  }

  const styles = useBpkDynamicStyleSheet(dynamicStyles);
  const commonStarStyles = [styles.star];

  const foregroundStarStyles = [
    ...commonStarStyles,
    styles.foregroundStar,
    styles.filled,
  ];

  const themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);
  if (themeAttributes) {
    commonStarStyles.push({
      color: themeAttributes.starColor,
    });
    foregroundStarStyles.push({
      color: themeAttributes.starFilledColor,
    });
  }

  if (I18nManager.isRTL && type === STAR_TYPES.HALF) {
    foregroundStarStyles.push(styles.rightToLeftHalfStar);
  }

  /*
   * Here we render two stars that are absolutely positioned inside a View.
   * We always render a gray star (background) and then conditionally render
   * a yellow half star or star ontop of it.
   */
  return (
    <View style={styles.container} {...rest} accessible={false}>
      <BpkIcon icon={icons['star-outline']} style={commonStarStyles} />
      {type !== STAR_TYPES.EMPTY && (
        <BpkIcon icon={iconType} style={foregroundStarStyles} />
      )}
    </View>
  );
};

BpkStar.propTypes = {
  type: PropTypes.oneOf(Object.keys(STAR_TYPES)).isRequired,
  theme: themePropType,
};

BpkStar.defaultProps = {
  theme: null,
};

export default (withTheme(BpkStar): typeof BpkStar);
