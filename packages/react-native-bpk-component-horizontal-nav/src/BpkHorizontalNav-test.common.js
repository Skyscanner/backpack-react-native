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
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkHorizontalNav from './BpkHorizontalNav';

jest.mock('./BpkHorizontalNavItem', () => 'BpkHorizontalNavItem');

const MyNavItem = (props: { id: string, selected: boolean }) => (
  // eslint-disable-next-line backpack/use-components
  <Text testID={props.id}>{props.selected ? 'Selected' : 'Not selected'}</Text>
);

MyNavItem.defaultProps = { selected: false };

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
            <MyNavItem id="0" />
            <MyNavItem id="1" />
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
