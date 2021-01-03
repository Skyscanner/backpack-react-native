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

import React from 'react';
import renderer from 'react-test-renderer';

import BpkThemeProvider from '../../bpk-theming';
import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkSwitch from './BpkSwitch';

const commonTests = () => {
  describe('BpkSwitch', () => {
    describeEachColorScheme(BpkSwitch, (WithColorScheme) => {
      // Currently necessary because of https://github.com/facebook/react-native/issues/16247
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      it('should render correctly', () => {
        const tree = renderer.create(<WithColorScheme />).toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should support the "value" prop', () => {
        const tree = renderer.create(<WithColorScheme value />).toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should support theming', () => {
        const theme = {
          switchPrimaryColor: 'red',
        };
        const tree = renderer
          .create(
            <BpkThemeProvider theme={theme}>
              <WithColorScheme value />
            </BpkThemeProvider>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should disable theming if the required attribute is omitted', () => {
        const theme = {};
        const tree = renderer
          .create(
            <BpkThemeProvider theme={theme}>
              <WithColorScheme value />
            </BpkThemeProvider>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
