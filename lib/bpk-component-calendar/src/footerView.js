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
import { processColor } from 'react-native';

import { type CellStyle } from './colorBucket';
import parseDateToNative from './parseDateToNative';

export type HighlightedDay = {
  date: Date | number,
  description: string,
  /**
   * Optional color to use.
   *
   * @see cellstyle
   * @ignore
   */
  color?: string,
  /**
   * Optional cellStyle to use.
   * Note that this will take precedence over `color` if defined.
   *
   * @see color
   * @see CellStyle
   * @ignore
   */
  cellStyle?: CellStyle,
  /**
   * Optionally set this highlight to show only the description provided and
   * not the date.
   *
   * @see description
   * @ignore
   */
  descriptionOnly?: boolean,
};

type NativeHighlightedDay = {
  ...HighlightedDay,
  color?: number,
  cellStyle?: CellStyle,
};

export type HighlightedDaysFooterView = {
  days: HighlightedDay[],
};

type NativeHighlightedDaysFooterView = {|
  days: NativeHighlightedDay[],
|};

type WithNativeType<T> = {
  __type: 'highlightedDays',
  ...T,
};

export type FooterView = WithNativeType<NativeHighlightedDaysFooterView>;

/**
 * Creates a footer view to show a list of highlighted days.
 *
 * **NOTE: This is an Android only feature.**
 *
 * @param {Object} viewDef the view definition.
 * @returns {Object} a footer view.
 */
const highlightedDaysFooterView = (
  viewDef: HighlightedDaysFooterView,
): FooterView => ({
  __type: 'highlightedDays',
  // $FlowFixMe flow does not understand that `color` is being replaced in the logic bellow and thinks `...day` is adding an invalid colour
  days: viewDef.days.map((day) => ({
    ...day,
    date: parseDateToNative(day.date) || 0,
    ...(day.color ? { color: processColor(day.color) || 0 } : {}),
  })),
});

export { highlightedDaysFooterView };
