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
import { colorWhite } from 'bpk-tokens/tokens/base.react.native';

import BpkThemeProvider from '../../bpk-theming';
import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkHorizontalNavSelectedIndicator from './BpkHorizontalNavSelectedIndicator';

const commonTests = () => {
  describe('BpkHorizontalNavSelectedIndicator', () => {
    describeEachColorScheme(
      BpkHorizontalNavSelectedIndicator,
      WithColorScheme => {
        it('should render correctly', () => {
          const tree = renderer
            .create(<WithColorScheme xOffset={0} width={100} />)
            .toJSON();
          expect(tree).toMatchSnapshot();
        });

        it('should support custom styles', () => {
          const tree = renderer
            .create(
              <WithColorScheme
                xOffset={0}
                width={100}
                style={{ backgroundColor: colorWhite }}
              />,
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      },
    );

    it('should support theming', () => {
      const theme = {
        horizontalNavSelectedTextColor: 'red',
      };
      const tree = renderer
        .create(
          <BpkThemeProvider theme={theme}>
            <BpkHorizontalNavSelectedIndicator xOffset={0} width={100} />
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
