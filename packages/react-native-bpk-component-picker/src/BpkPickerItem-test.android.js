/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import TestRenderer from 'react-test-renderer';
import { describeEachColorScheme } from 'react-native-bpk-test-utils';

import BpkPickerItem from './BpkPickerItem.android';

jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  jest
    .spyOn(reactNative.Platform, 'select')
    .mockImplementation(obj => obj.android || obj.default);
  reactNative.Platform.OS = 'android';

  return reactNative;
});

jest.mock('TouchableNativeFeedback', () =>
  jest.requireActual(
    'react-native/Libraries/Components/Touchable/TouchableNativeFeedback.android.js',
  ),
);

jest.mock(
  './../node_modules/react-native-bpk-component-text/node_modules/bpk-tokens/tokens/base.react.native',
  () => jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

jest.mock('bpk-tokens/tokens/base.react.native', () =>
  jest.requireActual('bpk-tokens/tokens/base.react.native.android.js'),
);

describe('Android', () => {
  describe('BpkPickerItem', () => {
    describeEachColorScheme(BpkPickerItem, WithColorScheme => {
      it('should render correctly', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="label" value="value" />,
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
      });
      it('should render correctly with the selected prop', () => {
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="label" value="value" selected />,
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
      });
      it('should render correctly with an onPress function', () => {
        const onPressFn = jest.fn();
        const testRenderer = TestRenderer.create(
          <WithColorScheme label="label" value="value" onPress={onPressFn} />,
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
      });
    });
  });
});
