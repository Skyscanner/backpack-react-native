/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

import React, { Component, createRef, type ElementRef } from 'react';
import {
  requireNativeComponent,
  findNodeHandle,
  UIManager,
} from 'react-native';

import {
  commonPropTypes,
  commonDefaultProps,
  SELECTION_TYPES,
  type CommonProps,
} from './common-types';

const RCTBPKCalendar = requireNativeComponent('RCTBPKCalendar');

const parseDateToNative = (date: ?(Date | number)) => {
  if (date) {
    // Use timestamps instead of Date objects because something goes awry over the bridge
    // when we try to send dates.
    const timestamp = typeof date === 'number' ? date : date.getTime();
    return timestamp;
  }

  return date;
};

export type Props = {
  ...$Exact<CommonProps>,
};

class BpkCalendar extends Component<Props, {}> {
  calendarRef: ElementRef<any>;

  static propTypes = commonPropTypes;

  static defaultProps = commonDefaultProps;

  constructor(props: Props) {
    super(props);

    this.calendarRef = createRef();
  }

  componentDidMount() {
    const { selectionType, selectedDates } = this.props;
    // This is required to resolve a bug where the calendar renders
    // incorrectly in some scenarios after the first render.
    if (selectionType === SELECTION_TYPES.range && selectedDates.length > 0) {
      const handle = findNodeHandle(this.calendarRef.current);
      UIManager.dispatchViewManagerCommand(
        handle,
        UIManager.getViewManagerConfig('RCTBPKCalendar').Commands.forceRender,
        [],
      );
    }
  }

  render() {
    const {
      minDate,
      maxDate,
      onChangeSelectedDates,
      selectedDates,
      selectionType,
      ...rest
    } = this.props;

    if (minDate && maxDate) {
      if (minDate > maxDate) {
        // It's safer to throw an error rather than use a prop type because if
        // we let this get rendered it will crash the calendar.
        throw new Error(`BpkCalendar: "minDate" must be before "maxDate".`);
      }
    }

    return (
      <RCTBPKCalendar
        ref={this.calendarRef}
        minDate={parseDateToNative(minDate)}
        maxDate={parseDateToNative(maxDate)}
        onDateSelection={onChangeSelectedDates}
        selectedDates={selectedDates.map(parseDateToNative)}
        selectionType={selectionType}
        {...rest}
      />
    );
  }
}

export default BpkCalendar;
