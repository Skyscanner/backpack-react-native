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

import parseDateToNative from './parseDateToNative';
import DateMatchers from './DateMatchers';

const dateOne = Date.UTC(2019, 11, 16);
const dateTwo = Date.UTC(2019, 11, 16);

describe('BpkCalendar - DateMatchers', () => {
  it('creates a range matcher', () => {
    expect(DateMatchers.range(dateOne, dateTwo)).toEqual({
      type: 'range',
      dates: [parseDateToNative(dateOne), parseDateToNative(dateTwo)],
    });
  });

  it('creates an after matcher', () => {
    expect(DateMatchers.after(dateOne)).toEqual({
      type: 'after',
      dates: [parseDateToNative(dateOne)],
    });
  });

  it('creates a before matcher', () => {
    expect(DateMatchers.before(dateOne)).toEqual({
      type: 'before',
      dates: [parseDateToNative(dateOne)],
    });
  });

  it('creates an any matcher', () => {
    expect(DateMatchers.any(dateOne, dateTwo)).toEqual({
      type: 'any',
      dates: [parseDateToNative(dateOne), parseDateToNative(dateTwo)],
    });
  });
});
