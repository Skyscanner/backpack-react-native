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

// We disable backpack/use-components for the whole file here as:
// a) we are testing the theme provider, not Bpktext
// b) Importing BpkText it causes cyclic dependencies in lerna
/* eslint-disable backpack/use-components */

import React from 'react';
import renderer from 'react-test-renderer';
import { colorWhite } from 'bpk-tokens/tokens/base.react.native';
import { Text } from 'react-native';

import BpkThemeProvider from './BpkThemeProvider';

const commonTests = () => {
  describe('BpkThemeProvider', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkThemeProvider theme={{ color: colorWhite }}>
            <Text>Lorem ipsum</Text>
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should error when theme is not provided', () => {
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      expect(() =>
        renderer.create(
          <BpkThemeProvider>
            <Text>Lorem ipsum</Text>
          </BpkThemeProvider>,
        ),
      ).toThrow('[ThemeProvider] Please make your theme prop a plain object');
    });
  });
};

export default commonTests;
