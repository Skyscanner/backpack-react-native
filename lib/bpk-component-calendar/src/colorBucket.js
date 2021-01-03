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
  colorErfoud,
  colorHillier,
  colorGlencoe,
} from 'bpk-tokens/tokens/base.react.native';

import { type DateMatcher } from './DateMatchers';

type TextStyle = 'light' | 'dark';
export type CellStyle = 'negative' | 'neutral' | 'positive' | 'highlight';

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

/**
 * Create a backwards compatible bucket that will work with the previous "open"
 * way of setting buckets in the native side, but also contains the information
 * to use the new approach if possible.
 *
 * This will ensure RN will always follow the native definition for these predefined
 * buckets in case they are available
 *
 * @param {ColorBucket} bucket the bucket
 * @param {CellStyle} cellStyle the cellStyle
 *
 * @returns {Object} a color bucket with the cell style information
 *
 * @ignore
 */
const bucketCompat = (bucket: ColorBucket, cellStyle: CellStyle) => ({
  ...bucket,
  __cellStyle: cellStyle,
});

/**
 * A negative cell style which is suitable to indicate for example
 * a date which has a comparatively high price among the dates in
 * the calendar.
 *
 * @param {DateMatcher} days - The days in this bucket
 * @returns {ColorBucket} the negative bucket
 */
export const colorBucketNegative = (days: DateMatcher) =>
  bucketCompat(colorBucket(colorHillier, days, 'light'), 'negative');

/**
 * A neutral cell style which is suitable to indicate for example
 * a date which has a comparatively average price among the dates in
 * the calendar.
 *
 * @param {DateMatcher} days - The days in this bucket
 * @returns {ColorBucket} the neutral bucket
 */
export const colorBucketNeutral = (days: DateMatcher) =>
  bucketCompat(colorBucket(colorErfoud, days, 'light'), 'neutral');

/**
 * A positive cell style which is suitable to indicate for example
 * a date which has a comparatively low price among the dates in
 * the calendar.
 *
 * @param {DateMatcher} days - The days in this bucket
 * @returns {ColorBucket} the positive bucket
 */
export const colorBucketPositive = (days: DateMatcher) =>
  bucketCompat(colorBucket(colorGlencoe, days, 'light'), 'positive');

/**
 * A cell style which is suitable to indicate a highlighted day, e.g. a holiday.
 * Use this in conjunction with `highlightedDaysFooterView` to
 * show a footer with the list of highlighted days for a month.
 *
 * **NOTE: This is an Android only feature.**
 *
 * @param {DateMatcher} days - The days in this bucket
 * @returns {ColorBucket} the highlighted bucket
 */
export const colorBucketHighlight = (days: DateMatcher) =>
  Platform.OS === 'android'
    ? // Providing transparent just for backwards compatibility, this should always use the cell style
      bucketCompat(colorBucket('transparent', days), 'highlight')
    : // Do nothing for iOS
      colorBucket('transparent', days);

export default colorBucket;
