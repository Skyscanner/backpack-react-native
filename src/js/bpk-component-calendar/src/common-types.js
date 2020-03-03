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

import { type ElementProps } from 'react';
import { View, ViewPropTypes } from 'react-native';
import { type SyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import PropTypes from 'prop-types';

import { type DateMatcher } from './DateMatchers';
import { type ColorBucket } from './colorBucket';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

export const SELECTION_TYPES = {
  single: 'single',
  range: 'range',
  multiple: 'multiple',
};

export type SelectionType = $Keys<typeof SELECTION_TYPES>;
export type SelectedDatesChanged = ?(Date[]) => mixed;
export type NativeEvent = SyntheticEvent<$ReadOnly<{| selectedDates: number[] |}>,>; // eslint-disable-line prettier/prettier

export type CommonProps = {
  locale: string,
  colorBuckets: ?(ColorBucket[]),
  disabledDates: ?DateMatcher,
  minDate: ?Date,
  maxDate: ?Date,
  onChangeSelectedDates: SelectedDatesChanged,
  selectedDates: Date[],
  selectionType: SelectionType,
  style: ViewStyleProp,
};

export type NativeCalendarCommonProps = {
  locale: string,
  disabledDates: ?DateMatcher,
  minDate: ?Date,
  maxDate: ?Date,
  onChangeSelectedDates: ?(NativeEvent) => mixed,
  selectedDates: Date[],
  selectionType: SelectionType,
  style: ViewStyleProp,
};

const datePropType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.number,
]);

const selectedDatesPropType = (
  props: { [string]: any },
  propName: string,
  componentName: string,
  ...rest: [any]
) => {
  if (props[propName]) {
    const selectedDatesCount = props[propName].length;
    if (
      props.selectionType === SELECTION_TYPES.single &&
      selectedDatesCount > 1
    ) {
      return new Error(
        `${componentName}: When "selectionType" is "single", only supply one date to "selectedDates"`,
      );
    }
    if (
      props.selectionType === SELECTION_TYPES.range &&
      selectedDatesCount > 2
    ) {
      return new Error(
        `${componentName}: When "selectionType" is "range", only supply one or two dates to "selectedDates"`,
      );
    }
  }
  return PropTypes.arrayOf(datePropType)(
    props,
    propName,
    componentName,
    ...rest,
  );
};

export const commonPropTypes = {
  locale: PropTypes.string.isRequired,
  colorBuckets: PropTypes.array,
  disabledDates: PropTypes.shape({
    type: PropTypes.string,
    dates: PropTypes.array,
  }),
  minDate: datePropType,
  maxDate: datePropType,
  onChangeSelectedDates: PropTypes.func,
  selectedDates: selectedDatesPropType,
  selectionType: PropTypes.oneOf(Object.keys(SELECTION_TYPES)),
  style: ViewPropTypes.style,
};

export const commonDefaultProps = {
  minDate: null,
  maxDate: null,
  onChangeSelectedDates: null,
  selectedDates: [],
  selectionType: SELECTION_TYPES.single,
  style: null,
  disabledDates: null,
  colorBuckets: undefined,
};
