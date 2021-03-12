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

import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkNavigationBar from './BpkNavigationBar.ios';
import BpkNavigationBarBackButtonIOS from './BpkNavigationBarBackButtonIOS.ios';
import BpkNavigationBarTextButtonIOS from './BpkNavigationBarTextButtonIOS.ios';

jest.mock('./getIOSStatusBarHeight.js', () => {
  return () => {
    return 44;
  };
});

describe('ios - iPhone X', () => {
  describe('BpkNavigationBar', () => {
    describeEachColorScheme(BpkNavigationBar, (WithColorScheme) => {
      it('should render correctly', () => {
        const tree = renderer
          .create(
            <WithColorScheme
              title="Backpack"
              leadingButton={
                <BpkNavigationBarBackButtonIOS
                  title="Back"
                  showTitle
                  onPress={jest.fn()}
                />
              }
            />,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render correctly with trailing button', () => {
        const tree = renderer
          .create(
            <WithColorScheme
              title="Backpack"
              leadingButton={
                <BpkNavigationBarTextButtonIOS
                  title="Cancel"
                  onPress={jest.fn()}
                />
              }
              trailingButton={
                <BpkNavigationBarTextButtonIOS
                  title="Done"
                  emphasize
                  onPress={jest.fn()}
                />
              }
            />,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
