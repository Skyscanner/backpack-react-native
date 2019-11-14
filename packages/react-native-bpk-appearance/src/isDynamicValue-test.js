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

import isDynamicValue from './isDynamicValue';

describe('BpkAppearance - isDynamicValue', () => {
  it('returns true for an object with light and dark props', () => {
    expect(isDynamicValue({ light: 'a', dark: 'a' })).toBe(true);
  });

  it('returns false for an object without light or dark props', () => {
    expect(isDynamicValue({ light: 'a' })).toBe(false);
    expect(isDynamicValue({ dark: 'a' })).toBe(false);
    expect(isDynamicValue({ aaa: 'a' })).toBe(false);
  });

  it('returns false for all other types', () => {
    expect(isDynamicValue(undefined)).toBe(false);
    expect(isDynamicValue(null)).toBe(false);
    expect(isDynamicValue('')).toBe(false);
    expect(isDynamicValue('str')).toBe(false);
    expect(isDynamicValue(0)).toBe(false);
    expect(isDynamicValue(1)).toBe(false);
    expect(isDynamicValue(0.1)).toBe(false);
    expect(isDynamicValue(true)).toBe(false);
    expect(isDynamicValue({})).toBe(false);
    expect(isDynamicValue(() => {})).toBe(false);
  });
});
