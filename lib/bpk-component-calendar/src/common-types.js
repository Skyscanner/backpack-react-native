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

import { type ElementProps } from 'react';
import { View, ViewPropTypes } from 'react-native';
import { type SyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import PropTypes from 'prop-types';

import { type DateMatcher } from './DateMatchers';
import { type ColorBucket } from './colorBucket';
import { type FooterView } from './footerView';

type ViewProps = ElementProps<typeof View>;
type ViewStyleProp = $PropertyType<ViewProps, 'style'>;

// NOTE: This array needs to be kept in sync with
// SelectionTypeSingle below.
//
// TODO: Figure out if there's a way to create the
// type SelectionTypeSingle from this array instead of
// having duplication.
const SINGLE_SELECTION_PROPS = ['selectHint'];
export type SelectionTypeSingle = {|
  +type: 'single',

  // A hint that is read out to screen reader users
  // when focus is on an unselected date. Should explain how
  // to select the date i.e. by double tapping.
  +selectHint: string,
|};

// NOTE: This array needs to be kept in sync with
// SelectionTypeRange below.
//
// TODO: Figure out if there's a way to create the
// type SelectionTypeRange from this array instead of
// having duplication.
const RANGE_SELECTION_PROPS = [
  'startDateSelectHint',
  'endDateSelectHint',
  'startDateSelectedState',
  'endDateSelectedState',
  'endAndStartDateSelectedState',
  'dateBetweenStartAndEndSelectedState',
  'makeNextSelectionPrompt',
];

export type SelectionTypeRange = {|
  +type: 'range',

  // A hint that is read out to screen reader users
  // when no dates have been selected. Should explain how
  // to select the start date i.e. by double tapping.
  +startDateSelectHint: string,

  // A hint that is read out to screen reader users
  // when only the start date has been selected. Should explain how
  // to select the end date i.e. by double tapping.
  +endDateSelectHint: string,

  // A string that is read out to screen reader users
  // when the selected start date has focus.
  +startDateSelectedState: string,

  // A string that is read out to screen reader users
  // when the selected end date has focus.
  +endDateSelectedState: string,

  // A string that is read out to screen reader users
  // when the selected end date is the same as the start date and
  // this date has focus.
  +endAndStartDateSelectedState: string,

  // A string that is read out to screen reader users
  // when a date between the start and end date has focus. e.g.
  // when the start date is 01/03/2021 and the end date is 05/03/2021
  // and the date with focus is 03/03/2021.
  +dateBetweenStartAndEndSelectedState: string,

  // A prompt that is read out to screen reader users
  // when a start date is selected. Should explain to the user
  // that they should select an end date for the range.
  +makeNextSelectionPrompt: string,
|};

// NOTE: This array needs to be kept in sync with
// SelectionTypeMultiple below.
//
// TODO: Figure out if there's a way to create the
// type SelectionTypeMultiple from this array instead of
// having duplication.
const MULTIPLE_SELECTION_PROPS = ['selectHint', 'deselectHint'];
export type SelectionTypeMultiple = {|
  +type: 'multiple',

  // A hint that is read out to screen reader users
  // when focus is on an unselected date. Should explain how
  // to select the date i.e. by double tapping.
  +selectHint: string,

  // A hint that is read out to screen reader users
  // when focus is on a selected date. Should explain how
  // to unselect the date i.e. by double tapping.
  +deselectHint: string,
|};

export type SelectionType =
  | SelectionTypeSingle
  | SelectionTypeRange
  | SelectionTypeMultiple;

export const assertString = (
  object: { [string]: string },
  key: string,
  fn: string,
): void => {
  if (!Object.prototype.hasOwnProperty.call(object, key)) {
    throw new Error(`Missing key \`${key}\` in argument for \`${fn}\``);
  }

  if (object[key].length === 0) {
    throw new Error(
      `Value of \`${key}\` in argument for \`${fn}\` cannot be empty`,
    );
  }
};

export const makeSingleSelection = (
  strings: $Exact<$Diff<SelectionTypeSingle, {| type: 'single' |}>>,
): SelectionType => {
  SINGLE_SELECTION_PROPS.forEach((key) =>
    assertString(strings, key, 'makeSingleSelection'),
  );

  return { type: 'single', ...strings };
};

export const makeRangeSelection = (
  strings: $Exact<$Diff<SelectionTypeRange, {| type: 'range' |}>>,
): SelectionType => {
  RANGE_SELECTION_PROPS.forEach((key) =>
    assertString(strings, key, 'makeRangeSelection'),
  );

  return { type: 'range', ...strings };
};

export const makeMultipleSelection = (
  strings: $Exact<$Diff<SelectionTypeMultiple, {| type: 'multiple' |}>>,
): SelectionType => {
  MULTIPLE_SELECTION_PROPS.forEach((key) =>
    assertString(strings, key, 'makeMultipleSelection'),
  );

  return { type: 'multiple', ...strings };
};

export type SelectedDatesChanged = ?(Date[]) => mixed;
export type NativeEvent = SyntheticEvent<
  $ReadOnly<{| selectedDates: number[] |}>,
>;

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
  androidFooterView: ?FooterView,
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
  androidFooterView: ?FooterView,
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
    if (props.selectionType.type === 'single' && selectedDatesCount > 1) {
      return new Error(
        `${componentName}: When "selectionType" is "single", only supply one date to "selectedDates"`,
      );
    }
    if (props.selectionType.type === 'range' && selectedDatesCount > 2) {
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
    dates: PropTypes.arrayOf(PropTypes.number),
  }),
  minDate: datePropType,
  maxDate: datePropType,
  onChangeSelectedDates: PropTypes.func,
  selectedDates: selectedDatesPropType,
  selectionType: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf(['single']),
      ...SINGLE_SELECTION_PROPS.reduce((acc, k) => {
        acc[k] = PropTypes.string.isRequired;
        return acc;
      }, {}),
    }),
    PropTypes.shape({
      type: PropTypes.oneOf(['range']),
      ...RANGE_SELECTION_PROPS.reduce((acc, k) => {
        acc[k] = PropTypes.string.isRequired;
        return acc;
      }, {}),
    }),
    PropTypes.shape({
      type: PropTypes.oneOf(['multiple']),
      ...MULTIPLE_SELECTION_PROPS.reduce((acc, k) => {
        acc[k] = PropTypes.string.isRequired;
        return acc;
      }, {}),
    }),
  ]).isRequired,
  style: ViewPropTypes.style,
  androidFooterView: PropTypes.object,
};

export const commonDefaultProps = {
  minDate: null,
  maxDate: null,
  onChangeSelectedDates: null,
  selectedDates: [],
  style: null,
  disabledDates: null,
  colorBuckets: undefined,
  androidFooterView: undefined,
};
