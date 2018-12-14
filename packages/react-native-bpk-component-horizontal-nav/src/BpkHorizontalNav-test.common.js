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

import React from 'react';
import renderer from 'react-test-renderer';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkHorizontalNav from './BpkHorizontalNav';
import BpkHorizontalNavItem from './BpkHorizontalNavItem';

jest.mock('./BpkHorizontalNavItem', () => 'BpkHorizontalNavItem');

const commonTests = () => {
  describe('BpkHorizontalNav', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNav selectedId="0">My nav content.</BpkHorizontalNav>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with the "selected" prop', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNav selectedId="0">
            <BpkHorizontalNavItem id="0" />
            <BpkHorizontalNavItem id="1" />
          </BpkHorizontalNav>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with custom "style" prop', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNav selectedId="0" style={{ marginBottom: spacingSm }}>
            My nav content.
          </BpkHorizontalNav>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with arbitrary props', () => {
      const tree = renderer
        .create(
          <BpkHorizontalNav selectedId="0" custom="custom-prop">
            My nav content.
          </BpkHorizontalNav>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
