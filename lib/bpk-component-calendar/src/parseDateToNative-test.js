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

import { Platform } from 'react-native';

import parseDateToNative from './parseDateToNative';

const dateObject = new Date(Date.UTC(2019, 11, 16));
const dateTimestamp = Date.UTC(2019, 11, 16);
const timestamp = 1576454400000;
const androidTimestamp = 1576454400;

describe('BpkCalendar - parseDateToNative', () => {
  it('parses date objects', () => {
    expect(parseDateToNative(dateObject)).toBe(timestamp);
  });

  it('parses date timestamp', () => {
    expect(parseDateToNative(dateTimestamp)).toBe(timestamp);
  });

  it('returns null when a null date is provided', () => {
    expect(parseDateToNative(null)).toBe(null);
  });

  describe('Android', () => {
    beforeAll(() => {
      Platform.OS = 'android';
    });

    it('parses date objects', () => {
      expect(parseDateToNative(dateObject)).toBe(androidTimestamp);
    });

    it('parses date timestamp', () => {
      expect(parseDateToNative(dateTimestamp)).toBe(androidTimestamp);
    });
  });
});
