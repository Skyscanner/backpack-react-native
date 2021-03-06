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
import { spacingSm } from '@skyscanner/bpk-foundations-react-native/tokens/base.react.native';

import BpkText from '../../bpk-component-text';

import BpkCarouselItem from './BpkCarouselItem';

const commonTests = () => {
  describe('BpkCarouselItem', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkCarouselItem style={{ width: spacingSm }}>
            <BpkText>View 1</BpkText>
          </BpkCarouselItem>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
