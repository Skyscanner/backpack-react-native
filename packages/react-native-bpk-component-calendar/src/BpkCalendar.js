/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import memoize from 'lodash/memoize';

import {
  commonPropTypes,
  commonDefaultProps,
  type CommonProps,
} from './common-types';
import NativeCalendar from './NativeCalendar';

export type Props = {
  ...$Exact<CommonProps>,
};

const createOnChangeHandler = memoize(callback => event => {
  // $FlowFixMe
  if (event.nativeEvent.selectedDates) {
    const convertedDates = event.nativeEvent.selectedDates.map(
      timestamp => new Date(timestamp * 1000),
    );
    if (callback) {
      callback(convertedDates);
    }
  }
});

const BpkCalendar = (props: Props) => {
  const {
    minDate,
    maxDate,
    onChangeSelectedDates,
    selectedDates,
    ...rest
  } = props;

  if (minDate && maxDate) {
    if (minDate > maxDate) {
      // It's safer to throw an error rather than use a prop type because if
      // we let this get rendered it will crash the calendar.
      throw new Error(`BpkCalendar: "minDate" must be before "maxDate".`);
    }
  }

  return (
    <NativeCalendar
      minDate={minDate}
      maxDate={maxDate}
      onChangeSelectedDates={createOnChangeHandler(onChangeSelectedDates)}
      selectedDates={selectedDates}
      {...rest}
    />
  );
};

BpkCalendar.propTypes = commonPropTypes;
BpkCalendar.defaultProps = commonDefaultProps;

export default BpkCalendar;
