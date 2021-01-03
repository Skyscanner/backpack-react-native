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

import React from 'react';
import { requireNativeComponent } from 'react-native';

import {
  commonPropTypes,
  commonDefaultProps,
  type NativeCalendarCommonProps,
} from './common-types';
import parseDateToNative from './parseDateToNative';

const AndroidBPKCalendarView = requireNativeComponent('AndroidBPKCalendarView');

export type Props = {
  ...$Exact<NativeCalendarCommonProps>,
};

const BpkCalendar = (props: Props) => {
  const {
    maxDate,
    minDate,
    onChangeSelectedDates,
    selectedDates,
    ...rest
  } = props;

  // TODO: add support for multiple selection
  let normalizedDates = selectedDates;
  if (normalizedDates.length > 2) {
    normalizedDates = normalizedDates.splice(0, 2);
  }

  return (
    <AndroidBPKCalendarView
      minDate={parseDateToNative(minDate)}
      maxDate={parseDateToNative(maxDate)}
      selectedDates={normalizedDates.map(parseDateToNative)}
      onChange={onChangeSelectedDates}
      {...rest}
    />
  );
};

BpkCalendar.propTypes = commonPropTypes;
BpkCalendar.defaultProps = commonDefaultProps;

export default BpkCalendar;
