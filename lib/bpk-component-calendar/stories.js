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

import React, {
  Component,
  useState,
  useMemo,
  useCallback,
  type Node,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { colorSagano } from 'bpk-tokens/tokens/base.react.native';

import BpkTextInput from '../bpk-component-text-input';
import BpkPicker, { BpkPickerItem } from '../bpk-component-picker';
import BpkSelect from '../bpk-component-select';
import BpkText from '../bpk-component-text';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkCalendar, {
  makeSingleSelection,
  makeRangeSelection,
  makeMultipleSelection,
  DateMatchers,
  colorBucket,
  colorBucketNegative,
  colorBucketNeutral,
  colorBucketPositive,
  colorBucketHighlight,
  highlightedDaysFooterView,
  type BpkCalendarSelectionType,
} from './index';

const ONE_DAY_IN_MS = 8.64e7;
const today = new Date();

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

const singleSelection = makeSingleSelection({
  selectHint: 'Double tap to select date',
});

const rangeSelection = makeRangeSelection({
  startDateSelectHint: 'Double tap to select departure date',
  endDateSelectHint: 'Double tap to select return date',
  startDateSelectedState: 'Selected as departure date',
  endDateSelectedState: 'Selected as return date',
  endAndStartDateSelectedState: 'Selected as both departure and return date',
  dateBetweenStartAndEndSelectedState:
    'Selected between departure and return date',
  makeNextSelectionPrompt: 'Now select a return date',
});

const multipleSelection = makeMultipleSelection({
  selectHint: 'Double tap to select date',
  deselectHint: 'Double tap to deselect date',
});

const selectionOptions = {
  single: singleSelection,
  range: rangeSelection,
  multiple: multipleSelection,
};

const padLeft = (number) => {
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

const useAllWeekends = (startDate: number, endDate: number) =>
  useMemo(() => {
    const weekeds = [];
    let date = startDate;
    while (date <= endDate) {
      const day = new Date(date).getDay();
      if (day === 6 || day === 0) {
        weekeds.push(date);
      }
      date += ONE_DAY_IN_MS;
    }
    return weekeds;
  }, [startDate, endDate]);

const useDateMatchers = (minDate: number, maxDate: number): any => {
  const allWeekends = useAllWeekends(minDate, maxDate);
  return useMemo(() => {
    const minPlus30 = minDate + ONE_DAY_IN_MS * 30;
    const minPlus60 = minDate + ONE_DAY_IN_MS * 60;
    return {
      range: {
        label: `between ${formatDateForDisplay(
          new Date(minPlus30),
        )} and ${formatDateForDisplay(new Date(minPlus60))} (inclusive)`,
        value: 'range',
        descriptor: DateMatchers.range(minPlus30, minPlus60),
      },
      before: {
        label: `before ${formatDateForDisplay(new Date(minPlus60))}`,
        value: 'before',
        descriptor: DateMatchers.before(minPlus60),
      },
      after: {
        label: `after ${formatDateForDisplay(new Date(minPlus60))}`,
        value: 'after',
        descriptor: DateMatchers.after(minPlus60),
      },
      any: {
        label: 'weekends',
        value: 'any',
        descriptor: DateMatchers.any(...allWeekends),
      },
    };
  }, [minDate, allWeekends]);
};

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
        onChangeSelectedDates={(newDates) => {
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

  onChangeText = (value) => {
    let { selectedDates } = this.state;
    if (value === '') {
      selectedDates = [];
    }
    this.setState({ selectedDates });
  };

  handleNewDates = (newDates) => {
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
          selectionType={range ? rangeSelection : singleSelection}
          selectedDates={this.state.selectedDates}
          onChangeSelectedDates={this.handleNewDates}
        />
      </View>
    );
  }
}

type CalendarWithPickerProps = {
  label: string,
  options: { [key: string]: { value: string, label: string } },
  children: ({ selectedValue: string }) => Node,
};

const CalendarWithPicker = (props: CalendarWithPickerProps) => {
  const { label, options, children } = props;
  const [pickerOpen, setPickerOpen] = useState(false);
  const togglePicker = useCallback(() => {
    setPickerOpen((isPickerOpen) => !isPickerOpen);
  }, []);

  const firstOption = Object.keys(options)[0];
  const [selectedValue, setSelectedValue] = useState(
    options[firstOption].value,
  );

  return (
    <View style={styles.base}>
      <BpkText weight="emphasized" textStyle="sm">
        {label}
      </BpkText>
      <BpkSelect onPress={togglePicker} label={options[selectedValue].label} />
      {children({ selectedValue })}
      <BpkPicker
        doneLabel="Done"
        isOpen={pickerOpen}
        onClose={togglePicker}
        onValueChange={(value: ?(string | number)) => {
          if (value) {
            setSelectedValue(value.toString());
          }
        }}
        selectedValue={selectedValue}
      >
        {Object.keys(options).map((option) => (
          <BpkPickerItem
            key={option}
            label={options[option].label}
            value={options[option].value}
          />
        ))}
      </BpkPicker>
    </View>
  );
};

const ChangeableSelectionTypeStory = () => {
  const options = Object.keys(selectionOptions).reduce(
    (acc, type) => ({
      ...acc,
      [type]: { value: type, label: type },
    }),
    {},
  );

  return (
    <CalendarWithPicker label="Selection type" options={options}>
      {({ selectedValue }) => (
        <BpkCalendarExample
          style={styles.calendar}
          selectionType={selectionOptions[selectedValue]}
        />
      )}
    </CalendarWithPicker>
  );
};

storiesOf('bpk-component-calendar', module)
  .addDecorator(CenterDecorator)
  .add('docs:single', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={singleSelection}
    />
  ))
  .add('docs:multiple', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={multipleSelection}
    />
  ))
  .add('docs:range', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={rangeSelection}
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
      selectionType={singleSelection}
      minDate={new Date(Date.UTC(today.getFullYear(), 0, 2))}
      maxDate={new Date(Date.UTC(today.getFullYear() + 1, 11, 31))}
    />
  ))
  .add('With selected dates (UTC)', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={rangeSelection}
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
      selectionType={rangeSelection}
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
      selectionType={singleSelection}
      locale={locales.pt_BR}
    />
  ))
  .add('With disabled dates', () => {
    const maxDate = Date.UTC(today.getFullYear() + 1, 11, 31);
    const minDate = Date.UTC(today.getFullYear(), 0, 2);

    const dateMatchers = useDateMatchers(minDate, maxDate);

    return (
      <CalendarWithPicker label="Disable dates" options={dateMatchers}>
        {({ selectedValue }) => (
          <BpkCalendarExample
            style={styles.calendar}
            selectionType={rangeSelection}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={dateMatchers[selectedValue].descriptor}
          />
        )}
      </CalendarWithPicker>
    );
  })
  .add('With disabled dates: update dynamically', () => {
    const [selectedDates, setSelectedDates] = useState(null);
    const disabledDates =
      selectedDates &&
      selectedDates.length === 1 &&
      DateMatchers.after(selectedDates[0].getTime() + ONE_DAY_IN_MS * 30);

    return (
      <BpkCalendarExample
        onChangeSelectedDates={setSelectedDates}
        style={styles.calendarOnly}
        selectionType={rangeSelection}
        minDate={new Date(Date.UTC(today.getFullYear(), 0, 2))}
        maxDate={new Date(Date.UTC(today.getFullYear() + 1, 11, 31))}
        disabledDates={disabledDates || null}
      />
    );
  })
  .add('Colour buckets', () => {
    const maxDate = Date.UTC(today.getFullYear() + 1, 11, 31);
    const minDate = Date.UTC(today.getFullYear(), 0, 2);

    const dateMatchers = useDateMatchers(minDate, maxDate);

    return (
      <CalendarWithPicker label="Colour bucket" options={dateMatchers}>
        {({ selectedValue }) => (
          <BpkCalendarExample
            style={styles.calendarOnly}
            selectionType={rangeSelection}
            minDate={minDate}
            maxDate={maxDate}
            colorBuckets={[
              colorBucket(colorSagano, dateMatchers[selectedValue].descriptor),
            ]}
          />
        )}
      </CalendarWithPicker>
    );
  })
  .add('Colour buckets: full example', () => {
    const maxDate = Date.UTC(today.getFullYear() + 1, 11, 31);
    const minDate = Date.UTC(today.getFullYear(), 0, 2);

    const buckets = useMemo(() => {
      let date = minDate;
      const one = [];
      const two = [];
      const three = [];
      while (date <= maxDate) {
        one.push(date);
        date += ONE_DAY_IN_MS;
        two.push(date);
        date += ONE_DAY_IN_MS;
        three.push(date);
        date += ONE_DAY_IN_MS;
      }
      return [
        colorBucketPositive(DateMatchers.any(...one)),
        colorBucketNeutral(DateMatchers.any(...two)),
        colorBucketNegative(DateMatchers.any(...three)),
      ];
    }, [maxDate, minDate]);

    return (
      <BpkCalendarExample
        style={styles.calendarOnly}
        selectionType={rangeSelection}
        minDate={minDate}
        maxDate={maxDate}
        colorBuckets={buckets}
      />
    );
  })
  .add('Footer view: Highlighted days', () => (
    <BpkCalendarExample
      style={styles.calendarOnly}
      selectionType={rangeSelection}
      minDate={new Date(Date.UTC(today.getFullYear(), 0, 2))}
      maxDate={new Date(Date.UTC(today.getFullYear() + 1, 11, 31))}
      colorBuckets={[
        colorBucketHighlight(
          DateMatchers.any(Date.UTC(today.getFullYear(), 0, 10)),
        ),
      ]}
      androidFooterView={highlightedDaysFooterView({
        days: [
          {
            date: Date.UTC(today.getFullYear(), 0, 10),
            description: 'A day to remember',
          },
          {
            date: Date.UTC(today.getFullYear(), 0, 13),
            description: 'A day to forget',
            cellStyle: 'negative',
            descriptionOnly: true,
          },
        ],
      })}
    />
  ));
