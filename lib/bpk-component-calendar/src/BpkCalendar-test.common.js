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
/* eslint-disable no-console */

import React from 'react';
import { StyleSheet } from 'react-native';
import renderer from 'react-test-renderer';
import { colorSagano, colorPanjin } from 'bpk-tokens/tokens/base.react.native';

import DateMatchers from './DateMatchers';
import BpkCalendar from './BpkCalendar';
import {
  makeSingleSelection,
  makeRangeSelection,
  makeMultipleSelection,
} from './common-types';
import colorBucket from './colorBucket';
import { highlightedDaysFooterView } from './footerView';

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

const defaultProps = {
  locale: 'en_GB',
};

const commonTests = () => {
  describe('BpkCalendar', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkCalendar selectionType={singleSelection} {...defaultProps} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with minDate', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            {...defaultProps}
            minDate={new Date(Date.UTC(2019, 4, 19))}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with maxDate', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            {...defaultProps}
            maxDate={new Date(Date.UTC(2020, 4, 19))}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with both minDate and maxDate', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            {...defaultProps}
            minDate={new Date(Date.UTC(2019, 4, 19))}
            maxDate={new Date(Date.UTC(2020, 4, 19))}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with selection type "single" and selected dates', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            selectedDates={[new Date(Date.UTC(2019, 4, 19))]}
            {...defaultProps}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with selection type "range" and selected dates', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={rangeSelection}
            selectedDates={[
              new Date(Date.UTC(2019, 4, 19)),
              new Date(Date.UTC(2019, 4, 21)),
            ]}
            {...defaultProps}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should error with selection type "single" and selectedDates.length > 1', () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      renderer.create(
        <BpkCalendar
          selectionType={singleSelection}
          selectedDates={[new Date(2019, 4, 19), new Date(2019, 4, 20)]}
          {...defaultProps}
        />,
      );
      expect(console.error).toHaveBeenCalled();
    });

    it('should error if when maxDate is before minDate', () => {
      expect(() => {
        renderer.create(
          <BpkCalendar
            selectionType={singleSelection}
            minDate={new Date(2020, 4, 19)}
            maxDate={new Date(2019, 4, 19)}
            {...defaultProps}
          />,
        );
      }).toThrow('BpkCalendar: "minDate" must be before "maxDate"');
    });

    it('should error with selection type "range" and selectedDates.length > 2', () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      renderer.create(
        <BpkCalendar
          selectionType={rangeSelection}
          selectedDates={[
            new Date(2019, 4, 19),
            new Date(2019, 4, 20),
            new Date(2019, 4, 21),
          ]}
          {...defaultProps}
        />,
      );
      expect(console.error).toHaveBeenCalled();
    });

    it('should render correctly with selection type "multiple" and selected dates', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={multipleSelection}
            selectedDates={[
              new Date(Date.UTC(2019, 4, 19)),
              new Date(Date.UTC(2019, 4, 21)),
              new Date(Date.UTC(2019, 4, 29)),
            ]}
            {...defaultProps}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    [singleSelection, rangeSelection, multipleSelection].forEach(
      (selectionType) => {
        it(`should render correctly for selectionType={'${selectionType.type}'}`, () => {
          const tree = renderer
            .create(
              <BpkCalendar selectionType={selectionType} {...defaultProps} />,
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      },
    );

    it('should render correctly with custom style', () => {
      const styles = StyleSheet.create({
        custom: {
          flex: 1,
        },
      });

      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            {...defaultProps}
            style={styles.custom}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            {...defaultProps}
            testID="123" // <- Arbitrary prop.
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with disabled dates', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            {...defaultProps}
            disabledDates={DateMatchers.after(Date.UTC(2019, 11, 16))}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with color buckets', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            {...defaultProps}
            colorBuckets={[
              colorBucket(
                colorSagano,
                DateMatchers.before(Date.UTC(2019, 11, 18)),
              ),
              colorBucket(
                colorPanjin,
                DateMatchers.after(Date.UTC(2019, 11, 18)),
                'dark',
              ),
            ]}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with androidFooterView', () => {
      const tree = renderer
        .create(
          <BpkCalendar
            selectionType={singleSelection}
            {...defaultProps}
            androidFooterView={highlightedDaysFooterView({
              days: [
                {
                  date: Date.UTC(2019, 11, 18),
                  description: 'Test day',
                },
              ],
            })}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
