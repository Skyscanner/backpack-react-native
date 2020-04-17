/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import { processColor } from 'react-native';
import { colorSagano } from 'bpk-tokens/tokens/base.react.native';

import parseDateToNative from './parseDateToNative';
import { highlightedDaysFooterView } from './footerView';

const dateOne = Date.UTC(2019, 11, 16);

const commonTests = () => {
  describe('BpkCalendar - footerView', () => {
    describe('highlightedDaysFooterView', () => {
      it('creates a footer view', () => {
        const footer = highlightedDaysFooterView({
          days: [
            {
              date: dateOne,
              description: 'test day',
              color: colorSagano,
              cellStyle: 'positive',
            },
          ],
        });

        expect(footer).toEqual({
          __type: 'highlightedDays',
          days: [
            {
              date: parseDateToNative(dateOne),
              description: 'test day',
              color: processColor(colorSagano),
              cellStyle: 'positive',
            },
          ],
        });
      });
    });
  });
};

export default commonTests;
