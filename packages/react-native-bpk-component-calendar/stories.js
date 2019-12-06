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

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkTextInput from 'react-native-bpk-component-text-input';
import BpkPicker, { BpkPickerItem } from 'react-native-bpk-component-picker';
import BpkSelect from 'react-native-bpk-component-select';

import CenterDecorator from '../../storybook/CenterDecorator';

import BpkCalendar, {
  SELECTION_TYPES,
  type BpkCalendarSelectionType,
} from './index';

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    maxHeight: '100%',
    height: '100%',
  },
  calendar: {
    flexGrow: 1,
  },
  calendarOnly: {
    maxHeight: '100%',
    height: '100%',
    width: '100%',
  },
});

const locales = {
  en_GB: 'en-gb',
  pt_BR: 'pt-br',
};

const padLeft = number => {
  const withZeros = `0${number}`;
  return withZeros.substring(withZeros.length - 2);
};

const formatDateForDisplay = (date: Date) => {
  // date.toLocaleDateString(locale, { timeZone: 'UTC' });
  // TODO: the `timeZone` option doesn't seem to be supported
  // If you set the timezone to Brasília (GMT-3) and run
  // new Date(Date.UTC(2019, 0, 2)).toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
  // it returns the first of jan and not the second (non UTC date)
  const day = padLeft(date.getUTCDate());
  const month = padLeft(date.getUTCMonth() + 1);
  return `${day}/${month}/${date.getUTCFullYear()}`;
};

/* eslint-disable react/no-multi-comp */

class BpkCalendarExample extends Component<
  {
    onChangeSelectedDates: ?(Date[]) => mixed,
    selectionType: BpkCalendarSelectionType,
    initiallySelectedDates: ?Array<Date | number>,
  },
  {
    selectedDates: Date[],
  },
> {
  static defaultProps = {
    onChangeSelectedDates: null,
    initiallySelectedDates: null,
  };

  constructor(props) {
    super(props);
    this.state = { selectedDates: props.initiallySelectedDates || [] };
  }

  render() {
    const {
      selectionType,
      initiallySelectedDates: _,
      onChangeSelectedDates,
      ...rest
    } = this.props;
    return (
      <BpkCalendar
        locale={locales.en_GB}
        selectionType={selectionType}
        selectedDates={this.state.selectedDates}
        onChangeSelectedDates={newDates => {
          if (onChangeSelectedDates) {
            onChangeSelectedDates(newDates);
          }
          this.setState({ selectedDates: newDates });
        }}
        {...rest}
      />
    );
  }
}

class ExampleWithLinkedInputs extends Component<
  {
    range: boolean,
  },
  {
    selectedDates: Date[],
  },
> {
  constructor(props) {
    super(props);

    this.state = {
      selectedDates: [],
    };
  }

  onChangeText = value => {
    let { selectedDates } = this.state;
    if (value === '') {
      selectedDates = [];
    }
    this.setState({ selectedDates });
  };

  handleNewDates = newDates => {
    this.setState({
      selectedDates: newDates,
    });
  };

  render() {
    const { range } = this.props;
    const { selectedDates } = this.state;
    return (
      <View style={styles.base}>
        <BpkTextInput
          label={range ? 'Start date' : 'Selected date'}
          value={selectedDates[0] ? formatDateForDisplay(selectedDates[0]) : ''}
          onChangeText={this.onChangeText}
        />
        {range && (
          <BpkTextInput
            editable={!!selectedDates[0]}
            label="End date"
            value={
              selectedDates[1] ? formatDateForDisplay(selectedDates[1]) : ''
            }
            onChangeText={this.onChangeText}
          />
        )}
        <BpkCalendarExample
          style={styles.calendar}
          selectionType={range ? SELECTION_TYPES.range : SELECTION_TYPES.single}
          selectedDates={this.state.selectedDates}
          onChangeSelectedDates={this.handleNewDates}
        />
      </View>
    );
  }
}

class ChangeableSelectionTypeStory extends Component<
  {},
  {
    pickerOpen: boolean,
    selectionType: BpkCalendarSelectionType,
  },
> {
  constructor() {
    super();
    this.state = {
      pickerOpen: false,
      selectionType: SELECTION_TYPES.single,
    };
  }

  onSelectionTypeChange = (selectionType: ?(string | number)) => {
    const maybe = Object.keys(SELECTION_TYPES).find(x => x === selectionType);

    if (maybe) {
      this.setState({
        selectionType: maybe,
      });
    }
  };

  togglePicker = () => {
    this.setState(prevState => ({ pickerOpen: !prevState.pickerOpen }));
  };

  render() {
    return (
      <View style={styles.base}>
        <BpkSelect
          onPress={this.togglePicker}
          label={this.state.selectionType}
        />
        <BpkCalendarExample
          style={styles.calendar}
          selectionType={this.state.selectionType}
        />
        <BpkPicker
          doneLabel="Done"
          isOpen={this.state.pickerOpen}
          onClose={this.togglePicker}
          onValueChange={this.onSelectionTypeChange}
          selectedValue={this.state.selectionType}
        >
          {Object.keys(SELECTION_TYPES).map(selectionType => (
            <BpkPickerItem
              key={selectionType}
              label={selectionType}
              value={selectionType}
            />
          ))}
        </BpkPicker>
      </View>
    );
  }
}

const today = new Date();

storiesOf('react-native-bpk-component-calendar', module)
  .addDecorator(CenterDecorator)
  .add('docs:single', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={SELECTION_TYPES.single}
    />
  ))
  .add('docs:multiple', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={SELECTION_TYPES.multiple}
    />
  ))
  .add('docs:range', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={SELECTION_TYPES.range}
    />
  ))
  .add('Changeable selection type', () => <ChangeableSelectionTypeStory />)
  .add('Hooked up to input field (single)', () => (
    <ExampleWithLinkedInputs range={false} />
  ))
  .add('Hooked up to input field (range)', () => (
    <ExampleWithLinkedInputs range />
  ))
  .add('With min and max dates', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={SELECTION_TYPES.single}
      minDate={new Date(Date.UTC(today.getFullYear(), 0, 2))}
      maxDate={new Date(Date.UTC(today.getFullYear() + 1, 11, 31))}
    />
  ))
  .add('With selected dates (UTC)', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={SELECTION_TYPES.range}
      minDate={new Date(Date.UTC(today.getFullYear(), 0, 2))}
      maxDate={new Date(Date.UTC(today.getFullYear() + 1, 11, 31))}
      initiallySelectedDates={[
        new Date(Date.UTC(today.getFullYear(), today.getMonth(), 3)),
        new Date(Date.UTC(today.getFullYear(), today.getMonth(), 7)),
      ]}
    />
  ))
  .add('With selected dates (UTC number)', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={SELECTION_TYPES.range}
      minDate={Date.UTC(today.getFullYear(), 0, 2)}
      maxDate={Date.UTC(today.getFullYear() + 1, 11, 31)}
      initiallySelectedDates={[
        Date.UTC(today.getFullYear(), today.getMonth(), 3),
        Date.UTC(today.getFullYear(), today.getMonth(), 7),
      ]}
    />
  ))
  .add('With different locale', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={SELECTION_TYPES.single}
      locale={locales.pt_BR}
    />
  ));
