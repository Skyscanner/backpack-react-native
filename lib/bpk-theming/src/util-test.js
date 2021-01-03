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
import { colorPanjin } from 'bpk-tokens/tokens/base.react.native';
import { omit } from 'lodash';

import { isValidTheme, makeThemePropType, getThemeAttributes } from './util';

const REQUIRED_ATTRIBUTES: Array<string> = [
  'themeAttributeA',
  'themeAttributeB',
  'themeAttributeC',
];

const OPTIONAL_ATTRIBUTES = ['fontFamily'];

const VALID_THEME = {
  themeAttributeA: 'red',
  themeAttributeB: 12,
  themeAttributeC: true,
  nonRequiredAttribute: 'green',
};
// When zero required attributes are passed in, the theme is still valid.
const VALID_EMPTY_THEME = {
  nonRequiredAttribute: 'green',
};
const INVALID_THEME = {
  themeAttributeA: 'red',
  themeAttributeC: true,
  nonRequiredAttribute: 'green',
};

describe('isValidTheme', () => {
  it('should validated themes that are valid', () => {
    expect(isValidTheme(REQUIRED_ATTRIBUTES, VALID_THEME)).toBeTruthy();
  });

  it('should validated themes when none of the required props are passed in', () => {
    expect(isValidTheme(REQUIRED_ATTRIBUTES, VALID_EMPTY_THEME)).toBeTruthy();
  });

  it('should fail to validate invalid themes', () => {
    expect(
      // themeAttributeB is required, but missing in theme
      isValidTheme(REQUIRED_ATTRIBUTES, INVALID_THEME),
    ).toBeFalsy();
  });
});

describe('makeThemePropType', () => {
  let propType;
  beforeEach(() => {
    propType = makeThemePropType(REQUIRED_ATTRIBUTES);
  });

  it('should not fail when the theme is valid', () => {
    expect(
      propType(
        { style: { color: colorPanjin }, theme: VALID_THEME },
        'theme',
        'TestComponent',
      ),
    ).toBeFalsy();
  });

  it('should not fail when no theme is given', () => {
    expect(
      propType({ style: { color: colorPanjin } }, 'theme', 'TestComponent'),
    ).toBeFalsy();
  });

  it('should fail when the theme is invalid', () => {
    expect(
      propType(
        { style: { color: colorPanjin }, theme: INVALID_THEME },
        'theme',
        'TestComponent',
      ),
    ).toEqual(
      new Error(
        'Invalid prop `theme` supplied to `TestComponent`. When supplying `theme` all the required theming attributes(`themeAttributeA, themeAttributeB, themeAttributeC`) must be supplied.',
      ),
    );
  });

  describe('when optional props are provided', () => {
    beforeEach(() => {
      propType = makeThemePropType(REQUIRED_ATTRIBUTES, OPTIONAL_ATTRIBUTES);
    });

    it('should not fail when the theme is valid', () => {
      expect(
        propType(
          { style: { color: colorPanjin }, theme: VALID_THEME },
          'theme',
          'TestComponent',
        ),
      ).toBeFalsy();
    });

    it('should not fail when only optional props are provided', () => {
      expect(
        propType(
          { style: { color: colorPanjin }, theme: { fontFamily: 'roboto' } },
          'theme',
          'TestComponent',
        ),
      ).toBeFalsy();
    });

    it('should not fail when random props are provided', () => {
      expect(
        propType(
          { style: { color: colorPanjin }, theme: { ramdom: '1' } },
          'theme',
          'TestComponent',
        ),
      ).toBeFalsy();
    });
  });
});

describe('getThemeAttributes', () => {
  it('should return only the theme values if the theme is valid', () => {
    const { themeAttributeA, themeAttributeB, themeAttributeC } = VALID_THEME;

    expect(getThemeAttributes(REQUIRED_ATTRIBUTES, VALID_THEME)).toEqual({
      themeAttributeA,
      themeAttributeB,
      themeAttributeC,
    });
  });

  it('should return `null` if the theme is invalid', () => {
    expect(getThemeAttributes(REQUIRED_ATTRIBUTES, INVALID_THEME)).toBeNull();
  });

  it('should return `null` if the theme is null', () => {
    expect(getThemeAttributes(REQUIRED_ATTRIBUTES, null)).toBeNull();
  });

  it('should return `null` if the theme attributes is empty', () => {
    expect(getThemeAttributes([], VALID_THEME)).toBeNull();
  });

  describe('when optional attributes are defined', () => {
    const VALID_THEME_WITH_OPTIONAL_PROPS = {
      ...VALID_THEME,
      fontFamily: 'roboto',
    };
    const INVALID_THEME_WITH_OPTIONAL_PROPS = {
      ...INVALID_THEME,
      fontFamily: 'roboto',
    };

    it('should return all props when theme is valid', () => {
      expect(
        getThemeAttributes(
          REQUIRED_ATTRIBUTES,
          VALID_THEME_WITH_OPTIONAL_PROPS,
          OPTIONAL_ATTRIBUTES,
        ),
      ).toEqual({
        ...omit(VALID_THEME, 'nonRequiredAttribute'),
        fontFamily: 'roboto',
      });
    });

    it('should return only optional props theme is invalid', () => {
      expect(
        getThemeAttributes(
          REQUIRED_ATTRIBUTES,
          INVALID_THEME_WITH_OPTIONAL_PROPS,
          OPTIONAL_ATTRIBUTES,
        ),
      ).toEqual({ fontFamily: 'roboto' });
    });

    it('should return `null` if the optional attributes are empty', () => {
      expect(getThemeAttributes([], VALID_THEME, [])).toBeNull();
    });
  });
});
