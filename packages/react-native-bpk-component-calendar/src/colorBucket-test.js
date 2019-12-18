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

import { processColor } from 'react-native';
import { colorSagano } from 'bpk-tokens/tokens/base.react.native';

import DateMatchers from './DateMatchers';
import colorBucket from './colorBucket';

const dateOne = Date.UTC(2019, 11, 16);

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
});
