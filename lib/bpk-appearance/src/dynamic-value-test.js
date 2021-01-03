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
/* eslint-disable backpack/use-tokens */

import {
  isBpkDynamicValue,
  unpackBpkDynamicValue,
  unpackBpkDynamicStyle,
} from './dynamic-value';

describe('BpkAppearance - dynamic-value', () => {
  describe('isBpkDynamicValue', () => {
    it('returns true for an object with light and dark props', () => {
      expect(isBpkDynamicValue({ light: 'a', dark: 'a' })).toBe(true);
      expect(isBpkDynamicValue({ light: false, dark: 0 })).toBe(true);
    });

    it('returns false for an object without light or dark props', () => {
      expect(isBpkDynamicValue({ light: 'a' })).toBe(false);
      expect(isBpkDynamicValue({ dark: 'a' })).toBe(false);
      expect(isBpkDynamicValue({ aaa: 'a' })).toBe(false);
    });

    it('returns false for all other types', () => {
      expect(isBpkDynamicValue(undefined)).toBe(false);
      expect(isBpkDynamicValue(null)).toBe(false);
      expect(isBpkDynamicValue('')).toBe(false);
      expect(isBpkDynamicValue('str')).toBe(false);
      expect(isBpkDynamicValue(0)).toBe(false);
      expect(isBpkDynamicValue(1)).toBe(false);
      expect(isBpkDynamicValue(0.1)).toBe(false);
      expect(isBpkDynamicValue(true)).toBe(false);
      expect(isBpkDynamicValue({})).toBe(false);
      expect(isBpkDynamicValue(() => {})).toBe(false);
    });
  });

  describe('unpackBpkDynamicValue', () => {
    it('returns the correct value when current color scheme is light', () => {
      expect(
        unpackBpkDynamicValue(
          { light: 'l', dark: 'd' },
          { colorScheme: 'light' },
        ),
      ).toEqual('l');
    });

    it('returns the correct value when current color scheme is dark', () => {
      expect(
        unpackBpkDynamicValue(
          { light: 'l', dark: 'd' },
          { colorScheme: 'dark' },
        ),
      ).toEqual('d');
    });

    it('returns the provided argument when it is not a valid dynamic color', () => {
      expect(
        unpackBpkDynamicValue({ light: 'l' }, { colorScheme: 'dark' }),
      ).toEqual({ light: 'l' });

      expect(unpackBpkDynamicValue(1, { colorScheme: 'light' })).toEqual(1);
    });
  });

  describe('unpackBpkDynamicStyle', () => {
    it('returns the correct value when current color scheme is light', () => {
      expect(
        unpackBpkDynamicStyle(
          {
            color: { light: 'l', dark: 'd' },
            flex: 1,
          },
          { colorScheme: 'light' },
        ),
      ).toEqual({ color: 'l', flex: 1 });
    });

    it('returns the correct value when current color scheme is dark', () => {
      expect(
        unpackBpkDynamicStyle(
          {
            color: { light: 'l', dark: 'd' },
            flex: 1,
          },
          { colorScheme: 'dark' },
        ),
      ).toEqual({ color: 'd', flex: 1 });
    });
  });
});
