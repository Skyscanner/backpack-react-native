/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.  You may obtain a copy of the License at
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
import has from 'lodash/has';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';
import {
  colorSkyGrayTint07,
  colorSkyGrayTint06,
  colorSkyGrayTint04,
  colorSkyGrayTint02,
  colorSkyGrayTint01,
  colorSkyGray,
} from 'bpk-tokens/tokens/base.react.native';

const grays = {
  colorSkyGrayTint07,
  colorSkyGrayTint06,
  colorSkyGrayTint04,
  colorSkyGrayTint02,
  colorSkyGrayTint01,
  colorSkyGray,
};

const getNumberOfRequiredAttributesSupplied = (
  requiredAttributes: Array<string>,
  theme: Object,
): number =>
  requiredAttributes.reduce((accumulator, attribute) => {
    if (
      has(theme, attribute) &&
      (isBoolean(theme[attribute]) ||
        isNumber(theme[attribute]) ||
        !isEmpty(theme[attribute]))
    ) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

export const isValidTheme = (
  requiredAttributes: Array<string>,
  theme: Object,
): boolean => {
  const numberOfRequiredAttributesSupplied = getNumberOfRequiredAttributesSupplied(
    requiredAttributes,
    theme,
  );
  if (numberOfRequiredAttributesSupplied === 0) {
    return true;
  }
  if (numberOfRequiredAttributesSupplied === requiredAttributes.length) {
    return true;
  }
  return false;
};

const filterOutOptionalProps = (
  requiredAttributes: Array<string>,
  theme: Object,
  optionalAttributes?: Array<string>,
) => {
  if (!optionalAttributes || optionalAttributes.length === 0) {
    return theme;
  }

  const filteredOut = Object.keys(theme).reduce((requiredTheme, key) => {
    if (optionalAttributes && optionalAttributes.indexOf(key) >= 0) {
      return requiredTheme;
    }
    return { ...requiredTheme, [key]: theme[key] };
  }, {});

  if (Object.keys(filteredOut).length === 0) {
    return null;
  }

  return filteredOut;
};

export const makeThemePropType = (
  requiredAttributes: Array<string>,
  optionalAttributes?: Array<string>,
) => (
  props: Object,
  propName: string,
  componentName: string,
): Error | boolean => {
  const { theme } = props;

  if (!theme) {
    return false;
  }

  const requiredTheme = filterOutOptionalProps(
    requiredAttributes,
    theme,
    optionalAttributes,
  );

  if (!requiredTheme) {
    return false;
  }

  const validTheme = isValidTheme(requiredAttributes, requiredTheme);

  if (!validTheme) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. When supplying \`theme\` all the required theming attributes(\`${requiredAttributes.join(
        ', ',
      )}\`) must be supplied.`,
    );
  }
  return false;
};

export const getThemeAttributes = (
  requiredAttributes: Array<string>,
  theme: ?Object,
  optionalAttributes?: Array<string>,
): ?Object => {
  if (!theme) {
    return null;
  }

  // We don't use `isValidTheme` here because we don't want to match themes that have zero required theme attributes.
  const hasAllRequiredAttributes =
    getNumberOfRequiredAttributesSupplied(requiredAttributes, theme) ===
    requiredAttributes.length;
  const hasOptionalAttributes =
    optionalAttributes && optionalAttributes.length > 0;

  if (!hasAllRequiredAttributes && !hasOptionalAttributes) {
    return null;
  }

  const filteredRequiredAttributes = hasAllRequiredAttributes
    ? requiredAttributes.reduce((result, attribute) => {
        if (theme) {
          result[attribute] = theme[attribute]; // eslint-disable-line no-param-reassign
        }
        return result;
      }, {})
    : {};

  const filteredOptionalAttributes = optionalAttributes
    ? optionalAttributes.reduce((result, attribute) => {
        if (theme) {
          result[attribute] = theme[attribute]; // eslint-disable-line no-param-reassign
        }
        return result;
      }, {})
    : {};

  const allThemeAttributes = {
    ...filteredRequiredAttributes,
    ...filteredOptionalAttributes,
  };

  if (Object.keys(allThemeAttributes).length === 0) {
    return null;
  }

  return allThemeAttributes;
};

export const grayForTheme = (theme: ?Object, colorName: string) => {
  // eslint-disable-next-line no-console
  console.warn(
    'This theming utility has been deprecated and marked for removal. Please update usages of this method to use the Backpack gray palette',
  );

  if (grays[colorName]) {
    return grays[colorName];
  }

  return colorSkyGrayTint02;
};
