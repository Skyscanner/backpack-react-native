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
      // is-function used by `theming < 2` is buggy and will consider undefined a function
      // when window is defined but window.alert is not (which is the case during tests)
      // We make it undefined here to go around that.

      // TODO: update theming to any version over 2
      window = undefined; // eslint-disable-line no-global-assign

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

// eslint-disable-next-line jest/no-export
export default commonTests;
