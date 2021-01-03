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

const RCTBPKCalendar = requireNativeComponent('RCTBPKCalendar');

export type Props = {
  ...$Exact<NativeCalendarCommonProps>,
};

const BpkCalendar = (props: Props) => {
  const {
    minDate,
    maxDate,
    onChangeSelectedDates,
    selectedDates,
    selectionType,
    ...rest
  } = props;

  return (
    <RCTBPKCalendar
      minDate={parseDateToNative(minDate)}
      maxDate={parseDateToNative(maxDate)}
      onDateSelection={onChangeSelectedDates}
      selectedDates={selectedDates.map(parseDateToNative)}
      selectionType={selectionType}
      {...rest}
    />
  );
};

BpkCalendar.propTypes = commonPropTypes;

BpkCalendar.defaultProps = commonDefaultProps;

export default BpkCalendar;
