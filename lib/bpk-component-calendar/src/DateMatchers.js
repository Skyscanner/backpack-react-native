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

/**
 * @module DateMatchers
 */

import parseDateToNative from './parseDateToNative';

type DateType = Date | number;

export type DateMatcherType = 'range' | 'after' | 'before' | 'any';
export type DateMatcher = {
  type: DateMatcherType,
  dates: Array<?number>,
};

const createMacher = (type: DateMatcherType) => (
  ...dates: Array<?DateType>
): DateMatcher => ({
  type,
  dates: dates.map(parseDateToNative),
});

const range = createMacher('range');
const after = createMacher('after');
const before = createMacher('before');
const any = createMacher('any');

export default {
  /**
   * Creates a range matcher to be used in `BpkCalendar`.
   *
   * A range matcher will match any date in between start and end date, inclusive.
   *
   * @example
   * <BpkCalendar
   *  disabledDates={DateMatchers.range(start, end)}
   * />
   *
   * @param {Date|Number} firstDate the range start
   * @param {Date|Number} endDate the range end
   *
   * @returns {DateMatcher} a range date matcher.
   */
  range,

  /**
   * Creates an after matcher to be used in `BpkCalendar`.
   *
   * An after matcher will match all dates after the provided date.
   *
   * @example
   * <BpkCalendar
   *  disabledDates={DateMatchers.after(date)}
   * />
   *
   * @param {Date|Number} date the date to match.
   *
   * @returns {DateMatcher} an after date matcher.
   */
  after,

  /**
   * Creates a before matcher to be used in `BpkCalendar`.
   *
   * A before matcher will match all dates before the provided date.
   *
   * @example
   * <BpkCalendar
   *  disabledDates={DateMatchers.before(date)}
   * />
   *
   * @param {Date|Number} date the date to match.
   *
   * @returns {DateMatcher} an before date matcher.
   */
  before,

  /**
   * Creates an any matcher to be used in `BpkCalendar`.
   *
   * An any matcher will match if the date is equal to any of the dates provided.
   *
   * @example
   * <BpkCalendar
   *  disabledDates={DateMatchers.any(...listOfDates)}
   * />
   *
   * @param {...Date|Number} dates the list of dates to match.
   *
   * @returns {DateMatcher} an any date matcher.
   */
  any,
};
