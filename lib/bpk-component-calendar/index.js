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

import BpkCalendar, { type Props } from './src/BpkCalendar';
import {
  makeSingleSelection,
  makeRangeSelection,
  makeMultipleSelection,
  type SelectionType,
  type SelectionTypeSingle,
  type SelectionTypeRange,
  type SelectionTypeMultiple,
} from './src/common-types';
import DateMatchers, { type DateMatcher } from './src/DateMatchers';
import colorBucket, {
  colorBucketNegative,
  colorBucketNeutral,
  colorBucketPositive,
  colorBucketHighlight,
  type ColorBucket,
} from './src/colorBucket';
import {
  highlightedDaysFooterView,
  type FooterView,
  type HighlightedDaysFooterView,
} from './src/footerView';

export type {
  Props as BpkCalendarProps,
  SelectionType as BpkCalendarSelectionType,
  SelectionTypeSingle as BpkCalendarSelectionTypeSingle,
  SelectionTypeRange as BpkCalendarSelectionTypeRange,
  SelectionTypeMultiple as BpkCalendarSelectionTypeMultiple,
  DateMatcher as BpkCalendarDateMatcher,
  ColorBucket as BpkCalendarColorBucket,
  FooterView as BpkCalendarFooterView,
  HighlightedDaysFooterView as BpkCalendarHighlightedDaysFooterView,
};

export default BpkCalendar;
export {
  makeSingleSelection,
  makeRangeSelection,
  makeMultipleSelection,
  DateMatchers,
  colorBucket,
  colorBucketNegative,
  colorBucketNeutral,
  colorBucketPositive,
  colorBucketHighlight,
  highlightedDaysFooterView,
};
