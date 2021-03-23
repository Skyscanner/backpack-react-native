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

// @flow

import {
  assertString,
  makeSingleSelection,
  makeRangeSelection,
  makeMultipleSelection,
} from './common-types';

describe('common-types', () => {
  describe('assertStrings', () => {
    it('throws when a key is missing', () => {
      expect(() => {
        assertString({ a: 'hello' }, 'b', 'myTest');
      }).toThrow();
    });

    it('throws when the value for a key is empty', () => {
      expect(() => {
        assertString({ a: 'hello', b: '' }, 'b', 'myTest');
      }).toThrow();
    });

    it('does not throw when the key is present with a non-empty value', () => {
      expect(() => {
        assertString({ a: 'hello', b: 'test' }, 'b', 'myTest');
      }).not.toThrow();
    });
  });

  describe('makeSingleSelection', () => {
    it('should return an appropriate object', () => {
      expect(makeSingleSelection({ selectHint: 'Test' })).toEqual({
        type: 'single',
        selectHint: 'Test',
      });
    });

    it('should throw when `selectHint` is missing', () => {
      expect(() => {
        // NOTE: We intentionally disable flow here as the purpose
        // of this test is to verify that the underlying code throws
        // in this case.
        // $FlowFixMe
        makeSingleSelection({});
      }).toThrow();
    });
  });

  describe('makeMultipleSelection', () => {
    let expectedArgs;

    beforeEach(() => {
      expectedArgs = ['selectHint', 'deselectHint'].reduce((acc, k) => {
        acc[k] = `Test_${k}`;
        return acc;
      }, {});
    });

    it('should return an appropriate object', () => {
      expect(makeMultipleSelection(expectedArgs)).toEqual({
        type: 'multiple',
        selectHint: 'Test_selectHint',
        deselectHint: 'Test_deselectHint',
      });
    });

    it('should throw when one key is missing', () => {
      delete expectedArgs.deselectHint;

      expect(() => {
        makeMultipleSelection(expectedArgs);
      }).toThrow();
    });
  });

  describe('makeRangeSelection', () => {
    let expectedArgs;

    beforeEach(() => {
      expectedArgs = [
        'startDateSelectHint',
        'endDateSelectHint',
        'startDateSelectedState',
        'endDateSelectedState',
        'endAndStartDateSelectedState',
        'dateBetweenStartAndEndSelectedState',
        'makeNextSelectionPrompt',
      ].reduce((acc, k) => {
        acc[k] = `Test_${k}`;
        return acc;
      }, {});
    });

    it('should return an appropriate object', () => {
      expect(makeRangeSelection(expectedArgs)).toEqual({
        type: 'range',
        dateBetweenStartAndEndSelectedState:
          'Test_dateBetweenStartAndEndSelectedState',
        endAndStartDateSelectedState: 'Test_endAndStartDateSelectedState',
        endDateSelectHint: 'Test_endDateSelectHint',
        endDateSelectedState: 'Test_endDateSelectedState',
        makeNextSelectionPrompt: 'Test_makeNextSelectionPrompt',
        startDateSelectHint: 'Test_startDateSelectHint',
        startDateSelectedState: 'Test_startDateSelectedState',
      });
    });

    it('should throw when one key is missing', () => {
      delete expectedArgs.endDateSelectHint;

      expect(() => {
        makeRangeSelection(expectedArgs);
      }).toThrow();
    });
  });
});
