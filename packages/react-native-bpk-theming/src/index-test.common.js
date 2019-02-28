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

// We disable backpack/use-components for the whole file here as:
// a) we are testing the theme provider, not Bpktext
// b) Importing BpkText it causes cyclic dependencies in lerna
/* eslint-disable backpack/use-components */

import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { colorWhite } from 'bpk-tokens/tokens/base.react.native';

import { withTheme, BpkThemeProvider } from './index';

const ThemeableComponent = withTheme(props => {
  const value = props.theme ? props.theme.themeableColor : 'no theme applied';
  return <Text>{value}</Text>;
});

const commonTests = () => {
  describe('Theming E2E', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkThemeProvider theme={{ themeableColor: colorWhite }}>
            <ThemeableComponent />
          </BpkThemeProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('BpkThemeProvider', () => {
    it('should console error when theme is not provided', () => {
      const consoleErrorFn = jest.fn();
      const consoleWarnFn = jest.fn();
      jest.spyOn(console, 'error').mockImplementation(consoleErrorFn);
      jest.spyOn(console, 'warn').mockImplementation(consoleWarnFn);

      renderer.create(
        <BpkThemeProvider>
          <Text>Lorem ipsum</Text>
        </BpkThemeProvider>,
      );

      expect(consoleErrorFn).toBeCalledWith(
        expect.stringContaining(
          'Warning: Failed prop type: The prop `theme` is marked as required in `ThemeProvider`, but its value is `undefined`',
        ),
      );
      expect(consoleWarnFn).toBeCalledWith(
        expect.stringContaining(
          'Warning: [ThemeProvider] Please make your theme prop a plain object',
        ),
      );
    });
  });

  describe('withTheme', () => {
    it('should render correctly without theme', () => {
      const tree = renderer.create(<ThemeableComponent />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
