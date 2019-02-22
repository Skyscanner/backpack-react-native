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

import React from 'react';
import renderer from 'react-test-renderer';
import { colorBlue500 } from 'bpk-tokens/tokens/base.react.native';

import BpkIcon, { icons } from './BpkIcon';
import withRtlSupport from './withRtlSupport';

const BpkIconWithRtlSupport = withRtlSupport(BpkIcon);

const commonTests = () => {
  describe('withRtlSupport', () => {
    it('should render correctly', () => {
      const tree = renderer
        .create(<BpkIconWithRtlSupport icon={icons.beer} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render correctly for RTL', () => {
      const tree = renderer
        .create(<BpkIconWithRtlSupport icon={icons.beer} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should apply user props next to transform', () => {
      const tree = renderer
        .create(
          <BpkIconWithRtlSupport
            icon={icons.beer}
            style={{ color: colorBlue500 }}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};

export default commonTests;
