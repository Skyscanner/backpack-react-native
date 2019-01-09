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
import BpkPicker, { BpkPickerItem } from 'react-native-bpk-component-picker';
import BpkSelect from 'react-native-bpk-component-select';

import CenterDecorator from '../../storybook/CenterDecorator';
import BpkCalendar, {
  SELECTION_TYPES,
  type BpkCalendarSelectionType,
} from './index';

/* eslint-disable react/no-multi-comp */

class BpkCalendarExample extends Component<
  {
    onChangeSelectedDates?: (Date[]) => mixed,
    selectionType: BpkCalendarSelectionType,
  },
  {
    selectedDates: Date[],
  },
> {
  constructor(props) {
    super(props);
    this.state = { selectedDates: [] };
  }

  render() {
    return (
      <BpkCalendar
        locale="en_GB"
        selectionType={this.props.selectionType}
        onChangeSelectedDates={newDates => {
          if (this.props.onChangeSelectedDates) {
            this.props.onChangeSelectedDates(newDates);
          }
          this.setState({ selectedDates: newDates });
        }}
        style={{ flexGrow: 1 }}
        selectedDates={this.state.selectedDates}
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
      <View style={{ flex: 1 }}>
        <BpkTextInput
          label={range ? 'Start date' : 'Selected date'}
          value={selectedDates[0] ? selectedDates[0].toLocaleDateString() : ''}
          onChangeText={this.onChangeText}
        />
        {range && (
          <BpkTextInput
            editable={!!selectedDates[0]}
            label="End date"
            value={
              selectedDates[1] ? selectedDates[1].toLocaleDateString() : ''
            }
            onChangeText={this.onChangeText}
          />
        )}
        <BpkCalendarExample
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

  onSelectionTypeChange = (selectionType: string | number) => {
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
      <View style={{ flowDirection: 'column', flex: 1 }}>
        <BpkSelect
          onPress={this.togglePicker}
          label={this.state.selectionType}
        />
        <BpkCalendarExample selectionType={this.state.selectionType} />
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

storiesOf('react-native-bpk-component-calendar', module)
  .addDecorator(CenterDecorator)
  .add('docs:single', () => (
    <BpkCalendarExample selectionType={SELECTION_TYPES.single} />
  ))
  .add('docs:multiple', () => (
    <BpkCalendarExample selectionType={SELECTION_TYPES.multiple} />
  ))
  .add('docs:range', () => (
    <BpkCalendarExample selectionType={SELECTION_TYPES.range} />
  ))
  .add('Changeable selection type', () => <ChangeableSelectionTypeStory />)
  .add('Hooked up to input field (single)', () => (
    <ExampleWithLinkedInputs range={false} />
  ))
  .add('Hooked up to input field (range)', () => (
    <ExampleWithLinkedInputs range />
  ));
