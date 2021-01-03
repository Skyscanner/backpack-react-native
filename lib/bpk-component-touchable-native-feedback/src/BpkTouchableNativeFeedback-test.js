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
import { TouchableNativeFeedback } from 'react-native';

import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkTouchableNativeFeedback from './BpkTouchableNativeFeedback';

const mockPlatform = (platform, version) => {
  const reactNative = jest.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation((obj) => obj.platform || obj.default);
  reactNative.Platform.OS = platform;
  Object.defineProperty(reactNative.Platform, 'Version', {
    value: version,
  });
  return reactNative;
};

jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableNativeFeedback',
  () =>
    jest.requireActual(
      'react-native/Libraries/Components/Touchable/TouchableNativeFeedback.android.js',
    ),
);

jest.unmock('../../bpk-appearance');

const FakeComponent = 'FakeComponent';

describe('BpkTouchableNativeFeedback', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(TouchableNativeFeedback, 'Ripple');
  });

  afterEach(() => {
    TouchableNativeFeedback.Ripple.mockReset();
  });

  const styles = () => {
    const { StyleSheet } = jest.requireActual('react-native');
    return StyleSheet.create({
      custom: {
        width: '300em',
      },
    });
  };

  describeEachColorScheme(
    BpkTouchableNativeFeedback,
    (WithColorScheme, colorScheme) => {
      it('should render correctly on API < 21', () => {
        mockPlatform('android', 19);

        const tree = renderer
          .create(
            <WithColorScheme>
              <FakeComponent />
            </WithColorScheme>,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly on API >= 21', () => {
        mockPlatform('android', 21);

        const tree = renderer
          .create(
            <WithColorScheme>
              <FakeComponent />
            </WithColorScheme>,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with custom style prop', () => {
        mockPlatform('android', 21);
        const tree = renderer
          .create(
            <WithColorScheme style={styles().custom}>
              <FakeComponent />
            </WithColorScheme>,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with arbitrary props', () => {
        mockPlatform('android', 21);
        const tree = renderer
          .create(
            <WithColorScheme testID="arbitrary value">
              <FakeComponent />
            </WithColorScheme>,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with a string `color` prop', () => {
        mockPlatform('android', 21);
        const tree = renderer
          .create(
            <WithColorScheme color="rgb(255, 255, 255)">
              <FakeComponent />
            </WithColorScheme>,
          )
          .toJSON();

        expect(TouchableNativeFeedback.Ripple).toHaveBeenCalledWith(
          'rgb(255, 255, 255)',
          true,
        );
        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with a dynamic `color` prop', () => {
        mockPlatform('android', 21);
        const tree = renderer
          .create(
            <WithColorScheme
              color={{ light: 'rgb(255, 255, 255)', dark: 'rgb(0, 0, 0)' }}
            >
              <FakeComponent />
            </WithColorScheme>,
          )
          .toJSON();

        expect(TouchableNativeFeedback.Ripple).toHaveBeenLastCalledWith(
          { light: 'rgb(255, 255, 255)', dark: 'rgb(0, 0, 0)' }[colorScheme],
          true,
        );
        expect(tree).toMatchSnapshot();
      });
    },
  );
});
