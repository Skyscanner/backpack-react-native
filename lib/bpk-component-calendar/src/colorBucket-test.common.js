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

import { processColor, Platform } from 'react-native';
import {
  colorSagano,
  colorHillier,
  colorErfoud,
  colorGlencoe,
} from 'bpk-tokens/tokens/base.react.native';

import DateMatchers from './DateMatchers';
import colorBucket, {
  colorBucketNegative,
  colorBucketNeutral,
  colorBucketPositive,
  colorBucketHighlight,
} from './colorBucket';

const dateOne = Date.UTC(2019, 11, 16);

const commonTest = () => {
  describe('BpkCalendar - colorBucket', () => {
    it('creates a color bucket', () => {
      const days = DateMatchers.after(dateOne);
      expect(colorBucket(colorSagano, days)).toEqual({
        color: processColor(colorSagano),
        days,
      });
    });

    it('creates a color bucket with text style', () => {
      const days = DateMatchers.after(dateOne);
      expect(colorBucket(colorSagano, days, 'dark')).toEqual({
        color: processColor(colorSagano),
        days,
        textStyle: 'dark',
      });
    });

    it.each([
      ['negative', colorBucketNegative, colorHillier],
      ['neutral', colorBucketNeutral, colorErfoud],
      ['positive', colorBucketPositive, colorGlencoe],
    ])('creates a %s color bucket', (cellStyle, createBucket, color) => {
      const days = DateMatchers.after(dateOne);
      expect(createBucket(days)).toEqual({
        color: processColor(color),
        days,
        textStyle: 'light',
        __cellStyle: cellStyle,
      });
    });

    it('creates a highlight color bucket', () => {
      const days = DateMatchers.after(dateOne);
      expect(colorBucketHighlight(days)).toEqual({
        color: processColor('transparent'),
        days,
        textStyle: undefined,
        ...(Platform.OS === 'android' ? { __cellStyle: 'highlight' } : {}),
      });
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTest;
