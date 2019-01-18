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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  type StyleObj,
  Button,
  StyleSheet,
  View,
  ViewPropTypes,
  requireNativeComponent,
  NativeModules,
} from 'react-native';

const RCTCalendarView = requireNativeComponent('RCTCalendarView');

const styles = StyleSheet.create({
  base: {
    width: '100%',
    height: '100%',
  },
});

export type Props = {
  style: ?StyleObj,
};

const getDateInOneYear = () => {
  const date = new Date();
  const newMonth = date.getMonth() + 12;
  date.setMonth(newMonth);
  return date;
};

const BpkCalendar = props => {
  const { onDateSelectionChanged, style: userStyle, ...rest } = props;

  const style = [styles.base];
  if (userStyle) {
    style.push(userStyle);
  }

  return (
    <View style={style} {...rest}>
      <RCTCalendarView
        locale="pt-BR"
        onDateSelection={event => {
          const datesConverted = event.nativeEvent.selectedDates.map(
            dateString => new Date(Date.parse(dateString)),
          );
          if (onDateSelectionChanged) {
            onDateSelectionChanged(datesConverted);
          }
        }}
        {...rest}
      />
    </View>
  );
};

BpkCalendar.propTypes = {
  style: ViewPropTypes.style,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onDateSelectionChanged: PropTypes.func,
};

BpkCalendar.defaultProps = {
  style: null,
  minDate: new Date(),
  maxDate: getDateInOneYear(),
  selectedDates: [],
  onDateSelectionChanged: null,
};

export default BpkCalendar;
