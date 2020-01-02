/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import { type DateMatcher } from './DateMatchers';

type TextStyle = 'light' | 'dark';

export type ColorBucket = {
  color: ?number,
  days: DateMatcher,
  textStyle: ?TextStyle,
};

/**
 * Creates a new color bucket to be used in BpkCalendar.
 *
 * A color bucket is used to define custom colours for calendar days.
 *
 * NOTE: Your are responsible for ensuring multiple color buckets don't
 * overlap, in case they do the last one applied (last in the list) will
 * take precedence.
 *
 * @example
 * <BpkCalendar
 *  colorBuckets={[
 *    colorBucket(colorPanjin, DateMatchers.range(startOfSummer, endOfSummer)),
 *    colorBucket(colorSagano, DateMatchers.after(endOfSummer))
 *  ]}
 * />
 *
 * @param {string} color - The background color
 * @param {DateMatcher} days - The days in this bucket
 * @param {TextStyle} [textStyle] - The text style. Valid values are `light` or `dark`.
 *    Changes how the text looks based on the background color, where light or dark refers
 *    to the background colour.
 *
 * @returns {ColorBucket} - A new color bucket
 */
const colorBucket = (
  color: string,
  days: DateMatcher,
  textStyle: ?TextStyle = undefined,
): ColorBucket => ({
  color: processColor(color),
  days,
  textStyle,
});

export default colorBucket;
