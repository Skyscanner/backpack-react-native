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
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkTextInput from 'react-native-bpk-component-text-input';
import BpkButton from 'react-native-bpk-component-button';

import CenterDecorator from '../../storybook/CenterDecorator';
import BpkCalendar from './index';

class DatePickerExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDateString: '',
      showCalendar: false,
      selectedDates: [],
    };
  }

  handleTextEdit = value => {
    let selectedDates = this.state.selectedDates;
    if (value === '') {
      selectedDates = [];
    }
    this.setState({ selectedDates, selectedDateString: value });
  };

  handleNewDates = newDates => {
    const selectedDateString = newDates.map( dt => dt.toLocaleDateString()).toString()
    this.setState({
      selectedDates: newDates,
      selectedDateString,
    });
  };

  render() {
    return (
      <View>
        <BpkTextInput
          label="Selected date"
          value={this.state.selectedDateString}
          placeholder="No date selected"
          onChangeText={this.handleTextEdit}
        />
        <BpkButton
          title={this.state.showCalendar ? 'Hide calendar' : 'Select a date'}
          onPress={() => {
            this.setState(prevState => ({
              showCalendar: !prevState.showCalendar,
            }));
          }}
        />
        {this.state.showCalendar && (
          <BpkCalendar
            selectionType="single"
            selectedDates={this.state.selectedDates}
            onDateSelectionChanged={newDates => {
              this.handleNewDates(newDates);
            }}
          />
        )}
      </View>
    );
  }
}

class BpkCalendarExample extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedDates: [] };
  }

  render() {
    return (
      <BpkCalendar
        selectionType="multiple"
        selectedDates={this.state.selectedDates}
        onDateSelectionChanged={newDates => {
          this.setState({ selectedDates: newDates });
        }}
      />
    );
  }
}

storiesOf('react-native-bpk-component-calendar', module)
  .addDecorator(CenterDecorator)
  .add('default', () => <BpkCalendarExample />)
  .add('date-picker', () => <DatePickerExample />);
