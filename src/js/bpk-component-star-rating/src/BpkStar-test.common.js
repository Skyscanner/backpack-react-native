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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkThemeProvider from '../../bpk-theming';
import { describeEachColorScheme } from '../../bpk-test-utils';

import { STAR_TYPES } from './star-types';
import BpkStar from './BpkStar';

const commonTests = () => {
  describe('BpkStar', () => {
    describeEachColorScheme(BpkStar, WithColorScheme => {
      [STAR_TYPES.EMPTY, STAR_TYPES.FULL, STAR_TYPES.HALF].forEach(state => {
        it(`should render correctly when ${state}`, () => {
          const tree = renderer
            .create(<WithColorScheme type={state} />)
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
        it(`should support theming when ${state}`, () => {
          const theme = {
            starColor: 'blue',
            starFilledColor: 'pink',
          };
          const tree = renderer
            .create(
              <BpkThemeProvider theme={theme}>
                <WithColorScheme type={state} />
              </BpkThemeProvider>,
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
  });
};
export default commonTests;
