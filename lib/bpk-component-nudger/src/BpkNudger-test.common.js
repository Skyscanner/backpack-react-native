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

import BpkNudger from './BpkNudger';

const commonTests = () => {
  describe('BpkNudger', () => {
    it('should render correctly', () => {
      const onPressFn = jest.fn();
      const tree = renderer
        .create(
          <BpkNudger
            min={1}
            max={9}
            value={3}
            decreaseButtonLabel="Decrease"
            increaseButtonLabel="Increase"
            onChange={onPressFn}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when value is less than min', () => {
      const onPressFn = jest.fn();
      const tree = renderer
        .create(
          <BpkNudger
            min={3}
            max={9}
            value={1}
            decreaseButtonLabel="Decrease"
            increaseButtonLabel="Increase"
            onChange={onPressFn}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when value is greater than max', () => {
      const onPressFn = jest.fn();
      const tree = renderer
        .create(
          <BpkNudger
            min={1}
            max={3}
            value={5}
            decreaseButtonLabel="Decrease"
            increaseButtonLabel="Increase"
            onChange={onPressFn}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly when value is a not an integer', () => {
      const onPressFn = jest.fn();
      const tree = renderer
        .create(
          <BpkNudger
            min={1}
            max={9}
            value={0.5}
            decreaseButtonLabel="Decrease"
            increaseButtonLabel="Increase"
            onChange={onPressFn}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
