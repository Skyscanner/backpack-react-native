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
import { colorSkyBlue } from 'bpk-tokens/tokens/base.react.native';

import { describeEachColorScheme } from '../../bpk-test-utils';

import BpkIcon, { icons } from './BpkIcon';

const commonTests = () => {
  describe('BpkIcon', () => {
    describeEachColorScheme(BpkIcon, (BpkIconWithColorScheme) => {
      it('should render correctly', () => {
        const tree = renderer
          .create(<BpkIconWithColorScheme icon={icons.beer} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should apply user props', () => {
        const tree = renderer
          .create(
            <BpkIconWithColorScheme
              icon={icons.beer}
              style={{ color: colorSkyBlue }}
            />,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    it('should render small icon correctly', () => {
      const tree = renderer
        .create(<BpkIcon icon={icons.beer} small />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

// eslint-disable-next-line jest/no-export
export default commonTests;
