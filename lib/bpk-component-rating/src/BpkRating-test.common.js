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

import BpkRating from './BpkRating';

const TITLES = ['Low title', 'Medium title', 'High title'];
const SUBTITLES = ['Low subtitle', 'Medium subtitle', 'High subtitle'];

const commonTests = () => {
  describe('BpkRating', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(<BpkRating title={TITLES} subtitle={SUBTITLES} value={3} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with all props', () => {
      const tree = renderer
        .create(
          <BpkRating
            title={TITLES}
            subtitle={SUBTITLES}
            value={3}
            orientaion="vertical"
            size="sm"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly with strings instead of arrays', () => {
      const tree = renderer
        .create(
          <BpkRating
            title="single"
            subtitle="single sub"
            value={3}
            size="lg"
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should spread extra properties', () => {
      const tree = renderer
        .create(
          <BpkRating
            title="single"
            subtitle="single sub"
            value={3}
            style={{ flex: 1 }}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
